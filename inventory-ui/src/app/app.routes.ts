import { Routes } from '@angular/router';
import { ProductList } from './pages/product-list/product-list';
import { ProductForm } from './pages/product-form/product-form';
import { CategoryList } from './pages/category-list/category-list';
import { Login } from './pages/login/login';
import { authGuard } from './guards/auth.guards';

export const routes: Routes = [
  { path: '', redirectTo: 'products', pathMatch: 'full' },
  { path: 'login', component: Login },
  { path: 'products', component: ProductList, canActivate: [authGuard] },
  { path: 'products/new', component: ProductForm, canActivate: [authGuard] },
  { path: 'products/:id/edit', component: ProductForm, canActivate: [authGuard] },
  { path: 'categories', component: CategoryList, canActivate: [authGuard] }
];