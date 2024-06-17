import { Component, inject } from '@angular/core';
import { combineLatest, map, Observable } from 'rxjs';
import { TodoItemInterface } from '../../../../types/todoItemInterface';
import { CommonModule } from '@angular/common';
import { TodoItemComponent } from '../todo-item/todo-item.component';
import { MatCheckbox } from '@angular/material/checkbox';
import { MatButton } from '@angular/material/button';
import { TodoService } from '../../../../service/todo.service';
import { DataService } from '../../../../service/data.service';
import { FilterEnum } from '../../../../types/filter.enum';

@Component({
  standalone: true,
  selector: 'app-todo-main',
  templateUrl: './todo-main.component.html',
  imports: [CommonModule, TodoItemComponent, MatCheckbox, MatButton],
})
export class TodoMainComponent {
  private todoService = inject(TodoService);

  visibleTodos$: Observable<TodoItemInterface[]>;
  noTodoClass$: Observable<boolean>;

  constructor() {
    this.noTodoClass$ = this.todoService.todos$.pipe(
      map((todos) => todos.length === 0),
    );
    this.visibleTodos$ = combineLatest(
      this.todoService.todos$,
      this.todoService.filter$,
    ).pipe(
      map(([todos, filter]: [TodoItemInterface[], FilterEnum]) => {
        if (filter === FilterEnum.active) {
          return todos.filter((todo) => !todo.isCompleted);
        } else if (filter === FilterEnum.completed) {
          return todos.filter((todo) => todo.isCompleted);
        }
        return todos;
      }),
    );
  }
}
