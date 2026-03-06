export interface Projet {
  id: number;
  user?: number;
  resume: string;
  titre: string;
  image: string;
  lien: string;
}

export interface Experience {
  id: number;
  user?: number;
  date_debut: string;
  date_fin: string;
  role: string;
  nom_entreprise: string;
  description: string;
  type_de_contrat: string;
}

export interface Service {
  id: number;
  user?: number;
  nom: string;
  details: string;
  type_de_service: string;
  outils: string;
}

export interface PriseDeContact {
  id: number;
  user?: number;
  nom_complet: string;
  objet: string;
  email: string;
  message: string;
  date_creation: string;
}

export interface ReseauSocial {
  id: number;
  user?: number;
  nom_platforme: string;
  lien: string;
}

export interface Localisation {
  id: number;
  user?: number;
  ville: string;
  pays: string;
  long: number;
  lat: number;
}

export interface Utulisateur {
  id: number;
  username: string;
  email: string;
  first_name: string;
  last_name: string;
  photo_de_profile: string;
  description: string;
  age: number;
  lien_cv: string;
  telephone: string;
  projets: Projet[];
  experiences: Experience[];
  services: Service[];
  reseaux_sociaux: ReseauSocial[];
  localisations: Localisation[];
}