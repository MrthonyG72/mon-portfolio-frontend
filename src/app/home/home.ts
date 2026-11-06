import { DOCUMENT } from '@angular/common';
import {
  AfterViewInit,
  Component,
  DestroyRef,
  OnDestroy,
  OnInit,
  computed,
  inject,
  signal,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormsModule, NgForm } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { filter } from 'rxjs/operators';

import { CV, CvExperience, CvProject } from '../shared/data/cv';
import { FALLBACK_PROFILE, FALLBACK_SERVICES, FALLBACK_SKILLS } from '../shared/data/fallback';
import { RevealDirective } from '../shared/directives/reveal.directive';
import { IExperience } from '../shared/models/IExperience';
import { IProfile } from '../shared/models/IProfile';
import { IProject } from '../shared/models/IProject';
import { IService } from '../shared/models/IService';
import { ISkill } from '../shared/models/ISkill';
import { mediaUrl } from '../shared/service/api.utils';
import { ContactService, IContactPayload } from '../shared/service/ContactService';
import { ExperienceService } from '../shared/service/ExperienceService';
import { OfferService } from '../shared/service/OfferService';
import { ProfileService } from '../shared/service/ProfileService';
import { ProjectService } from '../shared/service/ProjectService';
import { NAV_LINKS, ScrollSpyService } from '../shared/service/scroll-spy.service';
import { SkillService } from '../shared/service/SkillService';

type ServiceIcon = 'web' | 'mobile' | 'ai';

/** Clé de comparaison des titres : sans accents, casse ni ponctuation. */
export function titleKey(title: string): string {
  return title
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]/g, '');
}

/**
 * Fusionne les projets de l'API avec ceux du CV. Un projet de l'API portant le même
 * titre qu'un projet du CV remplace celui-ci (il a une image et un lien gérés dans
 * l'admin) et hérite de son année et de son étiquette.
 */
export function mergeProjects(api: IProject[], cv: CvProject[]): IProject[] {
  const cvByKey = new Map(cv.map((c) => [titleKey(c.title), c]));
  const apiKeys = new Set(api.map((p) => titleKey(p.title)));

  const enriched = api.map((p) => {
    const c = cvByKey.get(titleKey(p.title));
    return c ? { ...p, year: p.year ?? c.year, badge: p.badge ?? c.badge } : p;
  });

  const extras: IProject[] = cv
    .filter((c) => !apiKeys.has(titleKey(c.title)))
    .map((c, i) => ({
      id: -(i + 1),
      title: c.title,
      resume: c.description,
      image: null,
      link: c.link ?? '',
      technologies: c.technologies,
      year: c.year,
      badge: c.badge,
    }));

  return [...enriched, ...extras].sort(
    (a, b) => (b.year ?? 0) - (a.year ?? 0) || (b.order ?? 0) - (a.order ?? 0),
  );
}

@Component({
  selector: 'app-home',
  imports: [FormsModule, RevealDirective],
  templateUrl: './home.html',
  styleUrl: './home.scss',
})
export class Home implements OnInit, AfterViewInit, OnDestroy {
  private readonly profileService = inject(ProfileService);
  private readonly skillService = inject(SkillService);
  private readonly projectService = inject(ProjectService);
  private readonly offerService = inject(OfferService);
  private readonly experienceService = inject(ExperienceService);
  private readonly contactService = inject(ContactService);
  private readonly spy = inject(ScrollSpyService);
  private readonly route = inject(ActivatedRoute);
  private readonly doc = inject(DOCUMENT);
  private readonly destroyRef = inject(DestroyRef);

  // ---- Contenu statique issu du CV ----
  readonly cv = CV;

  // ---- Données API (valeurs de secours affichées instantanément) ----
  readonly profile = signal<IProfile>(FALLBACK_PROFILE);
  readonly skills = signal<ISkill[]>(FALLBACK_SKILLS);
  readonly services = signal<IService[]>(FALLBACK_SERVICES);
  readonly apiProjects = signal<IProject[]>([]);
  readonly apiExperiences = signal<IExperience[]>([]);

  readonly projects = computed(() => mergeProjects(this.apiProjects(), CV.projects));

  /** Expériences : celles saisies dans l'admin d'abord, puis celles du CV. */
  readonly experiences = computed<CvExperience[]>(() => {
    const fromApi = this.apiExperiences().map((e) => ({
      title: e.role,
      organisation: e.company_name,
      period: this.formatPeriod(e.start_date, e.end_date),
      description: e.description,
    }));
    const keys = new Set(fromApi.map((e) => titleKey(e.title)));
    return [...fromApi, ...CV.experiences.filter((e) => !keys.has(titleKey(e.title)))];
  });

  readonly photoUrl = computed(() => mediaUrl(this.profile().photo) ?? 'assets/img/portrait.jpg');

  /** URL explicite renseignée dans l'admin, sinon le CV embarqué dans le site. */
  readonly cvUrl = computed(() => this.profile().cv_url || CV.file);

  readonly phoneHref = computed(() => this.profile().phone.replace(/[^+\d]/g, ''));

