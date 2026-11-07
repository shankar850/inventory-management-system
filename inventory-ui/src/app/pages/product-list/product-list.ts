import { Component, OnInit, inject, signal } from '@angular/core';
import { CurrencyPipe } from '@angular/common';
import { Product } from '../../models/product';
import { ProductApi } from '../../services/product-api';


@Component({
  selector: 'App-product-list',
  imports:[CurrencyPipe],
  templateUrl:'./product-list.html',
  styleUrl:'./product-list.css'
})

export class ProductList implements OnInit{
  private api = inject (ProductApi);
  products = signal<Product[]>([]);

  errorMessage = signal('');

  ngOnInit(): void {
    this.api.getAll().subscribe({
      next: data => this.products.set(data),
      error: () => this.errorMessage.set('Could not load products. Is the API running?')
    });
  }
}
