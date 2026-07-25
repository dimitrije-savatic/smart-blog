import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IUser } from '../interfaces/i-user';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private loginUrl = 'http://localhost:8000/api/login';
  private registerUrl = 'http://localhost:8000/api/register'
  private logoutUrl = 'http://localhost:8000/api/logout';


  constructor(private http: HttpClient) { }

  login(credentials: { email: string; password: string }): Observable<any> {
    return this.http.post<any>(this.loginUrl, credentials);
  }

  register(credentials: { first_name: string, last_name: string, email: string, password: string }): Observable<IUser> {
    return this.http.post<IUser>(this.registerUrl, credentials);
  }

  logout(credentials: { user: object }): Observable<any> {
    return this.http.post<any>(this.logoutUrl, credentials);
  }

  runValidation(formGroup: any): void {
    Object.keys(formGroup.controls).forEach((ctrlName) => {
      formGroup.get(ctrlName).markAsTouched();
    });
  }
}
