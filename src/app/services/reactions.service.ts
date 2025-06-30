import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { ILike } from '../interfaces/i-like';
import { IDislike } from '../interfaces/i-dislike';
import { IComment } from '../interfaces/i-comment';

@Injectable({
  providedIn: 'root'
})
export class ReactionsService {

  commentsUrl = 'http://localhost:8000/api/comments';
  likesUrl = 'http://localhost:8000/api/likes';
  dislikesUrl = 'http://localhost:8000/api/dislikes';


  constructor(private http: HttpClient) { }


  //Comments
  getComments(): Observable<IComment[]>{
    return this.http.get<IComment[]>(this.commentsUrl);
  }

  getCommentsByPost(id: number): Observable<IComment[]>{
    return this.http.get<IComment[]>(this.commentsUrl+'/'+id);
  }

  postComment(credentials: {body: string, user_id: any, post_id: any}): Observable<IComment>{
    return this.http.post<IComment>(this.commentsUrl, credentials)
  }

  //Likes
  getLikes(): Observable<ILike[]>{
    return this.http.get<ILike[]>(this.likesUrl);
  }

  getLikesByPost(id: number): Observable<ILike[]>{
    return this.http.get<ILike[]>(this.likesUrl+'/'+id);
  }

  likePost(credentials: {post_id: number, user_id:number}): Observable<ILike>{
    return this.http.post<ILike>(this.likesUrl, credentials);
  }

  //Dislikes
  getDislikes() :Observable<IDislike[]>{
    return this.http.get<IDislike[]>(this.dislikesUrl);
  }

  getDislikesByPost(id: number): Observable<IDislike[]>{
    return this.http.get<IDislike[]>(this.dislikesUrl+'/'+id);
  }

  dislikePost(credentials: {post_id: number, user_id:number}): Observable<IDislike>{
    return this.http.post<IDislike>(this.dislikesUrl, credentials);
  }

}
