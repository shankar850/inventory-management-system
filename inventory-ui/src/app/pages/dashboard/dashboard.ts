import { Component, OnInit, computed, inject, signal } from '@angular/core';
import { CurrencyPipe } from '@angular/common';
// import { RouterLink } from '@angular/router';
import { Category } from '../../models/category';
import { DashboardSummary, LowStockItem } from '../../models/dashboard';
import { CategoryApi } from '../../services/category-api';
import { DashboardApi } from '../../services/dashboard-api';

@Component({
  selector: 'app-dashboard',
  imports: [CurrencyPipe],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css'
})
export class Dashboard implements OnInit {
  private dashboardApi = inject(DashboardApi);
  private categoryApi = inject(CategoryApi);

  summary = signal<DashboardSummary | null>(null);
  lowStock = signal<LowStockItem[]>([]);
  categories = signal<Category[]>([]);
  errorMessage = signal('');

  maxCount = computed(() => Math.max(1, ...this.categories().map(c => c.productCount)));

  ngOnInit(): void {
    const fail = () => this.errorMessage.set('Could not load the dashboard. Is the API running?');

    this.dashboardApi.getSummary().subscribe({
      next: data => this.summary.set(data),
      error: fail
    });

    this.dashboardApi.getLowStock().subscribe({
      next: data => this.lowStock.set(data),
      error: fail
    });

    this.categoryApi.getAll().subscribe({
      next: data => this.categories.set(data),
      error: fail
    });
  }

  barWidth(count: number): number {
    return Math.round((count / this.maxCount()) * 100);
  }
}