import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Post } from '../models/Post';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private baseUrl = 'https://dummyjson.com';

  constructor(private http: HttpClient) {}

  getPostsByUser(userId: number): Observable<Post[]> {
    return this.http
      .get<{ posts: Post[] }>(`${this.baseUrl}/posts/user/${userId}`)
      .pipe(map((response: { posts: Post[] }) => response.posts));
  }
}
