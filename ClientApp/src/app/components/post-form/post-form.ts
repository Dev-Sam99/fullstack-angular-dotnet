import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PostService, Post } from '../../post.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-post-form',
  standalone: true,
  imports: [FormsModule, CommonModule],
  template: `
    <div class="max-w-xl mx-auto mt-6">
      <h2 class="text-xl font-bold mb-4">{{ postId ? 'Edit' : 'Create' }} Post</h2>
      <form (ngSubmit)="submitPost()">
        <input [(ngModel)]="post.title" name="title" placeholder="Title"
               class="w-full p-2 mb-2 border rounded" required />

        <textarea [(ngModel)]="post.content" name="content" rows="5" placeholder="Content"
                  class="w-full p-2 mb-2 border rounded" required></textarea>

        <input [(ngModel)]="post.imageUrl" name="imageUrl" placeholder="Image URL"
               class="w-full p-2 mb-4 border rounded" />

        <button type="submit" class="bg-blue-600 text-white px-4 py-2 rounded">
          {{ postId ? 'Update' : 'Create' }} Post
        </button>
      </form>
    </div>
  `
})
export class PostFormComponent implements OnInit {
  postId: number | null = null;
  post: Partial<Post> = { title: '', content: '', imageUrl: '' };

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private postService: PostService
  ) {}

  ngOnInit() {
    this.postId = Number(this.route.snapshot.paramMap.get('id'));
    if (this.postId) {
      this.postService.getPost(this.postId).subscribe((data) => (this.post = data));
    }
  }

  submitPost() {
    if (this.postId) {
      this.postService.updatePost(this.postId, this.post).subscribe(() =>
        this.router.navigate(['/admin'])
      );
    } else {
      this.postService.createPost(this.post).subscribe(() =>
        this.router.navigate(['/admin'])
      );
    }
  }
}
