import { Component, DestroyRef, OnInit, computed, inject, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { CV } from '../../data/cv';
import { FALLBACK_PROFILE } from '../../data/fallback';
import { IProfile } from '../../models/IProfile';
import { ProfileService } from '../../service/ProfileService';
import { NAV_LINKS, ScrollSpyService } from '../../service/scroll-spy.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.html',
  styleUrl: './footer.scss',
})
export class Footer implements OnInit {
  private readonly profileService = inject(ProfileService);
  private readonly spy = inject(ScrollSpyService);
  private readonly destroyRef = inject(DestroyRef);

  readonly links = NAV_LINKS;
  readonly year = new Date().getFullYear();
  readonly profile = signal<IProfile>(FALLBACK_PROFILE);

  /** URL explicite renseignée dans l'admin, sinon le CV embarqué dans le site. */
  readonly cvUrl = computed(() => this.profile().cv_url || CV.file);

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
  }

  go(event: Event, id: string): void {
    event.preventDefault();
    this.spy.scrollTo(id);
  }
}
