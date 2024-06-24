import { Injectable } from '@angular/core';
import { environment } from '../environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Squadra } from '../interface/squadra.interface';

@Injectable({
  providedIn: 'root'
})
export class SquadraService {

 
  private apiUrl = `${environment.apiUrl}`;

  constructor(private http: HttpClient) {}
  
  getSquadre(campionatoId: number): Observable<Squadra[]> {
    return this.http.get<Squadra[]>(`${this.apiUrl}campionato/${campionatoId}/squadre`);
  }
}
