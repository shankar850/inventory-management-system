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

  getById(id: number): Observable<Category> {
    return this.http.get<Category>(this.apiUrl + '/' + id);
  }

  create(name: string): Observable<{ id: number; name: string }> {
    return this.http.post<{ id: number; name: string }>(this.apiUrl, { name });
  }

  update(id: number, name: string): Observable<void> {
    return this.http.put<void>(this.apiUrl + '/' + id, { name });
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(this.apiUrl + '/' + id);
  }
}