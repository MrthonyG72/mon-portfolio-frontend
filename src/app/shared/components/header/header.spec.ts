import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';

import { Header } from './header';

describe('Header', () => {
  let component: Header;
  let fixture: ComponentFixture<Header>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Header],
      providers: [provideRouter([])],
    }).compileComponents();

    fixture = TestBed.createComponent(Header);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('ouvre et ferme le menu mobile', () => {
    component.toggleMenu();
    expect(component.menuOpen()).toBe(true);
    expect(document.body.classList.contains('menu-open')).toBe(true);
    component.closeMenu();
    expect(component.menuOpen()).toBe(false);
    expect(document.body.classList.contains('menu-open')).toBe(false);
  });
});
