import { Injectable } from '@angular/core';
import { environment } from '../environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Campionato } from '../interface/campionato.interface';

@Injectable({
  providedIn: 'root'
})
export class CampionatoService {

  private apiUrl = `${environment.apiUrl}campionato`;

  constructor(private http: HttpClient) {}

  getCampionati(): Observable<{ content: Campionato[] }> {
    return this.http.get<{ content: Campionato[] }>(this.apiUrl);
  }
}
