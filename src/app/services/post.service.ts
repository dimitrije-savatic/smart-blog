import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, EMPTY } from 'rxjs';
import { IPost } from '../interfaces/i-post';
import { ICategory } from '../interfaces/i-category';
import { HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PostService {
  private getPostsUrl = "http://localhost:8000/api/posts";
  private getCategoriesUrl = 'http://localhost:8000/api/categories';

  constructor(private http: HttpClient) { }


  // POST REQUESTS

  getPosts(params?: HttpParams): Observable<any> {
    return this.http.get<any>(this.getPostsUrl, { params });
  }

  getLatestPosts(): Observable<IPost[]> {
    return this.http.get<IPost[]>(this.getPostsUrl + '/latest');
  }

  getSinglePost(id: number): Observable<IPost> {
    return this.http.get<IPost>(this.getPostsUrl + '/' + id, { withCredentials: true });
  }

  createPost(credentials: { title: string, body: string, user_id: number }): Observable<any> {
    return this.http.post<any>(this.getPostsUrl, credentials);
  }

  updatePost(credentials: { title: string, body: string, user_id: number, category_ids: number[] }, id: number): Observable<any> {
    return this.http.put<any>(this.getPostsUrl + '/' + id, credentials);
  }

  // CATEGORY REQUESTS

  getCategories(): Observable<ICategory[]> {
    return this.http.get<ICategory[]>(this.getCategoriesUrl);
  }

  getSingleCategory(id: number): Observable<ICategory> {
    return this.http.get<ICategory>(this.getCategoriesUrl + '/' + id);
  }

  createCategories(credential: { name: string }): Observable<any> {
    return this.http.post<any>(this.getCategoriesUrl, credential);
  }

  updateCategory(credentials: { name: string }, id: number): Observable<any> {
    return this.http.put<any>(this.getCategoriesUrl + '/' + id, credentials);
  }


  deleteItem(id: number, type: string): Observable<any> {
    if (type == 'post') {
      return this.http.delete(this.getPostsUrl + '/' + id);
    } else if (type == 'categories') {
      return this.http.delete(this.getCategoriesUrl + '/' + id);
    } else {
      return EMPTY;
    }
  }

}
