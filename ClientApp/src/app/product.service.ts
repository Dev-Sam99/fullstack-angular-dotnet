import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { signal } from '@angular/core';
import { environment } from '../environments/environment.prod';

@Injectable({ providedIn: 'root' })
export class ProductService {
  products = signal<any[]>([]);

  constructor(private http: HttpClient) {}

  loadProducts() {
    this.http.get<any[]>(`${environment.apiUrl}/products`).subscribe((data) => {
      this.products.set(data);
      console.log('Products loaded:', data);
    });
  }
}
