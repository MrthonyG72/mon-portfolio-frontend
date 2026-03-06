import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { IProfile } from '../models/IProfile';

@Injectable({ providedIn: 'root' })
export class ProfileService {
  private apiUrl = `${environment.apiUrl}/profile/`;

  constructor(private http: HttpClient) {}

  getProfile(): Observable<IProfile | null> {
    return this.http.get<IProfile | null>(this.apiUrl);
  }
}
