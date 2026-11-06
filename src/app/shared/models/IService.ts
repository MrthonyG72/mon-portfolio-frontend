export interface IService {
  id: number;
  user?: number | null;
  name: string;
  details: string;
  service_type: string;
  /** Outils séparés par des virgules. */
  tools: string;
  /** URL d'une image (média Django) ou null. */
  icon?: string | null;
  /** Clé d'icône intégrée : "web" | "mobile" | "ai" | autre. */
  icon_class?: string;
}
