import { HttpClient } from '@angular/common/http';
import { Injectable, signal } from '@angular/core';
import { Observable, tap, catchError, of } from 'rxjs';
import { IUser } from '../interfaces/i-user';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private loginUrl = 'http://localhost:8000/api/login';
  private registerUrl = 'http://localhost:8000/api/register'
  private logoutUrl = 'http://localhost:8000/api/logout';

  constructor(private http: HttpClient) { }

  private readonly TOKEN_KEY = 'access_token';
  private readonly USER_KEY = 'user';
  private user = this.getUser();

  setAuth(user: any, token: string): void {
    localStorage.setItem(this.TOKEN_KEY, token);
    localStorage.setItem(this.USER_KEY, JSON.stringify(user));
  }

  getToken(): string | null {
    return localStorage.getItem(this.TOKEN_KEY);
  }

  getUser(): any | null {
    const user = localStorage.getItem(this.USER_KEY);

    return user ? JSON.parse(user) : null;
  }

  isAuthenticated(): boolean {
    return !!this.getToken();
  }

  isAdmin(): boolean {
    if (this.user.role_id == 1) {
      return true
    } else {
      return false;
    }
  }

  clearUser(): void {
    localStorage.removeItem(this.TOKEN_KEY);
    localStorage.removeItem(this.USER_KEY);
  }

  login(credentials: { email: string; password: string }): Observable<any> {
    return this.http.post<any>(this.loginUrl, credentials, { withCredentials: true });
  }

  register(credentials: { username: string, first_name: string, last_name: string, email: string, password: string }): Observable<IUser> {
    return this.http.post<IUser>(this.registerUrl, credentials, { withCredentials: true });
  }

  logout(credentials: { user: object }): Observable<any> {
    return this.http.post<any>(this.logoutUrl, credentials, { withCredentials: true });
  }

  runValidation(formGroup: any): void {
    Object.keys(formGroup.controls).forEach((ctrlName) => {
      formGroup.get(ctrlName).markAsTouched();
    });
  }
}
