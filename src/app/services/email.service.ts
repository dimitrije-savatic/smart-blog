import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmailService {
  private emailUrl = 'http://localhost:8000/api/send-email';

  constructor(private http: HttpClient) { }

  sendEmail(data: any): Observable<any>{
    return this.http.post(this.emailUrl, data);
  }
}
