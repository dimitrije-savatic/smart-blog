import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { IUser } from "../interfaces/i-user";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(public http: HttpClient) { }

  private apiUrl = 'http://localhost:8000/api/users';

  getUsers(): Observable<IUser[]>{
    return this.http.get<IUser[]>(this.apiUrl);
  }

  getSingleUser(id: number): Observable<IUser>{
    return this.http.get<IUser>(this.apiUrl+'/user/'+id);
  }

  getToken(): string | null{
    return localStorage.getItem('token');
  }

  getUser(): any{
    const user = localStorage.getItem('user');
    return user ?  JSON.parse(user) : null;
  }

  isLoggedIn(): boolean{
    return !!this.getToken();
  }

  isAdmin(): boolean{
      const user  = this.getUser();
      if (user.role_id == 1) {
        return true;
      }else{
        return false;
      }
    }

  logout(): void{
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  }
}
