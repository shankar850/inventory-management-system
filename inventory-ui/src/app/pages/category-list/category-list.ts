import { Component, OnInit, inject, signal } from '@angular/core';
import { Category } from '../../models/category';
import { CategoryApi } from '../../services/category-api';

@Component({
  selector: 'app-category-list',
  imports: [],
  templateUrl: './category-list.html',
  styleUrl: './category-list.css'
})
export class CategoryList implements OnInit {
  private api = inject(CategoryApi);
  categories = signal<Category[]>([]);
  errorMessage = signal('');

  ngOnInit(): void {
    this.api.getAll().subscribe({
      next: data => this.categories.set(data),
      error: () => this.errorMessage.set('Could not load categories. Is the API running?')
    });
  }
}