import { Component, inject, signal } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthApi } from '../../services/auth-api';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class Login {
  private fb = inject(FormBuilder);
  private auth = inject(AuthApi);
  private router = inject(Router);

  errorMessage = signal('');

  form = this.fb.nonNullable.group({
    username: ['', Validators.required],
    password: ['', Validators.required]
  });

  submit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const { username, password } = this.form.getRawValue();
    this.auth.login(username, password).subscribe({
      // next: () => this.router.navigate(['/products']),
      next: () => this.router.navigate(['/dashboard']),
      error: (err: HttpErrorResponse) =>
        this.errorMessage.set(
          err.status === 401 ? 'Invalid username or password.' : 'Could not sign in. Is the API running?'
        )
    });
  }
}