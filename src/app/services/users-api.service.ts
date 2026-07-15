import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsersApiService {

  constructor(public http: HttpClient) { }

  private apiUrl = 'http://localhost:8000/api/users';

  getUsers(): Observable<any>{
    return this.http.get(this.apiUrl);
  }

  getSingleUser(id: number): Observable<any>{
    return this.http.get(this.apiUrl).pipe(map((users: any) =>{
      let foundUser = users.find((x:any) => x.id == id)
      return foundUser
    }))
  }
}
