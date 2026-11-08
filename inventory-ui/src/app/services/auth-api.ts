import { Injectable, computed, inject, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable, tap } from 'rxjs';
import { LoginResponse } from '../models/login-response';

@Injectable({ providedIn: 'root' })
export class AuthApi {
  private http = inject(HttpClient);
  private router = inject(Router);
  private apiUrl = 'https://localhost:7292/api/auth';
  private storageKey = 'inventory_session';

  session = signal<LoginResponse | null>(this.readSession());

  isLoggedIn = computed(() => this.session() !== null);
  isAdmin = computed(() => this.session()?.role === 'Admin');
  username = computed(() => this.session()?.username ?? '');
  role = computed(() => this.session()?.role ?? '');

  login(username: string, password: string): Observable<LoginResponse> {
    return this.http
      .post<LoginResponse>(this.apiUrl + '/login', { username, password })
      .pipe(
        tap(res => {
          localStorage.setItem(this.storageKey, JSON.stringify(res));
          this.session.set(res);
        })
      );
  }

  logout(): void {
    localStorage.removeItem(this.storageKey);
    this.session.set(null);
    this.router.navigate(['/login']);
  }

  token(): string | null {
    return this.session()?.token ?? null;
  }

  private readSession(): LoginResponse | null {
    const raw = localStorage.getItem(this.storageKey);
    if (!raw) return null;
    try {
      const s = JSON.parse(raw) as LoginResponse;
      if (new Date(s.expires).getTime() < Date.now()) {
        localStorage.removeItem(this.storageKey);
        return null;
      }
      return s;
    } catch {
      return null;
    }
  }
}