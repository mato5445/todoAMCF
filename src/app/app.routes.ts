import { Routes } from '@angular/router';
import {AuthComponent} from "./auth/component/auth.component";
import {canActivateFn} from "./auth/guard/auth.guard";
import {SavedTodosComponent} from "./todos/pages/saved-todos/saved-todos.component";
import {CreateTodoComponent} from "./todos/pages/create-todo/create-todo.component";
import {AddTodoItemComponent} from "./todos/pages/create-todo/todo-form/add-todo-item/add-todo-item.component";
import {CreateTodo} from "./todos/pages/create-todo/todo-form/create-todo/create-todo.component";

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'todo',
    pathMatch: "full"
  },
  {
    path: 'todo',
    component: CreateTodoComponent,
    canActivate: [canActivateFn],
    children: [
      {
        path: '',
        component: CreateTodo
      },
      {
        path: 'add-item',
        component: AddTodoItemComponent
      },

    ]
  },
  {
    path: 'saved-todos',
    component: SavedTodosComponent,
    canActivate: [canActivateFn],
  },
  {
    path: 'auth',
    component: AuthComponent
  },
  {
    path: '**',
    redirectTo: 'todo',
  }
];
