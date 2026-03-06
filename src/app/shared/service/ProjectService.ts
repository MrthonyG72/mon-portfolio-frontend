import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { IProject } from '../models/IProject';

@Injectable({ providedIn: 'root' })
export class ProjectService {
  private apiUrl = `${environment.apiUrl}/projects/`;

  constructor(private http: HttpClient) {}

  getProjects(): Observable<IProject[]> {
    return this.http.get<IProject[]>(this.apiUrl);
  }
}
