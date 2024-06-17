import { Component, inject } from '@angular/core';
import { map, Observable } from 'rxjs';
import { CommonModule } from '@angular/common';
import { MatCheckbox } from '@angular/material/checkbox';
import { FilterEnum } from '../../../../types/filter.enum';
import { TodoService } from '../../../../service/todo.service';

@Component({
  standalone: true,
  selector: 'app-todos-footer',
  templateUrl: './todo-footer.component.html',
  styleUrls: ['./todo-footer.component.scss'],
  imports: [CommonModule, MatCheckbox],
})
export class TodoFooterComponent {
  private todoService = inject(TodoService);

  noTodosClass$: Observable<boolean>;
  activeCount$: Observable<number>;
  itemsLeftText$: Observable<string>;
  filter$: Observable<FilterEnum>;
  filterEnum = FilterEnum;
  isAllTodosSelected$: Observable<boolean>;

  constructor() {
    this.isAllTodosSelected$ = this.todoService.todos$.pipe(
      map((todos) => todos.every((todo) => todo.isCompleted)),
    );

    this.activeCount$ = this.todoService.todos$.pipe(
      map((todos) => todos.filter((todo) => !todo.isCompleted).length),
    );
    this.itemsLeftText$ = this.activeCount$.pipe(
      map((activeCount) => `item${activeCount !== 1 ? 's' : ''} left`),
    );
    this.noTodosClass$ = this.todoService.todos$.pipe(
      map((todos) => todos.length === 0),
    );
    this.filter$ = this.todoService.filter$;
  }

  changeFilter(event: Event, filterName: FilterEnum): void {
    event.preventDefault();
    this.todoService.changeFilter(filterName);
  }

  toggleAllTodos(event: any): void {
    this.todoService.toggleAll(event);
  }
}
