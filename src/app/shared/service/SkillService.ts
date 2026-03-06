import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { ISkill } from '../models/ISkill';

@Injectable({ providedIn: 'root' })
export class SkillService {
  private apiUrl = `${environment.apiUrl}/skills/`;

  constructor(private http: HttpClient) {}

  getSkills(): Observable<ISkill[]> {
    return this.http.get<ISkill[]>(this.apiUrl);
  }
}
