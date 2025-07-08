import { catchError, delay, tap } from 'rxjs/operators';
import { of, throwError } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
export interface Post {
  id: number;
  title: string;
  content: string;
  imageUrl?: string;
  category: 'blog' | 'photography';
  createdAt: string;
  likes: number;
  comments: Comment[];
}

export interface Comment {
  id: number;
  postId: number;
  content: string;
  author: string;
  createdAt: string;
}

@Injectable({ providedIn: 'root' })
export class PostService {
  constructor(private http: HttpClient) {}

  // getPosts() {
  //   return this.http.get<Post[]>('/api/post').pipe(
  //     tap(() => console.log('Fetched posts')),
  //     catchError(err => {
  //       console.error('Fetch posts failed', err);
  //       return throwError(() => err);
  //     })
  //   );
  // }
getPosts() {
    const dummyPosts: Post[] = [
      {
        id: 1,
        title: 'Exploring Angular 17',
        content: 'Angular 17 comes with powerful features and improved performance.',
        imageUrl: 'https://source.unsplash.com/600x400/?angular',
        category: 'blog',
        createdAt: new Date().toISOString(),
        likes: 12,
        comments: [
          { id: 1,postId:221, author: 'Alice', content: 'Awesome update!', createdAt: new Date().toISOString() },
          { id: 2,postId:222, author: 'Bob', content: 'Very informative.', createdAt: new Date().toISOString() }
        ]
      },
      {
        id: 2,
        title: 'Why Tailwind CSS Rocks',
        content: 'Tailwind helps you build modern UIs fast with utility classes.',
        imageUrl: 'https://source.unsplash.com/600x400/?css',
        category: 'blog',
        createdAt: new Date().toISOString(),
        likes: 20,
        comments: [
          { id: 1,postId:224, author: 'Eve', content: 'Totally agree!', createdAt: new Date().toISOString() }
        ]
      },
      {
        id: 3,
        title: 'Full-Stack Blog with .NET + Angular',
        content: 'Combine the power of .NET APIs with Angular frontend to build robust applications.',
        imageUrl: 'https://source.unsplash.com/600x400/?coding',
        category: 'blog',
        createdAt: new Date().toISOString(),
        likes: 34,
        comments: []
      }
    ];

    return of(dummyPosts).pipe(delay(500)); // Simulated API delay
  }
  getPost(id: number) {
    return this.http.get<Post>(`/api/post/${id}`);
  }
 getPostById(id: string) {
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

