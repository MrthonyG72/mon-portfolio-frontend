import { Component, OnInit, signal, computed } from '@angular/core';
import { ViewportScroller } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { filter } from 'rxjs/operators';
import { FormsModule } from '@angular/forms';
import { ProfileService } from '../shared/service/ProfileService';
import { SkillService } from '../shared/service/SkillService';
import { ProjectService } from '../shared/service/ProjectService';
import { ContactService, IContactPayload } from '../shared/service/ContactService';
import { IProfile } from '../shared/models/IProfile';
import { environment } from '../../environments/environment';
import { ISkill } from '../shared/models/ISkill';
import { IProject } from '../shared/models/IProject';

const FALLBACK: IProfile = {
  full_name: 'Anzouan Gomis Thony Axel',
  title: 'L3 Computer Science',
  email: 'anzouangomisthony@gmail.com',
  phone: '+225 0170169013',
  about_me: `Je m'appelle Anzouan Gomis Thony Axel, étudiant en Licence 3 en Computer Science et passionné par le développement logiciel et les nouvelles technologies. Je m'intéresse particulièrement à la création d'applications web et mobiles modernes en utilisant des technologies comme Angular, Django, Python et Java et Flutter. Curieux et orienté innovation, je développe des projets mêlant full-stack, IA et systèmes intelligents afin de créer des solutions modernes, performantes et utiles.`,
  cv_url: '',
  github_url: 'https://github.com/MrthonyG72',
  linkedin_url: 'https://www.linkedin.com/in/gomis-thony-axel-thierry-anzouan-787a122a4/',
};

const FALLBACK_SKILLS: string[] = [
  'Angular',
  'Django REST Framework',
  'Java',
  'Python',
  'Flutter',
  'TypeScript',
  'HTML/CSS',
  'Git',
];

@Component({
  selector: 'app-home',
  imports: [FormsModule],
  templateUrl: './home.html',
  styleUrl: './home.scss',
})
export class Home implements OnInit {
  profile = signal<IProfile>(FALLBACK);
  skills = signal<ISkill[]>([]);
  skillsDisplay = computed(() => {
    const list = this.skills();
    if (list.length) return list.map(s => s.name);
    return FALLBACK_SKILLS;
  });
  projects = signal<IProject[]>([]);
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

    this.route.fragment.pipe(filter(Boolean)).subscribe((fragment) => {
      setTimeout(() => this.viewportScroller.scrollToAnchor(fragment!), 100);
    });
  }

  photoUrl(): string | null {
    const p = this.profile().photo;
    if (!p) return null;
    return p.startsWith('http') ? p : `${environment.backendUrl}${p}`;
  }

  cvDownloadUrl(): string {
    const p = this.profile();
    if (p.cv_url) return p.cv_url;
    if (p.cv_file) return p.cv_file.startsWith('http') ? p.cv_file : `${environment.backendUrl}${p.cv_file}`;
    return '#';
  }

  getTechnologies(project: IProject): string[] {
    const t = project.technologies;
    if (!t) return [];
    return t.split(',').map(s => s.trim()).filter(Boolean);
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
        this.contactError.set('Erreur lors de l\'envoi. Vérifiez que le backend est démarré.');
        this.contactLoading.set(false);
      },
    });
  }
}
