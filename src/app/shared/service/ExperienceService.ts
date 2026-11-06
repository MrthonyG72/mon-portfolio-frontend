import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { IExperience } from '../models/IExperience';
import { retryColdStart } from './api.utils';

@Injectable({ providedIn: 'root' })
export class ExperienceService {
  private readonly http = inject(HttpClient);
  private readonly apiUrl = `${environment.apiUrl}/experiences/`;

  getExperiences(): Observable<IExperience[]> {
    return this.http.get<IExperience[]>(this.apiUrl).pipe(retryColdStart());
  }
}
