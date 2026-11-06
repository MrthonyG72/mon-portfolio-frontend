import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';

import { Home, mergeProjects, titleKey } from './home';
import { FALLBACK_PROFILE } from '../shared/data/fallback';
import { CV } from '../shared/data/cv';

describe('Home', () => {
  let component: Home;
  let fixture: ComponentFixture<Home>;
  let http: HttpTestingController;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Home],
      providers: [provideRouter([]), provideHttpClient(), provideHttpClientTesting()],
    }).compileComponents();

    fixture = TestBed.createComponent(Home);
    component = fixture.componentInstance;
    http = TestBed.inject(HttpTestingController);
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('affiche le profil de secours avant la réponse de l’API', () => {
    const el = fixture.nativeElement as HTMLElement;
    expect(el.querySelector('.hero__title')?.textContent).toContain(FALLBACK_PROFILE.full_name);
  });

  it('remplace le profil par celui de l’API', async () => {
    http.expectOne((r) => r.url.endsWith('/profile/')).flush({
      ...FALLBACK_PROFILE,
      full_name: 'Nom API',
    });
    fixture.detectChanges();
    await fixture.whenStable();
    const el = fixture.nativeElement as HTMLElement;
    expect(el.querySelector('.hero__title')?.textContent).toContain('Nom API');
  });

  it('affiche les projets du CV avant la réponse de l’API', () => {
    const titles = Array.from((fixture.nativeElement as HTMLElement).querySelectorAll('.project h3')).map(
      (h) => h.textContent?.trim(),
    );
    expect(titles).toContain('SmartEco Home');
    expect(titles).toContain('DIGI-MARCHÉS');
  });

  it('fusionne les projets de l’API avec ceux du CV sans doublon', () => {
    const api = [
      { id: 1, title: 'Digi-Marches', resume: 'API', image: 'x.jpg', link: 'https://x', technologies: 'Flask', order: 97 },
    ];
    const merged = mergeProjects(api, CV.projects);
    const digi = merged.filter((p) => titleKey(p.title) === titleKey('DIGI-MARCHÉS'));
    expect(digi.length).toBe(1);
    expect(digi[0].resume).toBe('API');
    expect(digi[0].year).toBe(2026);
    expect(merged.length).toBe(CV.projects.length);
    // Tri par année décroissante
    expect(merged[0].year).toBeGreaterThanOrEqual(merged[merged.length - 1].year ?? 0);
  });

  it('découpe les listes séparées par des virgules', () => {
    expect(component.splitList('Python, Django ,Git')).toEqual(['Python', 'Django', 'Git']);
    expect(component.splitList('')).toEqual([]);
  });

  it('choisit l’icône de service d’après son intitulé', () => {
    const base = { id: 1, details: '', tools: '', name: '' };
    expect(component.iconKey({ ...base, service_type: 'Développement Mobile' })).toBe('mobile');
    expect(component.iconKey({ ...base, service_type: 'Intelligence artificielle' })).toBe('ai');
    expect(component.iconKey({ ...base, service_type: 'Développement Web' })).toBe('web');
  });
});
