import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AccessCode } from './models/accessCode.model';

@Injectable({
  providedIn: 'root'
})
export class AccessCodeService {
  private apiUrl = 'http://localhost:9093/accesscode'; // Assurez-vous que ce soit la bonne URL de l'API backend

  constructor(private http: HttpClient) {}

  addAccessCode(accessCode: AccessCode, idFormation: number): Observable<AccessCode> {
    return this.http.post<AccessCode>(`${this.apiUrl}/add/formation/${idFormation}`, accessCode);
  }

  deleteAccessCode(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/delete/${id}`);
  }

  getAccessCodeById(id: number): Observable<AccessCode> {
    return this.http.get<AccessCode>(`${this.apiUrl}/get/${id}`);
  }

  getAllAccessCodes(): Observable<AccessCode[]> {
    return this.http.get<AccessCode[]>(`${this.apiUrl}/all`);
  }
}
