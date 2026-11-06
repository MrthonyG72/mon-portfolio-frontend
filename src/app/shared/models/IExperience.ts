/** Expérience telle que renvoyée par l'API Django (`/experiences/`). */
export interface IExperience {
  id: number;
  user?: number | null;
  start_date: string;
  end_date: string | null;
  role: string;
  company_name: string;
  description: string;
  contract_type: string;
}
