import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map, EMPTY } from 'rxjs';
import { IPost } from '../interfaces/i-post';
import { ICategory } from '../interfaces/i-category';

@Injectable({
  providedIn: 'root'
})
export class PostsApiService {
  private getPostsUrl = "http://localhost:8000/api/posts";
  private getCategoriesUrl = 'http://localhost:8000/api/categories';

  constructor(private http: HttpClient) { }


  // POST REQUESTS

  getPosts(): Observable<IPost[]> {
    return this.http.get<IPost[]>(this.getPostsUrl);
  }

  getPostsWithCategories(): Observable<any>{
    return this.http.get(this.getPostsUrl+'/categories');
  }

  getSinglePost(id: number): Observable<IPost>{
    return this.http.get<IPost>(this.getPostsUrl+'/post/'+id);
  }

  createPost(credentials: {title: string, body: string, user_id: number}): Observable<any>{
    return this.http.post<any>(this.getPostsUrl+'/create', credentials);
  }

  updatePost(credentials: {id: number, title: string, body: string, user_id: number}): Observable<any>{
    return this.http.put<any>(this.getPostsUrl+'/update', credentials);
  }

  // CATEGORY REQUESTS

  getCategories() : Observable<ICategory[]> {
    return this.http.get<ICategory[]>(this.getCategoriesUrl);
  }

  getCategoriesByPost(id: number): Observable<ICategory> {
    return this.http.get<ICategory>(this.getCategoriesUrl+'/post/'+id);
  }

  getSingleCategory(id: number): Observable<ICategory>{
    return this.http.get<ICategory>(this.getCategoriesUrl+'/'+id);
  }
  
  createCategories(credential: {name: string}): Observable<any>{
    return this.http.post<any>(this.getCategoriesUrl+'/create', credential);
  }

  updateCategory(credentials: {id: number, name: string}): Observable<any>{
    return this.http.put<any>(this.getCategoriesUrl+'/update', credentials);
  }


  deleteItem(id:number, type: string): Observable<any>{
    if (type == 'post') {
    return this.http.delete(this.getPostsUrl+'/delete/'+id);
    }else if (type == 'categories') {
      return this.http.delete(this.getCategoriesUrl+'/delete/'+id);
    }else{
      return EMPTY;
    }
  }

}
