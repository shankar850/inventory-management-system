import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { DashboardSummary, LowStockItem } from '../models/dashboard';

@Injectable({ providedIn: 'root' })
export class DashboardApi {
  private http = inject(HttpClient);
  private apiUrl = 'https://localhost:7292/api/dashboard';

  getSummary(): Observable<DashboardSummary> {
    return this.http.get<DashboardSummary>(this.apiUrl + '/summary');
  }

  getLowStock(): Observable<LowStockItem[]> {
    return this.http.get<LowStockItem[]>(this.apiUrl + '/low-stock');
  }
}