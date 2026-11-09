import { Routes } from '@angular/router';
import { Dashboard } from './pages/dashboard/dashboard';
import { ProductList } from './pages/product-list/product-list';
import { ProductForm } from './pages/product-form/product-form';
import { CategoryList } from './pages/category-list/category-list';
import { CategoryForm } from './pages/category-form/category-form';
import { Login } from './pages/login/login';
import { authGuard } from './guards/auth.guards';

export const routes: Routes = [
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
  { path: 'login', component: Login },
  { path: 'dashboard', component: Dashboard, canActivate: [authGuard] },
  { path: 'products', component: ProductList, canActivate: [authGuard] },
  { path: 'products/new', component: ProductForm, canActivate: [authGuard] },
  { path: 'products/:id/edit', component: ProductForm, canActivate: [authGuard] },
  { path: 'categories', component: CategoryList, canActivate: [authGuard] },
  { path: 'categories/new', component: CategoryForm, canActivate: [authGuard] },
  { path: 'categories/:id/edit', component: CategoryForm, canActivate: [authGuard] }
];