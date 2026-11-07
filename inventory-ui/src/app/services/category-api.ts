import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Category } from '../models/category';


@Injectable({ providedIn: 'root' })
export class CategoryApi {
  private http = inject(HttpClient);
  private apiUrl = 'https://localhost:7292/api/categories';

  getAll(): Observable<Category[]> {
    return this.http.get<Category[]>(this.apiUrl);
  }
}