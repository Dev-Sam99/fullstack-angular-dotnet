import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PostService, Post } from '../../post.service';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [CommonModule,RouterModule],
  templateUrl: './admin-dashboard.html',
  styleUrls: ['./admin-dashboard.css']
})
export class AdminDashboardComponent implements OnInit {
  posts: Post[] = [];

  constructor(private postService: PostService) {}

  ngOnInit(): void {
    this.loadPosts();
  }

  loadPosts() {
    this.postService.getPosts().subscribe({
      next: (res) => this.posts = res,
      error: (err) => console.error(err)
    });
  }

  deletePost(id: number) {
    if (confirm('Are you sure to delete this post?')) {
      this.postService.deletePost(id).subscribe(() => {
        this.posts = this.posts.filter(p => p.id !== id);
      });
    }
  }
}
