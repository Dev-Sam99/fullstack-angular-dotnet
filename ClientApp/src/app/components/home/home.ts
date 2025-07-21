// src/app/components/home/home.component.ts
import {
  AfterViewInit,
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { PostService } from '../../services/post.service';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Post } from '../../models/post';

declare const VANTA: any;
declare const THREE: any;
@Component({
  selector: 'app-home',
  standalone: true, // ✅ Must be here
  templateUrl: './home.html',
  styleUrls: ['./home.css'],
  imports: [RouterLink, CommonModule],
})
export class HomeComponent implements AfterViewInit, OnDestroy, OnInit {
  posts: Post[] = [];
  photographyPosts: Post[] = [];
  vantaEffect: any;

  constructor(private postService: PostService) {}

  ngOnInit(): void {
    this.postService.getPosts().subscribe((data) => {
      this.posts = data;
      console.log(this.posts);
      this.photographyPosts = data.filter((p) => p.imageUrl);
    });
  }

  ngAfterViewInit(): void {
    const el = document.querySelector('#vanta-bg');
    if (el && !this.vantaEffect) {
      this.vantaEffect = VANTA.WAVES({
        el,
        THREE,
        mouseControls: true,
        touchControls: true,
        gyroControls: false,
        color: 0x1e3a8a,
        shininess: 50,
        waveHeight: 20,
        waveSpeed: 0.7,
        zoom: 1,
      });
    }
  }

  ngOnDestroy(): void {
    if (this.vantaEffect) this.vantaEffect.destroy();
  }

  getImage(post: Post): string {
    return post.imageUrl || 'https://placehold.co/600x400?text=No+Image';
  }

  onImageError(event: Event): void {
    (event.target as HTMLImageElement).src = 'https://placehold.co/600x400?text=No+Image';
  }
}
