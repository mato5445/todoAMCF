import { Component, DestroyRef, inject } from '@angular/core';
import { TodoMainComponent } from './todo-main/todo-main.component';
import { TodoItemComponent } from './todo-item/todo-item.component';
import { TodoFooterComponent } from './todo-footer/todo-footer.component';
import { MatCard, MatCardHeader } from '@angular/material/card';
import { MatButton } from '@angular/material/button';
import { map, Observable, tap } from 'rxjs';
import { AsyncPipe, CommonModule } from '@angular/common';
import { MatToolbar } from '@angular/material/toolbar';
import { TodoService } from '../../../service/todo.service';
import { DataService } from '../../../service/data.service';
import { TodoItemInterface } from '../../../types/todoItemInterface';
import { RouterOutlet } from '@angular/router';
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';
import { HeaderComponent } from '../../../shared/components/header/header.component';
import { CreateTodo } from './todo-form/create-todo/create-todo.component';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  standalone: true,
  selector: 'app-create-todo-item',
  templateUrl: './create-todo.component.html',
  imports: [
    CreateTodo,
    CommonModule,
    TodoMainComponent,
    TodoItemComponent,
    TodoFooterComponent,
    MatCard,
    MatCardHeader,
    MatButton,
    AsyncPipe,
    MatToolbar,
    RouterOutlet,
    HeaderComponent,
  ],
})
export class CreateTodoComponent {
  private destroyRef = inject(DestroyRef);
  private _snackBar = inject(MatSnackBar);
  private dataService = inject(DataService);
  private todoService = inject(TodoService);

  noTodoClass$!: Observable<boolean>;
  durationInSeconds = 3;
  headerText = "What need's to be done";
  horizontalPosition: MatSnackBarHorizontalPosition = 'end';
  verticalPosition: MatSnackBarVerticalPosition = 'bottom';

  constructor() {
    this.noTodoClass$ = this.todoService.todos$.pipe(
      map((todos) => todos.length === 0),
    );
  }

  saveTodoList() {
    let requestTodo: TodoItemInterface[] = [];
    this.todoService.todos$
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((res) => {
        requestTodo = res;
      });
    this.dataService
      .saveTodo(requestTodo)
      .pipe(
        tap(() => this.todoService.todos$.next([])),
        takeUntilDestroyed(this.destroyRef),
      )
      .subscribe(() => {
        this.openSnackBar();
      });
  }

  openSnackBar() {
    this._snackBar.open('TODO LIST WAS SAVED !!', '', {
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
      duration: this.durationInSeconds * 1000,
    });
  }
}
