import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CommentsService {

  commentsUrl = 'http://localhost:8000/api/comments';

  constructor(private http: HttpClient) { }

  getComments(id: number): Observable<any>{
    return this.http.get(this.commentsUrl+'/'+id);
  }

  postComment(credentials: {body: string, user_id: any, post_id: any}): Observable<any>{
    return this.http.post(this.commentsUrl, credentials)
  }

}
