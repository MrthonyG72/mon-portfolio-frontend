# Portfolio — Anzouan Gomis Thony Axel

Site vitrine personnel (ingénieur logiciel) : projets, parcours, compétences, services et formulaire de contact.

- **Frontend** : Angular 21 (composants standalone, signals, contrôle de flux `@if/@for`), SCSS, sans jQuery ni framework CSS.
- **Backend** : API REST Django hébergée sur Render (`https://mon-portfolio-backend-f0io.onrender.com/api/v1`). Le contenu (profil, projets, compétences, services) se gère depuis l'admin Django.
- **Hébergement** : Vercel (`https://mon-portfolio-frontend.vercel.app`).

## Démarrer en local

```bash
npm install
npm start
```

Puis ouvrir `http://localhost:4200/`.

En développement, les appels `/api/...` sont relayés vers le backend Render par le proxy du serveur de dev (`proxy.conf.json`), ce qui évite les erreurs CORS depuis `localhost`. L'environnement de dev est défini dans `src/environments/environment.development.ts`.

> Le backend Render (offre gratuite) se met en veille : le premier appel peut prendre 30 à 60 s. En attendant, le site affiche les données de secours de `src/app/shared/data/fallback.ts`, puis les remplace par celles de l'API.

## Scripts

| Commande        | Rôle                                                   |
| --------------- | ------------------------------------------------------ |
| `npm start`     | Serveur de dev avec proxy API et rechargement à chaud  |
| `npm run build` | Build de production dans `dist/portfolio/browser`      |
| `npm test`      | Tests unitaires (Vitest)                               |

## Structure

```
src/
├─ app/
│  ├─ home/                 # Page d'accueil (hero, projets, à propos, compétences, services, contact)
│  ├─ notfound/             # Page 404
│  └─ shared/
│     ├─ components/        # header (navigation, menu mobile) et footer
│     ├─ data/fallback.ts   # Données affichées avant/sans réponse de l'API
│     ├─ directives/        # appReveal : animation à l'entrée dans l'écran
│     ├─ models/            # Interfaces IProfile, IProject, ISkill, IService
│     └─ service/           # Appels API + scroll-spy (section active)
├─ assets/img/              # Image du hero et portrait
├─ environments/            # URLs de l'API (prod / dev)
└─ styles.scss              # Variables, boutons, sections, animations
```

## Mettre à jour le contenu

Deux sources se complètent :

- **Admin Django** : profil (photo, liens), projets (image, description, technologies séparées par des virgules, lien), compétences (pourcentage), services (description, outils), expériences.
- **`src/app/shared/data/cv.ts`** : tout ce que le backend ne gère pas, repris du CV : bio, localisation, langues, permis, projets et expériences du CV, formation, certifications, stack technique et savoir-faire.

Les projets et expériences des deux sources sont fusionnés à l'affichage : un projet de l'admin portant le même titre qu'un projet du CV remplace celui du CV (et garde son année).

Le **CV PDF** est servi par le site depuis `public/cv/`. Pour le mettre à jour, remplacer le fichier (et son nom dans `cv.ts` s'il change). Le champ `cv_url` de l'admin, s'il est renseigné, prend le dessus.

`src/app/shared/data/fallback.ts` contient le profil, les compétences et les services affichés pendant le réveil du backend ; à garder à peu près synchronisé avec l'admin.

## Déploiement

Vercel construit le projet avec `npm run build` et sert `dist/portfolio/browser`. Le fichier `vercel.json` redirige toutes les routes vers `index.html` pour que la page 404 Angular fonctionne même en accès direct.

Le backend doit autoriser l'origine du site dans sa configuration CORS (`CORS_ALLOWED_ORIGINS`).
