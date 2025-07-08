import { Component } from '@angular/core';
import { PostService } from '../../post.service';

@Component({
  selector: 'app-post',
  providers: [PostService],
  templateUrl: './post.html',
  styleUrl: './post.css',
})
export class Post {

}
