import { Component, signal, OnInit } from '@angular/core';
import { ProfileService } from '../../service/ProfileService';
import { IProfile } from '../../models/IProfile';
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'app-footer',
  imports: [],
  templateUrl: './footer.html',
  styleUrl: './footer.scss',
})
export class Footer implements OnInit {
  profile = signal<IProfile | null>(null);
  year = new Date().getFullYear();

  constructor(private profileService: ProfileService) {}

  ngOnInit(): void {
    this.profileService.getProfile().subscribe({
      next: (p) => this.profile.set(p ?? null),
      error: () => this.profile.set(null)
    });
  }

  cvLink(): string {
    const p = this.profile();
    if (!p) return '#';
    if (p.cv_url) return p.cv_url;
    if (p.cv_file) return p.cv_file.startsWith('http') ? p.cv_file : `${environment.backendUrl}${p.cv_file}`;
    return '#';
  }
}
