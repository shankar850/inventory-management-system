import { Component, OnInit, inject, signal } from '@angular/core';
import { CurrencyPipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Product } from '../../models/product';
import { ProductApi } from '../../services/product-api';

@Component({
  selector: 'app-product-list',
  imports: [CurrencyPipe, RouterLink],
  templateUrl: './product-list.html',
  styleUrl: './product-list.css'
})
export class ProductList implements OnInit {
  private api = inject(ProductApi);
  products = signal<Product[]>([]);
  errorMessage = signal('');

  ngOnInit(): void {
    this.api.getAll().subscribe({
      next: data => this.products.set(data),
      error: () => this.errorMessage.set('Could not load products. Is the API running?')
    });
  }

  remove(p: Product): void {
    if (!confirm(`Delete ${p.name}?`)) return;

    this.api.delete(p.id).subscribe({
      next: () => this.products.update(list => list.filter(x => x.id !== p.id)),
      error: () => this.errorMessage.set('Could not delete the product.')
    });
  }

}