import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Product } from '../models/product';
import { ProductCreate } from '../models/product-create';
import { ProductDetail } from '../models/product-detail';
import { ProductUpdate } from '../models/product-update';

@Injectable({ providedIn: 'root' })
export class ProductApi {
  private http = inject(HttpClient);
  private apiUrl = 'https://localhost:7292/api/products';

  getAll(): Observable<Product[]> {
    return this.http.get<Product[]>(this.apiUrl);
  }

  getById(id: number): Observable<ProductDetail> {
    return this.http.get<ProductDetail>(this.apiUrl + '/' + id);
  }

  create(product: ProductCreate): Observable<{ id: number; name: string }> {
    return this.http.post<{ id: number; name: string }>(this.apiUrl, product);
  }

  update(id: number, product: ProductUpdate): Observable<void> {
    return this.http.put<void>(this.apiUrl + '/' + id, product);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(this.apiUrl + '/' + id);
  }
}