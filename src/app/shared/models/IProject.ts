export interface IProject {
  id: number;
  user?: number;
  resume: string;
  title: string;
  image: string;
  link: string;
  technologies?: string;
}