import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

export interface Post {
  id: number;
  title: string;
  content: string;
  imageUrl?: string;
  createdAt: string;
}

@Injectable({ providedIn: 'root' })
export class PostService {
  constructor(private http: HttpClient) {}

  getPosts() {
    return this.http.get<Post[]>('/api/post');
  }

  getPost(id: number) {
    return this.http.get<Post>(`/api/post/${id}`);
  }

  createPost(post: Partial<Post>) {
    return this.http.post<Post>('/api/post', post);
  }

  updatePost(id: number, post: Partial<Post>) {
    return this.http.put<Post>(`/api/post/${id}`, post);
  }

  deletePost(id: number) {
    return this.http.delete(`/api/post/${id}`);
  }
}
