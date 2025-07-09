import { Observable } from "rxjs";
import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Post } from "./models/post";

@Injectable({
  providedIn: 'root'
})
export class PostService {
  private apiUrl = 'https://fullstack-angular-dotnet.onrender.com/api/post'; // Adjust the URL as neede

  constructor(private http: HttpClient) {}

  getPosts(): Observable<Post[]> {
    return this.http.get<Post[]>(this.apiUrl);
  }

  getPostById(id: string): Observable<Post> {
    return this.http.get<Post>(`${this.apiUrl}/${id}`);
  }

  createPost(post: Post): Observable<any> {
    return this.http.post(this.apiUrl, post);
  }

  updatePost(id: any, post: Post): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, post);
  }

  deletePost(id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}

