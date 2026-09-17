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

  getUsers(): Observable<IUser[]> {
    return this.http.get<IUser[]>(this.apiUrl);
  }

  getUsersCount(): Observable<number> {
    return this.http.get<number>(this.apiUrl + '/count');
  }

  getSingleUser(id: number): Observable<IUser> {
    return this.http.get<IUser>(this.apiUrl + '/' + id);
  }

}
