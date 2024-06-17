import {
  Component,
  DestroyRef,
  inject,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { MatToolbar } from '@angular/material/toolbar';
import { Subscription } from 'rxjs';
import { AuthService } from './auth/service/auth.service';
import { JsonPipe, KeyValuePipe, NgForOf, NgIf } from '@angular/common';
import { MatCard } from '@angular/material/card';
import { CreateTodoComponent } from './todos/pages/create-todo/create-todo.component';
import { CreateTodo } from './todos/pages/create-todo/todo-form/create-todo/create-todo.component';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    CreateTodoComponent,
    CreateTodo,
    MatToolbar,
    NgIf,
    JsonPipe,
    NgForOf,
    KeyValuePipe,
    MatCard,
    RouterLink,
    RouterLinkActive,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent implements OnInit, OnDestroy {
  private authService = inject(AuthService);
  private destroyRef = inject(DestroyRef);

  userSubscription!: Subscription;
  isAuthenticated!: boolean;

  ngOnInit() {
    this.userSubscription = this.authService.user
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((user) => {
        this.isAuthenticated = !!user;
      });
    this.authService.autoLogin();
  }

  ngOnDestroy() {
    this.userSubscription.unsubscribe();
  }

  onLogout() {
    this.authService.logout();
  }
}
