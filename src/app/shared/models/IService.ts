export interface IService {
  id: number;
  user?: number;
  name: string;
  details: string;
  service_type: string;
  tools: string;
  icon?: string | null;
  icon_class?: string;
}