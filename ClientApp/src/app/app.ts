import { Component, OnInit } from '@angular/core';
import { ProductService } from './product.service';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule,RouterOutlet],
  template: `<router-outlet></router-outlet>`,
  styleUrls: ['./app.css'],

})
export class App implements OnInit {
  constructor(public productService: ProductService) {}

  ngOnInit() {
    console.log('App initialized');
    this.productService.loadProducts();
    console.log('Products:', this.productService.products());
  }
}
