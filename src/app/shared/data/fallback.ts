import { IProfile } from '../models/IProfile';
import { ISkill } from '../models/ISkill';
import { IService } from '../models/IService';

/**
 * Données affichées immédiatement, avant la réponse de l'API (et si elle tombe).
 * Le backend Render met parfois 30 à 60 s à se réveiller : sans ces valeurs la page
 * resterait vide pendant ce temps. Elles sont remplacées dès que l'API répond.
 *
 * À garder synchronisées avec l'admin Django (profil, compétences, services).
 */
export const FALLBACK_PROFILE: IProfile = {
  full_name: 'Anzouan Gomis Thony Axel',
  title: 'Ingénieur logiciel',
  email: 'anzouangomisthony@gmail.com',
  phone: '+225 01 70 16 90 13',
  about_me:
    "Jeune ingénieur logiciel, mon parcours m'a permis de développer une approche polyvalente, allant du " +
    "développement d'applications web et mobiles à la conception de systèmes connectés et intelligents.\n\n" +
    "J'aime apprendre, relever des défis techniques et transformer des idées en projets fonctionnels. Je suis à " +
    "la recherche d'opportunités qui me permettront d'acquérir de nouvelles expériences et de contribuer à des " +
    'projets à fort potentiel.',
  cv_url: '',
  cv_file: null,
  github_url: 'https://github.com/MrthonyG72',
  linkedin_url: 'https://www.linkedin.com/in/gomis-thony-axel-thierry-anzouan-787a122a4/',
  photo: 'assets/img/portrait.jpg',
};

export const FALLBACK_SKILLS: ISkill[] = [
  { id: 1, name: 'HTML / CSS', percentage: 99, order: 0 },
  { id: 2, name: 'Flutter', percentage: 97, order: 1 },
  { id: 3, name: 'Dart', percentage: 93, order: 2 },
  { id: 4, name: 'Django', percentage: 89, order: 3 },
  { id: 5, name: 'Java', percentage: 89, order: 4 },
  { id: 6, name: 'C++', percentage: 89, order: 5 },
  { id: 7, name: 'Git', percentage: 89, order: 6 },
  { id: 8, name: 'Python', percentage: 85, order: 7 },
  { id: 9, name: 'Odoo ERP', percentage: 83, order: 8 },
  { id: 10, name: 'Robotique', percentage: 80, order: 9 },
  { id: 11, name: 'Angular', percentage: 79, order: 10 },
  { id: 12, name: 'JavaScript', percentage: 75, order: 11 },
];

export const FALLBACK_SERVICES: IService[] = [
  {
    id: 1,
    name: 'Développement web',
    service_type: 'Développement Web',
    details:
      'Sites et applications web modernes, rapides et réactifs, adaptés aux besoins des entreprises, ' +
      'entrepreneurs et particuliers. Chaque projet est optimisé pour une excellente expérience utilisateur ' +
      'et de bonnes performances sur tous les appareils.',
    tools: 'HTML, CSS, JavaScript, Angular, Django, Flask, Git, Bootstrap, API REST',
    icon: null,
    icon_class: 'web',
  },
  {
    id: 2,
    name: "Développement d'applications mobiles",
    service_type: 'Développement Mobile',
    details:
      'Applications mobiles performantes et intuitives pour Android et iOS, pensées pour offrir une ' +
      'expérience fluide, un design attrayant et des fonctionnalités adaptées aux utilisateurs.',
    tools: 'Flutter, Dart, Firebase, API REST, Git, Android Studio',
    icon: null,
    icon_class: 'mobile',
  },
  {
    id: 3,
    name: 'Intelligence artificielle et systèmes intelligents',
    service_type: 'IA',
    details:
      "Solutions basées sur l'intelligence artificielle capables d'analyser des données, d'automatiser " +
      "des tâches et d'améliorer la prise de décision, intégrables dans des applications web, mobiles ou " +
      'des systèmes connectés.',
    tools: 'Python, Machine Learning, Robotique, API',
    icon: null,
    icon_class: 'ai',
  },
];
