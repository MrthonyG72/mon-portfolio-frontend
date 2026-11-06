import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { ISkill } from '../models/ISkill';
import { retryColdStart } from './api.utils';

@Injectable({ providedIn: 'root' })
export class SkillService {
  private readonly http = inject(HttpClient);
  private readonly apiUrl = `${environment.apiUrl}/skills/`;

  getSkills(): Observable<ISkill[]> {
    return this.http.get<ISkill[]>(this.apiUrl).pipe(retryColdStart());
  }
}
