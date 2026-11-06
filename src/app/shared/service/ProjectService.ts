import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { IProject } from '../models/IProject';
import { retryColdStart } from './api.utils';

@Injectable({ providedIn: 'root' })
export class ProjectService {
  private readonly http = inject(HttpClient);
  private readonly apiUrl = `${environment.apiUrl}/projects/`;

  getProjects(): Observable<IProject[]> {
    return this.http.get<IProject[]>(this.apiUrl).pipe(retryColdStart());
  }
}
