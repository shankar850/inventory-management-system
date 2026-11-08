import { Component, OnInit, inject, signal } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Category } from '../../models/category';
import { ProductCreate } from '../../models/product-create';
import { ProductUpdate } from '../../models/product-update';
import { CategoryApi } from '../../services/category-api';
import { ProductApi } from '../../services/product-api';

@Component({
  selector: 'app-product-form',
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './product-form.html',
  styleUrl: './product-form.css'
})
export class ProductForm implements OnInit {
  private fb = inject(FormBuilder);
  private categoryApi = inject(CategoryApi);
  private productApi = inject(ProductApi);
  private router = inject(Router);
  private route = inject(ActivatedRoute);

  categories = signal<Category[]>([]);
  errorMessage = signal('');
  productId = signal<number | null>(null);

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

    const idParam = this.route.snapshot.paramMap.get('id');
    if (idParam) {
      const id = Number(idParam);
      this.productId.set(id);
      this.form.controls.sku.disable();
      this.form.controls.quantityInStock.disable();

      this.productApi.getById(id).subscribe({
        next: p => this.form.patchValue({
          name: p.name,
          sku: p.sku,
          description: p.description ?? '',
          price: p.price,
          quantityInStock: p.quantityInStock,
          reorderLevel: p.reorderLevel,
          categoryId: p.categoryId
        }),
        error: () => this.errorMessage.set('Could not load the product.')
      });
    }
  }

  private serverMessage(err: HttpErrorResponse, fallback: string): string {
    return err.error?.message ?? fallback;
  }

  save(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const v = this.form.getRawValue();
    const id = this.productId();

    if (id === null) {
      const product: ProductCreate = v;
      this.productApi.create(product).subscribe({
        next: () => this.router.navigate(['/products']),
        error: (err: HttpErrorResponse) =>
          this.errorMessage.set(this.serverMessage(err, 'Could not save the product.'))
      });
    } else {
      const product: ProductUpdate = {
        name: v.name,
        description: v.description || null,
        price: v.price,
        reorderLevel: v.reorderLevel,
        categoryId: v.categoryId
      };
      this.productApi.update(id, product).subscribe({
        next: () => this.router.navigate(['/products']),
        error: (err: HttpErrorResponse) =>
          this.errorMessage.set(this.serverMessage(err, 'Could not update the product.'))
      });
    }
  }
}