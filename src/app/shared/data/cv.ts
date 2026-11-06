/**
 * Contenu issu du CV (version de novembre 2026).
 *
 * Le backend Django ne gère ni la formation, ni les certifications, ni les langues :
 * ces informations vivent ici. Les projets et expériences listés sont fusionnés avec
 * ceux de l'API (un projet portant le même titre côté admin remplace celui du CV).
 *
 * Pour mettre à jour : modifier ce fichier et remplacer le PDF dans `public/cv/`.
 */

export interface CvProject {
  title: string;
  year: number;
  /** Petite étiquette affichée sur la carte (ex. « Vainqueur hackathon »). */
  badge?: string;
  description: string;
  technologies: string;
  link?: string;
}

export interface CvExperience {
  title: string;
  organisation?: string;
  period: string;
  description: string;
  highlights?: string[];
}

export interface CvEducation {
  title: string;
  school: string;
  period: string;
  kind: 'diplome' | 'certification';
}

export interface SkillGroup {
  label: string;
  items: string[];
}

export const CV = {
  /** Fichier servi par le frontend (dossier public/). */
  file: 'cv/CV-Anzouan-Gomis-Thony-Axel.pdf',

  title: 'Ingénieur logiciel',

  bio: [
    "Jeune ingénieur logiciel, mon parcours m'a permis de développer une approche polyvalente, allant du " +
      "développement d'applications web et mobiles à la conception de systèmes connectés et intelligents.",
    "J'aime apprendre, relever des défis techniques et transformer des idées en projets fonctionnels. Je suis à " +
      "la recherche d'opportunités qui me permettront d'acquérir de nouvelles expériences et de contribuer à des " +
      'projets à fort potentiel.',
  ],

  location: "Abidjan, Côte d'Ivoire",
  drivingLicense: 'Permis de conduire AB',
  languages: [
    { name: 'Français', level: 'Langue maternelle' },
    { name: 'Anglais', level: 'Intermédiaire supérieur' },
  ],

  projects: <CvProject[]>[
    {
      title: 'Home Safety IA',
      year: 2026,
      description:
        'Système intelligent de surveillance et de prévention des risques domestiques combinant intelligence ' +
        'artificielle, vision par ordinateur, IoT et systèmes embarqués : détection de personnes et reconnaissance ' +
        'faciale, détection de fumée, de gaz et de risques domestiques à partir de capteurs et de microcontrôleurs.',
      technologies: 'Python, Computer Vision, Machine Learning, IoT, ESP32, Arduino',
    },
    {
      title: 'DIGI-MARCHÉS',
      year: 2026,
      description:
        'Plateforme Full-Stack pour la digitalisation et le suivi des marchés publics et privés, en collaboration ' +
        "avec la Mairie de Grand-Bassam : centralisation des appels d'offres, soumission sécurisée des dossiers et " +
        'automatisation du processus de validation.',
      technologies: 'Python, Flask, SQLite, Bootstrap 5, HTML5',
      link: 'https://github.com/MrthonyG72/Atelier-genie-logiciel-projet',
    },
    {
      title: 'SmartEco Home',
      year: 2025,
      badge: 'Vainqueur du hackathon SmartWattIUA',
      description:
        "Système IoT de gestion intelligente de l'énergie domestique : collecte et visualisation des données en " +
        'temps réel via une application web Flask, et optimisation de la consommation.',
      technologies: 'IoT, Python, Flask, ESP8266, Capteurs',
    },
    {
      title: 'Module Odoo personnalisé',
      year: 2025,
      description:
        'Développement d’un module Odoo en Python pour la gestion des stocks et des ventes, avec automatisation ' +
        'des devis, commandes et factures et intégration au système ERP.',
      technologies: 'Odoo, Python, ERP, PostgreSQL',
    },
  ],

  experiences: <CvExperience[]>[
    {
      title: 'Hackathon SmartWattIUA — Vainqueur',
      period: '2025',
      description:
        "Conception de SmartEco Home, un système IoT de gestion intelligente de l'énergie domestique avec " +
        'collecte et visualisation des données en temps réel.',
    },
    {
      title: 'DIGI-MARCHÉS — Plateforme de gestion des appels d’offres',
      organisation: 'Mairie de Grand-Bassam',
      period: '2026',
      description:
        'Analyse des besoins, modélisation du système et conception d’une solution Full-Stack pour la ' +
        'digitalisation et le suivi des marchés publics et privés.',
    },
    {
      title: 'Home Safety IA — Système intelligent de sécurité domestique',
      period: '2026',
      description:
        'Surveillance et prévention des risques domestiques par intelligence artificielle, vision par ordinateur, ' +
        'IoT et systèmes embarqués.',
      highlights: [
        'Détection de personnes et reconnaissance faciale',
        'Détection de fumée, de gaz et de risques domestiques',
        'Capteurs et microcontrôleurs',
      ],
    },
    {
      title: 'Module Odoo personnalisé',
      period: '2025',
      description:
        'Module Odoo en Python pour la gestion des stocks et des ventes : automatisation des devis, commandes et ' +
        'factures, intégration au système ERP.',
    },
  ],

  education: <CvEducation[]>[
    {
      title: 'Licence en sciences informatiques — Génie logiciel',
      school: 'Institut Ivoirien de Technologie',
      period: '2023 – 2026',
      kind: 'diplome',
    },
    {
      title: 'Certification « Introduction à l’IA moderne »',
      school: 'Cisco Networking Academy / Cybastion IT Academy',
      period: '2025 – 2026',
      kind: 'certification',
    },
    {
      title: 'Baccalauréat série D',
      school: 'Collège privé La Vision Future',
      period: '2022 – 2023',
      kind: 'diplome',
    },
  ],

  skillGroups: <SkillGroup[]>[
    { label: 'Langages', items: ['Python', 'Java', 'Dart', 'JavaScript', 'TypeScript', 'C++', 'C#', 'PHP'] },
    {
      label: 'Frameworks',
      items: ['Django', 'Django REST Framework', 'Flask', 'Flutter', 'Angular', 'React', 'ASP.NET'],
    },
    { label: 'Intelligence artificielle', items: ['Computer Vision', 'Machine Learning'] },
    { label: 'Bases de données', items: ['PostgreSQL', 'MySQL', 'SQL Server', 'SQLite'] },
    { label: 'ERP', items: ['Odoo', 'Oracle'] },
    { label: 'IoT & embarqué', items: ['Arduino', 'ESP8266', 'ESP32', 'Systèmes embarqués'] },
    { label: 'Outils & design', items: ['Git', 'GitHub', 'Figma', 'Adobe Photoshop', 'Canva', 'Infographie'] },
  ],

  softSkills: [
    'Gestion de projets',
    'Travail d’équipe',
    'UX/UI Design',
    'Tests et débogage logiciel',
    'Intégration de systèmes IoT',
    'Programmation embarquée',
  ],
};
