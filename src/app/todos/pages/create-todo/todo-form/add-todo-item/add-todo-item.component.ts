import { Component, inject } from '@angular/core';
import { MatButton } from '@angular/material/button';
import {
  MatDatepicker,
  MatDatepickerInput,
  MatDatepickerToggle,
} from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import {
  MatNativeDateTimeModule,
  MatTimepicker,
  MatTimepickerInput,
  MatTimepickerModule,
  MatTimepickerToggle,
} from '@dhutaryan/ngx-mat-timepicker';
import { CommonModule } from '@angular/common';
import {
  FormControl,
  FormGroup,
  FormGroupDirective,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { blankValidator } from '../../../../../validators/blank.validator';
import { TodoService } from '../../../../../service/todo.service';
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';
import { MatToolbar } from '@angular/material/toolbar';
import { HeaderComponent } from '../../../../../shared/components/header/header.component';
import { Router } from '@angular/router';

@Component({
  standalone: true,

  selector: 'app-add-todo-item',
  templateUrl: './add-todo-item.component.html',
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
export class AddTodoItemComponent {
  private router = inject(Router);
  private _snackBar = inject(MatSnackBar);
  private todoService = inject(TodoService);

  horizontalPosition: MatSnackBarHorizontalPosition = 'end';
  verticalPosition: MatSnackBarVerticalPosition = 'bottom';
  durationInSeconds = 2;
  todoName: string = '';

  form = new FormGroup({
    todoControl: new FormControl('', [Validators.required, blankValidator]),
    dateControl: new FormControl(''),
    timeControl: new FormControl(''),
    textareaControl: new FormControl(''),
  });

  constructor() {
    this.todoName = this.router.getCurrentNavigation()?.extras?.state?.['name'];
  }

  onSubmit(form: FormGroup, f: FormGroupDirective): void {
    this.todoService.addTodo(
      form.controls['todoControl'].value,
      form.controls['textareaControl'].value,
      form.controls['dateControl'].value,
      form.controls['timeControl'].value,
    );
    f.resetForm();
  }

  openSnackBar() {
    this._snackBar.open('Item added!!', '', {
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
      duration: this.durationInSeconds * 1000,
    });
  }
}
