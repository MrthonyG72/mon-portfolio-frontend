import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

export interface IContactPayload {
  full_name: string;
  object: string;
  email: string;
  message: string;
}

@Injectable({ providedIn: 'root' })
export class ContactService {
  private apiUrl = `${environment.apiUrl}/contacts/create/`;

  constructor(private http: HttpClient) {}

  sendMessage(payload: IContactPayload): Observable<unknown> {
    return this.http.post(this.apiUrl, payload);
  }
}
