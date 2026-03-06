import { Component, signal } from '@angular/core';

@Component({
  selector: 'app-portfolio',
  imports: [],
  templateUrl: './portfolio.html',
  styleUrl: './portfolio.scss',
})
export class Portfolio {
  // Variable pour stocker le projet actuellement cliqué
  selectedProject: any = null;

  // Tes données (assure-toi que 'projects' correspond à ce que tu utilises dans ton HTML)
  // Si tu as déjà une logique pour charger les projets, tu peux garder ta méthode actuelle
  projects = signal<any[]>([]); 

  // Méthode pour ouvrir la modale
  openDetails(project: any) {
    this.selectedProject = project;
  }

  // Méthode pour fermer la modale
  closeDetails() {
    this.selectedProject = null;
  }
}