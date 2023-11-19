import { Component, inject } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Todo, TodosService } from './todos.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-add',
  template: `
    <form [formGroup]="form" (ngSubmit)="go()">
      <input type="text" placeholder="todo title" formControlName="title" />
      <input
        type="text"
        placeholder="todo description"
        formControlName="description"
      />
      <br />
      <input type="checkbox" formControlName="completed" id="completed" />
      <label for="completed">completed?</label>
      <input type="submit" />
    </form>
  `,
  styles: [],
})
export class AddComponent {
  #service = inject(TodosService);
  #router = inject(Router);
  #notification = inject(ToastrService)
  form = inject(FormBuilder).nonNullable.group({
    title: '',
    description: '',
    completed: false,
  });

  go() {
    this.#service.add_todo(this.form.value as Todo).subscribe((response) => {
      this.#router.navigate(['']);
      this.#notification.success('Todo is added successfully');
    });
  }
}
