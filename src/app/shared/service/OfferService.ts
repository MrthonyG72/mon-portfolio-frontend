import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { IService } from '../models/IService';

@Injectable({ providedIn: 'root' })
export class OfferService {
  private apiUrl = `${environment.apiUrl}/services/`;

  constructor(private http: HttpClient) {}

  getServices(): Observable<IService[]> {
    return this.http.get<IService[]>(this.apiUrl);
  }
}