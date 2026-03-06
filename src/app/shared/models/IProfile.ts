export interface IProfile {
  id?: number;
  full_name: string;
  title: string;
  email: string;
  phone: string;
  about_me: string;
  cv_file?: string | null;
  cv_url: string;
  github_url: string;
  linkedin_url: string;
  photo?: string | null;
}
