import { Component, DestroyRef, inject } from '@angular/core';
import { MatCard } from '@angular/material/card';
import { DatePipe, KeyValuePipe, NgForOf } from '@angular/common';
import { DataService } from '../../../service/data.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatToolbar } from '@angular/material/toolbar';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { SearchFilterPipe } from '../../../pipes/filter.pipe';
import { HeaderComponent } from '../../../shared/components/header/header.component';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  standalone: true,
  selector: 'app-saved-create-todo-item',
  templateUrl: './saved-todos.component.html',
  imports: [
    MatCard,
    KeyValuePipe,
    NgForOf,
    FormsModule,
    DatePipe,
    MatToolbar,
    MatFormField,
    MatInput,
    MatLabel,
    ReactiveFormsModule,
    SearchFilterPipe,
    HeaderComponent,
  ],
})
export class SavedTodosComponent {
  private todoService = inject(DataService);
  private destroyRef = inject(DestroyRef);

  result: any[] = [];
  searchText: string = '';

  constructor() {
    this.fetchTodos();
  }

  fetchTodos() {
    this.todoService
      .fetchTodos()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((res) => {
        this.flattenData(res);
      });
  }

  flattenData(data: any): any[] {
    for (let key in data) {
      if (Array.isArray(data[key])) {
        this.result = this.result.concat(data[key]);
      } else if (data[key].todo) {
        this.result = this.result.concat(data[key].todo);
      }
    }
    return this.result;
  }
}
