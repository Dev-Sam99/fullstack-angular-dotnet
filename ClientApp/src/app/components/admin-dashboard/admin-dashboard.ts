import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PostService, Post } from '../../post.service';

@Component({
  standalone: true,
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.html',
  styleUrls: ['./admin-dashboard.css'],
  imports: [CommonModule, FormsModule]
})
export class AdminDashboardComponent {
  postService = inject(PostService);
  posts$ = this.postService.getPosts();
  title = '';
  content = '';
  imageUrl = '';

  createPost() {
    this.postService.createPost({ title: this.title, content: this.content, imageUrl: this.imageUrl }).subscribe(() => {
      this.posts$ = this.postService.getPosts(); // refresh
      this.title = '';
      this.content = '';
      this.imageUrl = '';
    });
  }

  deletePost(id: number) {
    this.postService.deletePost(id).subscribe(() => {
      this.posts$ = this.postService.getPosts(); // refresh
    });
  }
}
