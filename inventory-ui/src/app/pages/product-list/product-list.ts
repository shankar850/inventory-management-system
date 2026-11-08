import { Component, OnInit, inject, signal } from '@angular/core';
import { CurrencyPipe } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { RouterLink } from '@angular/router';
import { Product } from '../../models/product';
import { ProductApi } from '../../services/product-api';
import { AuthApi } from '../../services/auth-api';

@Component({
  selector: 'app-product-list',
  imports: [CurrencyPipe, RouterLink],
  templateUrl: './product-list.html',
  styleUrl: './product-list.css'
})
export class ProductList implements OnInit {
  private api = inject(ProductApi);
  auth = inject(AuthApi);

  products = signal<Product[]>([]);
  errorMessage = signal('');

  ngOnInit(): void {
    this.api.getAll().subscribe({
      next: data => this.products.set(data),
      error: () => this.errorMessage.set('Could not load products. Is the API running?')
    });
  }

  remove(p: Product): void {
    if (!confirm('Delete ' + p.name + '?')) return;

    this.api.delete(p.id).subscribe({
      next: () => this.products.update(list => list.filter(x => x.id !== p.id)),
      error: (err: HttpErrorResponse) =>
        this.errorMessage.set(
          err.status === 403 ? 'Only an Admin can delete products.' : 'Could not delete the product.'
        )
    });
  }
}