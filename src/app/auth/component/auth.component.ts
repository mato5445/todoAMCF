import { Component, DestroyRef, inject } from '@angular/core';
import {
  MatCard,
  MatCardActions,
  MatCardContent,
  MatCardHeader,
  MatCardTitle,
} from '@angular/material/card';
import { MatError, MatFormField, MatLabel } from '@angular/material/form-field';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatInput } from '@angular/material/input';
import { MatButton } from '@angular/material/button';
import { AuthResponseData, AuthService } from '../service/auth.service';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  standalone: true,
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  imports: [
    MatCard,
    MatCardContent,
    MatLabel,
    MatError,
    MatFormField,
    MatCardActions,
    ReactiveFormsModule,
    CommonModule,
    MatInput,
    MatButton,
    MatCardHeader,
    MatCardTitle,
  ],
})
export class AuthComponent {
  private authService = inject(AuthService);
  private router = inject(Router);
  private destroyRef = inject(DestroyRef);

  isLoginMode = true;
  error: string | null = null;

  form = new FormGroup({
    email: new FormControl(),
    password: new FormControl(),
  });

  onSwitchMode() {
    this.isLoginMode = !this.isLoginMode;
  }

  onSubmit(form: any, formRef: any) {
    if (form.invalid) {
      return;
    }

    let authObs: Observable<AuthResponseData>;

    if (this.isLoginMode) {
      authObs = this.authService.login(form.value.email, form.value.password);
    } else {
      authObs = this.authService.signup(form.value.email, form.value.password);
    }

    authObs.pipe(takeUntilDestroyed(this.destroyRef)).subscribe(
      () => {
        this.router.navigate(['/todo']);
      },
      (error) => {
        this.error = error;
      },
    );

    formRef.resetForm();
  }
}
