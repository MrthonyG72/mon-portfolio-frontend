import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { IService } from '../models/IService';
import { retryColdStart } from './api.utils';

@Injectable({ providedIn: 'root' })
export class OfferService {
  private readonly http = inject(HttpClient);
  private readonly apiUrl = `${environment.apiUrl}/services/`;

  getServices(): Observable<IService[]> {
    return this.http.get<IService[]>(this.apiUrl).pipe(retryColdStart());
  }
}
