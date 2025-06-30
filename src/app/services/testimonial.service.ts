import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TestimonialService {

  testimonialUrl = 'http://localhost:8000/api/testimonials';

  constructor(private http: HttpClient) { }

  getTestimonialsWithUsers(): Observable<any>{
    return this.http.get(this.testimonialUrl);
  }
}
