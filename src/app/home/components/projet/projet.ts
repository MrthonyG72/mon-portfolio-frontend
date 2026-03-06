import { Component, inject } from '@angular/core';
import { ProjectService } from '../../../shared/service/ProjectService';

@Component({
  selector: 'app-projet',
  imports: [],
  templateUrl: './projet.html',
  styleUrl: './projet.scss',
})
export class Projet {
  private projectService = inject(ProjectService);
}
