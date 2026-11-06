/**
 * Environnement de développement : les appels passent par le proxy du dev-server
 * (voir proxy.conf.json) pour éviter les erreurs CORS depuis http://localhost:4200.
 */
export const environment = {
  production: false,
  apiUrl: '/api/v1',
  backendUrl: 'https://mon-portfolio-backend-f0io.onrender.com',
};
