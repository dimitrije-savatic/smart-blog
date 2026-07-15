import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map, EMPTY } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PostsApiService {
  private getPostsUrl = "http://localhost:8000/api/posts";
  private getCategoriesUrl = 'http://localhost:8000/api/categories';

  constructor(private http: HttpClient) { }


  // POST REQUESTS

  getPosts(): Observable<any> {
    return this.http.get(this.getPostsUrl);
  }

  getPostsPaginated(page: number, pageSize: number): Observable<any>{
    const params = {
      _page: page.toString(),
      _limit: pageSize.toString()
    };
    return this.http.get<any[]>(this.getPostsUrl, { params });
  }

  getPostsWithCategories(): Observable<any>{
    return this.http.get(this.getPostsUrl+'/categories');
  }

  getSinglePost(id: number): Observable<any>{
    return this.http.get(this.getPostsUrl+'/post/'+id);
  }

  createPost(credentials: {title: string, body: string, user_id: number}): Observable<any>{
    return this.http.post(this.getPostsUrl+'/create', credentials);
  }

  updatePost(credentials: {id: number, title: string, body: string, user_id: number}): Observable<any>{
    return this.http.put(this.getPostsUrl+'/update', credentials);
  }

  // CATEGORY REQUESTS

  getCategories() : Observable<any> {
    return this.http.get(this.getCategoriesUrl);
  }

  getCategoriesByPost(id: number): Observable<any> {
    return this.http.get(this.getCategoriesUrl+'/post/'+id);
  }

  getSingleCategory(id: number): Observable<any>{
    return this.http.get(this.getCategoriesUrl+'/'+id);
  }
  
  createCategories(credential: {name: string}): Observable<any>{
    return this.http.post(this.getCategoriesUrl+'/create', credential);
  }

  updateCategory(credentials: {id: number, name: string}): Observable<any>{
    return this.http.put(this.getCategoriesUrl+'/update', credentials);
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
