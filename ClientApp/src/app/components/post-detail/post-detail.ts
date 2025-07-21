import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { PostService } from '../../services/post.service'; // adjust path
import * as THREE from 'three';
import FOG from 'vanta/dist/vanta.fog.min';
import { Post } from '../../models/post';

@Component({
  selector: 'app-post-detail',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './post-detail.html',
  styleUrls: ['./post-detail.css']
})
export class PostDetailComponent implements OnInit, OnDestroy {
  post!: Post;
  vantaEffect: any;

  constructor(
    private route: ActivatedRoute,
    private postService: PostService
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.postService.getPostById(id).subscribe(post => {
        this.post = post;
        this.post.title =  'Untitled Post';
        this.post.content =  'No content available.';
        this.post.imageUrl =  'https://source.unsplash.com/600x400/?nature';
        console.log(this.post);
      });
    }

    this.vantaEffect = FOG({
      el: '#vanta-fog',
      THREE,
      highlightColor: 0xff00d2,
      midtoneColor: 0xffa1,
      lowlightColor: 0x7aff,
      baseColor: 0xffebeb,
      blurFactor: 0.6,
      speed: 1
    });
  }

  ngOnDestroy(): void {
    if (this.vantaEffect) this.vantaEffect.destroy();
  }
}
