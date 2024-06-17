import { Component, DestroyRef, inject, OnInit } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Subscription } from 'rxjs';
import { CommonModule } from '@angular/common';
import { MatButton } from '@angular/material/button';
import {
  MatDatepicker,
  MatDatepickerInput,
  MatDatepickerToggle,
} from '@angular/material/datepicker';
import {
  MatNativeDateTimeModule,
  MatTimepicker,
  MatTimepickerInput,
  MatTimepickerModule,
  MatTimepickerToggle,
} from '@dhutaryan/ngx-mat-timepicker';
import { MatToolbar } from '@angular/material/toolbar';
import { AuthService } from '../../../../../auth/service/auth.service';
import { blankValidator } from '../../../../../validators/blank.validator';
import { HeaderComponent } from '../../../../../shared/components/header/header.component';
import { ActivatedRoute, Router } from '@angular/router';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  standalone: true,
  selector: 'app-todo-form',
  templateUrl: './create-todo.component.html',
  imports: [
    MatTimepickerModule,
    MatNativeDateTimeModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    CommonModule,
    MatButton,
    MatDatepickerToggle,
    MatDatepicker,
    MatDatepickerInput,
    MatTimepickerInput,
    MatTimepickerToggle,
    MatTimepicker,
    MatToolbar,
    HeaderComponent,
  ],
})
export class CreateTodo implements OnInit {
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private authService = inject(AuthService);
  private userSubscription!: Subscription;
  private destroyRef = inject(DestroyRef);

  isAuthenticated = false;
  showItemInput = false;
  nameOfTodoList = '';

  todoNameForm = new FormGroup({
    todoName: new FormControl('', [Validators.required, blankValidator]),
  });

  ngOnInit() {
    this.userSubscription = this.authService.user
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((user) => {
        this.isAuthenticated = !!user;
      });
  }

  createList(form: any) {
    this.showItemInput = true;
    this.nameOfTodoList = form.todoName;
    this.router.navigate(['add-item'], {
      relativeTo: this.route,
      state: { name: form.todoName },
    });
  }
}
