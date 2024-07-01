import { Injectable } from '@angular/core';
import { environment } from '../environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { catchError, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SalvatiService {

  private apiUrl = `${environment.apiUrl}`;

  constructor(private http: HttpClient) { }

  private errors(err: any) {
    console.log(err)
      let error = "";
      switch (err.error) {
          case 'Email already exists':
              error = "Utente già presente"
              break;

          case 'Incorrect password':
              error = 'Password errata';
              break;

          case 'Cannot find user':
              error = 'Utente non trovato';
              break;
          case 'Password is too short':
            error = 'La password è troppo corta';
            break
          default:
              error = 'Errore nella chiamata';
              break;
      }
      return throwError(error)
  }
  saveData(data: {campionatoId: number, squadraId: number, colore: string, modulo: string, noteTattiche: string, giocatoriPosizionati: { x:string, y:string, calciatoreId: number}[]}) {
    return this.http.post(`${environment.apiUrl}salvataggio`, data).pipe(catchError(this.errors));
  }

  getSavedData(){
    return this.http.get(`${environment.apiUrl}salvati`);
  }

  getSaveDataById(id:number){
    return this.http.get(`${environment.apiUrl}salvati/${id}`).pipe(catchError(this.errors));
  }

  clearSavedData(): void {
    localStorage.removeItem('savedData');
  }

}