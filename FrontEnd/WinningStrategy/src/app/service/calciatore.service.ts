import { Injectable } from '@angular/core';
import { environment } from '../environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Squadra } from '../interface/squadra.interface';
import { Calciatore } from '../interface/calciatore.interface';

@Injectable({
  providedIn: 'root'
})
export class CalciatoreService {

  private apiUrl = `${environment.apiUrl}`;

  constructor(private http: HttpClient) {}
  
  getCalciatoriBySquadreId(squadreId: number): Observable<Calciatore[]> {
    return this.http.get<Calciatore[]>(`${this.apiUrl}squadra/${squadreId}/calciatori`);
  }
}
