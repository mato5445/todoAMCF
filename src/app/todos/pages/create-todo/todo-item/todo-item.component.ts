import { Component, inject, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCheckbox } from '@angular/material/checkbox';
import { MatIcon } from '@angular/material/icon';
import { MatButton, MatIconButton } from '@angular/material/button';
import { MatCard } from '@angular/material/card';
import { TodoItemInterface } from '../../../../types/todoItemInterface';
import { TodoService } from '../../../../service/todo.service';

@Component({
  selector: 'app-todo-item',
  standalone: true,
  imports: [
    CommonModule,
    MatCheckbox,
    MatIcon,
    MatIconButton,
    MatButton,
    MatCard,
  ],
  templateUrl: './todo-item.component.html',
  styleUrls: ['./todo-item.component.scss'],
})
export class TodoItemComponent {
  private todoService = inject(TodoService);

  @Input('todo') todoProps!: TodoItemInterface;

  removeTodo(): void {
    this.todoService.removeTodo(this.todoProps.id);
  }

  toggleTodo(): void {
    this.todoService.toggleTodo(this.todoProps.id);
  }
}
