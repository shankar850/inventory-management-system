import { Component, OnInit, inject, signal } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { CategoryApi } from '../../services/category-api';

@Component({
  selector: 'app-category-form',
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './category-form.html',
  styleUrl: './category-form.css'
})
export class CategoryForm implements OnInit {
  private fb = inject(FormBuilder);
  private api = inject(CategoryApi);
  private router = inject(Router);
  private route = inject(ActivatedRoute);

  categoryId = signal<number | null>(null);
  errorMessage = signal('');

  form = this.fb.nonNullable.group({
    name: ['', [Validators.required, Validators.maxLength(100)]]
  });

  ngOnInit(): void {
    const idParam = this.route.snapshot.paramMap.get('id');
    if (idParam) {
      const id = Number(idParam);
      this.categoryId.set(id);

      this.api.getById(id).subscribe({
        next: c => this.form.patchValue({ name: c.name }),
        error: () => this.errorMessage.set('Could not load the category.')
      });
    }
  }

  save(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const name = this.form.getRawValue().name.trim();
    const id = this.categoryId();
    const onError = (err: HttpErrorResponse) =>
      this.errorMessage.set(err.error?.message ?? 'Could not save the category.');

    if (id === null) {
      this.api.create(name).subscribe({
        next: () => this.router.navigate(['/categories']),
        error: onError
      });
    } else {
      this.api.update(id, name).subscribe({
        next: () => this.router.navigate(['/categories']),
        error: onError
      });
    }
  }
}