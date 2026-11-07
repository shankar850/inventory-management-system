import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Product } from '../models/product';

@Injectable({ providedIn: 'root' })
export class ProductApi {
  private http = inject(HttpClient);
  private apiUrl = 'https://localhost:7292/api/products';

  getAll(): Observable<Product[]> {
    return this.http.get<Product[]>(this.apiUrl);
  }
}