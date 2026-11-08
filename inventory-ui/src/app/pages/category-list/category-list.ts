import { Component, OnInit, inject, signal } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { RouterLink } from '@angular/router';
import { Category } from '../../models/category';
import { CategoryApi } from '../../services/category-api';
import { AuthApi } from '../../services/auth-api';

@Component({
  selector: 'app-category-list',
  imports: [RouterLink],
  templateUrl: './category-list.html',
  styleUrl: './category-list.css'
})
export class CategoryList implements OnInit {
  private api = inject(CategoryApi);
  auth = inject(AuthApi);

  categories = signal<Category[]>([]);
  errorMessage = signal('');

  ngOnInit(): void {
    this.api.getAll().subscribe({
      next: data => this.categories.set(data),
      error: () => this.errorMessage.set('Could not load categories. Is the API running?')
    });
  }

  remove(c: Category): void {
    if (!confirm('Delete ' + c.name + '?')) return;
    this.errorMessage.set('');

    this.api.delete(c.id).subscribe({
      next: () => this.categories.update(list => list.filter(x => x.id !== c.id)),
      error: (err: HttpErrorResponse) =>
        this.errorMessage.set(
          err.status === 403
            ? 'Only an Admin can delete categories.'
            : (err.error?.message ?? 'Could not delete the category.')
        )
    });
  }
}