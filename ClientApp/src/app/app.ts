import { Component, OnInit } from '@angular/core';
import { ProductService } from './product.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './app.html',
  styleUrls: ['./app.css']
})
export class App implements OnInit {
  constructor(public productService: ProductService) {}

  ngOnInit() {
    console.log('App initialized');
    this.productService.loadProducts();
    console.log('Products:', this.productService.products());
  }
}
