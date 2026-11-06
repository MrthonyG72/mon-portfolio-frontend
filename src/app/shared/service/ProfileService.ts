import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, shareReplay } from 'rxjs';
import { environment } from '../../../environments/environment';
import { IProfile } from '../models/IProfile';
import { retryColdStart } from './api.utils';

@Injectable({ providedIn: 'root' })
export class ProfileService {
  private readonly http = inject(HttpClient);
  private readonly apiUrl = `${environment.apiUrl}/profile/`;

  /** Une seule requête partagée entre tous les composants (home, footer). */
  private readonly profile$ = this.http.get<IProfile | null>(this.apiUrl).pipe(
    retryColdStart(),
    shareReplay({ bufferSize: 1, refCount: false }),
  );

  getProfile(): Observable<IProfile | null> {
    return this.profile$;
  }
}
