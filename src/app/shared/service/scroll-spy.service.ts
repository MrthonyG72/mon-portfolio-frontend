import { DOCUMENT } from '@angular/common';
import { Injectable, inject, signal } from '@angular/core';
import { Router } from '@angular/router';

export interface NavLink {
  id: string;
  label: string;
}

/** Sections de la page d'accueil, dans l'ordre d'affichage. */
export const NAV_LINKS: NavLink[] = [
  { id: 'accueil', label: 'Accueil' },
  { id: 'projets', label: 'Projets' },
  { id: 'a-propos', label: 'À propos' },
  { id: 'parcours', label: 'Parcours' },
  { id: 'competences', label: 'Compétences' },
  { id: 'services', label: 'Services' },
  { id: 'contact', label: 'Contact' },
];

/**
 * Partage la section active entre la page d'accueil (qui l'observe) et le header
 * (qui la surligne), et centralise le défilement vers une section.
 */
@Injectable({ providedIn: 'root' })
export class ScrollSpyService {
  readonly active = signal<string>(NAV_LINKS[0].id);

  private readonly doc = inject(DOCUMENT);
  private readonly router = inject(Router);

  /**
   * Défile en douceur vers une section de l'accueil. Si la section n'est pas dans
   * le DOM (ex. page 404), on navigue vers l'accueil avec le fragment.
   */
  scrollTo(id: string): void {
    const el = this.doc.getElementById(id);
    if (!el) {
      void this.router.navigate(['/'], { fragment: id });
      return;
    }

    const reduced = this.doc.defaultView?.matchMedia('(prefers-reduced-motion: reduce)').matches;
    el.scrollIntoView({ behavior: reduced ? 'auto' : 'smooth', block: 'start' });

    try {
      const url = id === NAV_LINKS[0].id ? '/' : `#${id}`;
      this.doc.defaultView?.history.replaceState(this.doc.defaultView.history.state, '', url);
    } catch {
      // history indisponible (SSR, navigateur restreint) : on ignore.
    }
  }
}
