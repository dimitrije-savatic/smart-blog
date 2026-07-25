import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IReaction } from '../interfaces/i-reaction';
import { IComment } from '../interfaces/i-comment';

@Injectable({
  providedIn: 'root'
})
export class ReactionsService {

  commentsUrl = 'http://localhost:8000/api/comments';
  postsUrl = 'http://localhost:8000/api/posts';
  reactionsUrl = 'http://127.0.0.1:8000/api/reactions';
  countsUrl = 'http://127.0.0.1:8000/api/counts'

  constructor(private http: HttpClient) { }

  //Comments
  getComments(): Observable<IComment[]> {
    return this.http.get<IComment[]>(this.commentsUrl);
  }

  getCommentsCount(): Observable<number> {
    return this.http.get<number>(this.commentsUrl + '/count');
  }

  getCommentsByPost(id: number): Observable<IComment[]> {
    return this.http.get<IComment[]>(this.commentsUrl + '/' + id);
  }

  addComment(credentials: { body: string, user_id: any, post_id: any }): Observable<IComment> {
    return this.http.post<IComment>(this.commentsUrl, credentials)
  }

  //Likes
  getReactions(): Observable<IReaction[]> {
    return this.http.get<IReaction[]>(this.reactionsUrl);
  }

  getReactionsByPost(id: number): Observable<IReaction[]> {
    return this.http.get<IReaction[]>(this.reactionsUrl + '/' + id);
  }

  getReactionsCount(): Observable<number> {
    return this.http.get<number>(this.reactionsUrl + '/count');
  }

  addReaction(credentials: { user_id: number, reactable_id: number, reactable_type: string, type: string }): Observable<IReaction> {
    return this.http.post<IReaction>(this.reactionsUrl, credentials);
  }

  //separate counts of all(reactions, comments, users) 
  getCounts(): Observable<any> {
    return this.http.get<any>(this.countsUrl)
  }
}
