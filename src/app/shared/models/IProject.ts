export interface IProject {
  id: number;
  user?: number | null;
  /** Description du projet. */
  resume: string;
  title: string;
  image: string | null;
  link: string;
  /** Technologies séparées par des virgules. */
  technologies?: string;
  order?: number;
  /** Champs complémentaires issus du CV (absents de l'API). */
  year?: number;
  badge?: string;
}
