import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-post-editor',
  imports: [CommonModule,FormsModule],
  templateUrl: './post-editor.html',
  styleUrl: './post-editor.css'
})
export class PostEditor {

}