  readonly tagline = computed(() =>
    this.services()
      .map((s) => s.service_type?.trim())
      .filter(Boolean)
      .join(' · '),
  );

  readonly sortedSkills = computed(() =>
    [...this.skills()].sort((a, b) => b.percentage - a.percentage || a.name.localeCompare(b.name)),
  );

  // ---- Formulaire de contact ----
  form: IContactPayload = { full_name: '', object: '', email: '', message: '' };
  /** Champ "piège" anti-spam : un humain ne le remplit jamais. */
  honeypot = '';
  readonly submitted = signal(false);
  readonly contactSent = signal(false);
  readonly contactLoading = signal(false);
  readonly contactError = signal<string | null>(null);

  private sectionObserver?: IntersectionObserver;

  ngOnInit(): void {
    this.profileService
      .getProfile()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (p) => {
          if (p) this.profile.set(p);
        },
        error: () => {},
      });

    this.skillService
      .getSkills()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (list) => {
          if (list?.length) this.skills.set(list);
        },
        error: () => {},
      });

    this.offerService
      .getServices()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (list) => {
          if (list?.length) this.services.set(list);
        },
        error: () => {},
      });

    this.projectService
      .getProjects()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (list) => this.apiProjects.set(list ?? []),
        error: () => {},
      });

    this.experienceService
      .getExperiences()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (list) => this.apiExperiences.set(list ?? []),
        error: () => {},
      });
  }

  ngAfterViewInit(): void {
    this.observeSections();

    // Navigation avec fragment (#contact depuis la page 404, lien partagé, etc.)
    this.route.fragment
      .pipe(filter(Boolean), takeUntilDestroyed(this.destroyRef))
      .subscribe((fragment) => setTimeout(() => this.spy.scrollTo(fragment), 50));
  }

  ngOnDestroy(): void {
    this.sectionObserver?.disconnect();
  }

  go(event: Event, id: string): void {
    event.preventDefault();
    this.spy.scrollTo(id);
  }

  /** "Python, Django, Git" → ["Python", "Django", "Git"] */
  splitList(value: string | null | undefined): string[] {
    if (!value) return [];
    return value
      .split(/[,;|]/)
      .map((s) => s.trim())
      .filter(Boolean);
  }

  projectImage(project: IProject): string | null {
    return mediaUrl(project.image);
  }

  /** Choisit l'icône intégrée d'un service à partir de sa clé ou de son intitulé. */
  iconKey(svc: IService): ServiceIcon {
    const explicit = (svc.icon_class ?? '').toLowerCase();
    if (explicit === 'web' || explicit === 'mobile' || explicit === 'ai') return explicit;

    const text = `${svc.service_type} ${svc.name}`.toLowerCase();
    if (/mobile|android|ios|flutter/.test(text)) return 'mobile';
    if (/intelligence|\bia\b|\bai\b|robot|machine|donn/.test(text)) return 'ai';
    return 'web';
  }

  submitContact(form: NgForm): void {
    this.submitted.set(true);
    this.contactError.set(null);

    if (this.honeypot) {
      // Robot détecté : on simule un succès sans rien envoyer.
      this.contactSent.set(true);
      return;
    }
    if (form.invalid) {
      this.contactError.set('Merci de corriger les champs indiqués avant d’envoyer.');
      return;
    }

    this.contactLoading.set(true);
    const payload: IContactPayload = {
      full_name: this.form.full_name.trim(),
      email: this.form.email.trim(),
      object: this.form.object.trim() || 'Contact depuis le portfolio',
      message: this.form.message.trim(),
    };

    this.contactService.sendMessage(payload).subscribe({
      next: () => {
        this.contactLoading.set(false);
        this.contactSent.set(true);
      },
      error: () => {
        this.contactLoading.set(false);
        this.contactError.set(
          'L’envoi a échoué. Réessayez dans un instant ou écrivez-moi directement par email.',
        );
      },
    });
  }

  resetContact(): void {
    this.form = { full_name: '', object: '', email: '', message: '' };
    this.honeypot = '';
    this.submitted.set(false);
    this.contactSent.set(false);
    this.contactError.set(null);
  }

  /** "2025-01-01", "2026-06-30" → "2025 – 2026" ; sans date de fin → "2025 – aujourd'hui". */
  private formatPeriod(start: string, end: string | null): string {
    const y = (d: string | null) => (d ? d.slice(0, 4) : '');
    const from = y(start);
    const to = y(end) || "aujourd'hui";
    return from && from !== to ? `${from} – ${to}` : from || to;
  }

  /** Met à jour la section active du header pendant le défilement. */
  private observeSections(): void {
    const win = this.doc.defaultView;
    if (!win || typeof IntersectionObserver === 'undefined') return;

    const sections = NAV_LINKS.map((l) => this.doc.getElementById(l.id)).filter(
      (el): el is HTMLElement => !!el,
    );
    if (!sections.length) return;

    this.sectionObserver = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible) this.spy.active.set(visible.target.id);
      },
      { rootMargin: '-35% 0px -55% 0px', threshold: [0, 0.1, 0.25, 0.5] },
    );
    sections.forEach((s) => this.sectionObserver!.observe(s));
  }
}
