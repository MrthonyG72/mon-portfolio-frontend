import { Component, OnInit, signal } from '@angular/core';
import { ViewportScroller } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { filter } from 'rxjs/operators';
import { FormsModule } from '@angular/forms';
import { ProfileService } from '../shared/service/ProfileService';
import { SkillService } from '../shared/service/SkillService';
import { ProjectService } from '../shared/service/ProjectService';
import { ContactService, IContactPayload } from '../shared/service/ContactService';
import { OfferService } from '../shared/service/OfferService';
import { IProfile } from '../shared/models/IProfile';
import { environment } from '../../environments/environment';
import { ISkill } from '../shared/models/ISkill';
import { IProject } from '../shared/models/IProject';
import { IService } from '../shared/models/IService';

const FALLBACK: IProfile = {
  full_name: 'ANZOUAN GOMIS THONY AXEL',
  title: 'INGENIEUR LOGICIEL', 
  email: '',
  phone: '',
  about_me: '',
  cv_url: '',
  github_url: '',
  linkedin_url: '',
};

@Component({
  selector: 'app-home',
  imports: [FormsModule],
  templateUrl: './home.html',
  styleUrl: './home.scss',
})
export class Home implements OnInit {
  profile = signal<IProfile>(FALLBACK);
  skills = signal<ISkill[]>([]);
  projects = signal<IProject[]>([]);
  services = signal<IService[]>([]);
  contactSent = signal(false);
  contactError = signal<string | null>(null);
  contactLoading = signal(false);

  formModel: IContactPayload = {
    full_name: '',
    object: '',
    email: '',
    message: '',
  };

  constructor(
    private profileService: ProfileService,
    private skillService: SkillService,
    private projectService: ProjectService,
    private contactService: ContactService,
    private offerService: OfferService,
    private viewportScroller: ViewportScroller,
    private route: ActivatedRoute,
  ) {}

  ngOnInit(): void {
    this.profileService.getProfile().subscribe({
      next: (p) => { if (p) this.profile.set(p); },
      error: () => {},
    });
    this.skillService.getSkills().subscribe({
      next: (list) => this.skills.set(list),
      error: () => {},
    });
    this.projectService.getProjects().subscribe({
      next: (list) => this.projects.set(list),
      error: () => {},
    });
    this.offerService.getServices().subscribe({
      next: (list) => this.services.set(list),
      error: () => {},
    });

    this.route.fragment.pipe(filter(Boolean)).subscribe((fragment) => {
      setTimeout(() => this.viewportScroller.scrollToAnchor(fragment!), 100);
    });
  }

  // URL de la photo de profil
  photoUrl(): string | null {
    const p: any = this.profile();
    const img = p.image || p.photo; 
    if (!img) return null;
    return img.startsWith('http') ? img : `${environment.backendUrl}${img}`;
  }

  // Transforme la chaîne de caractères des technos en tableau pour les badges
  getTechnologies(project: IProject): string[] {
    const t = project.technologies;
    if (!t) return [];
    return t.split(',').map(s => s.trim()).filter(Boolean);
  }

  // URL de l'image du projet (Backend Django ou Placeholder)
  getProjectImageUrl(project: IProject): string {
    if (!project.image) return 'https://via.placeholder.com/800x600';
    return project.image.startsWith('http') ? project.image : `${environment.backendUrl}${project.image}`;
  }

  submitContact(): void {
    this.contactError.set(null);
    if (!this.formModel.full_name?.trim() || !this.formModel.email?.trim() || !this.formModel.message?.trim()) {
      this.contactError.set('Veuillez remplir tous les champs obligatoires.');
      return;
    }
    this.contactLoading.set(true);
    this.contactService.sendMessage(this.formModel).subscribe({
      next: () => {
        this.contactSent.set(true);
        this.contactLoading.set(false);
        this.formModel = { full_name: '', object: '', email: '', message: '' };
      },
      error: () => {
        this.contactError.set('Erreur lors de l\'envoi.');
        this.contactLoading.set(false);
      },
    });
  }
}