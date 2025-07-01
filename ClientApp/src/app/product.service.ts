import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { signal } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class ProductService {
  products = signal<any[]>([]);

  constructor(private http: HttpClient) {}

  loadProducts() {
    this.http.get<any[]>('/api/products').subscribe((data) => {
      this.products.set(data);
      console.log('Products loaded:', data);
    });
  }
}
