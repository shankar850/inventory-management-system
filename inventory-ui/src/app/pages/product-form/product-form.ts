import { Component, OnInit, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Category } from '../../models/category';
import { ProductCreate } from '../../models/product-create';
import { CategoryApi } from '../../services/category-api';
import { ProductApi } from '../../services/product-api';
import { Router, RouterLink } from '@angular/router';
imports: [ReactiveFormsModule, RouterLink]
@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.html',
  styleUrl: './product-form.css',
  imports: [ReactiveFormsModule, RouterLink],
})
export class ProductForm implements OnInit {
  private fb = inject(FormBuilder);
  private categoryApi = inject(CategoryApi);
  private productApi = inject(ProductApi);
  private router = inject(Router);

  categories = signal<Category[]>([]);
  errorMessage = signal('');

  form = this.fb.nonNullable.group({
    name: ['', [Validators.required, Validators.maxLength(100)]],
    sku: ['', [Validators.required, Validators.maxLength(50)]],
    description: [''],
    price: [0, [Validators.required, Validators.min(0.01)]],
    quantityInStock: [0, [Validators.required, Validators.min(0)]],
    reorderLevel: [0, [Validators.required, Validators.min(0)]],
    categoryId: [0, [Validators.required, Validators.min(1)]]
  });

  ngOnInit(): void {
    this.categoryApi.getAll().subscribe({
      next: data => this.categories.set(data),
      error: () => this.errorMessage.set('Could not load categories. Is the API running?')
    });
  }

  save(): void {
    if (this.form.invalid) return;

    const product: ProductCreate = this.form.getRawValue();
    this.productApi.create(product).subscribe({
      next: () => this.router.navigate(['/products']),
      error: () => this.errorMessage.set('Could not save. Check the values, and that the SKU is not already used.')
    });



  }
}