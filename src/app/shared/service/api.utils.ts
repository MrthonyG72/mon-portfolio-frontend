import { MonoTypeOperatorFunction, retry, timer } from 'rxjs';
import { environment } from '../../../environments/environment';

/**
 * Le backend est hébergé sur Render (offre gratuite) : il se met en veille et le
 * premier appel peut échouer ou mettre 30 à 60 s à répondre. On réessaie quelques
 * fois avec un délai croissant avant d'abandonner.
 */
export function retryColdStart<T>(): MonoTypeOperatorFunction<T> {
  return retry({ count: 3, delay: (_err, attempt) => timer(2000 * attempt) });
}

/** Transforme une URL de média relative (/media/...) en URL absolue vers le backend. */
export function mediaUrl(path: string | null | undefined): string | null {
  if (!path) return null;
  if (path.startsWith('http') || path.startsWith('assets/')) return path;
  return `${environment.backendUrl}${path}`;
}
