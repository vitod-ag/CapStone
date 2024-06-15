import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../environments/environment.development';
import { AuthService } from './auth.service';
import { User } from '../interface/user.interface';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProfiloService {
private apiUrl=environment.apiUrl;

  constructor(private http: HttpClient,private authService: AuthService) { }

  updateUser(id: number, user: Partial<User>): Observable<User> {
    return this.http.patch<User>(`${this.apiUrl}users/${id}`, user);
  }

  updateAvatar(id: number, formData: FormData) : Observable<User> {
    return this.http.patch<User>(`${this.apiUrl}users/${id}/avatar`, formData)
  }

}
