import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { TodoItemInterface } from '../types/todoItemInterface';
import { FilterEnum } from '../types/filter.enum';

@Injectable({ providedIn: 'root' })
export class TodoService {
  todos$ = new BehaviorSubject<TodoItemInterface[]>([]);
  filter$ = new BehaviorSubject<FilterEnum>(FilterEnum.all);

  addTodo(
    text: string,
    description?: string,
    date?: Date,
    time?: number,
  ): void {
    const newTodo: TodoItemInterface = {
      text,
      isCompleted: false,
      id: Math.random().toString(16),
      description: description,
      date: date,
      time: time,
    };
    const updatedTodos = [...this.todos$.getValue(), newTodo];
    this.todos$.next(updatedTodos);
  }

  toggleAll(isCompleted: boolean): void {
    const updatedTodos = this.todos$.getValue().map((todo) => {
      return {
        ...todo,
        isCompleted,
      };
    });
    this.todos$.next(updatedTodos);
  }

  changeFilter(filterName: FilterEnum): void {
    this.filter$.next(filterName);
  }

  removeTodo(id: string): void {
    const updatedTodos = this.todos$
      .getValue()

      .filter((todo) => todo.id !== id);

    this.todos$.next(updatedTodos);
  }

  toggleTodo(id: string): void {
    const updatedTodos = this.todos$.getValue().map((todo) => {
      if (todo.id === id) {
        return {
          ...todo,
          isCompleted: !todo.isCompleted,
        };
      }
      return todo;
    });
    this.todos$.next(updatedTodos);
  }
}
