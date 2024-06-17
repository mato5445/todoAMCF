import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { TodoItemInterface } from '../types/todoItemInterface';

@Injectable({ providedIn: 'root' })
export class DataService {
  private http = inject(HttpClient);

  saveTodo(todo: TodoItemInterface[]): Observable<TodoItemInterface[]> {
    return this.http.post<TodoItemInterface[]>(
      'https://todo-f95b2-default-rtdb.europe-west1.firebasedatabase.app/todos.json',
      todo,
    );
  }

  fetchTodos(): Observable<any> {
    return this.http.get<any>(
      'https://todo-f95b2-default-rtdb.europe-west1.firebasedatabase.app/todos.json',
    );
  }
}
