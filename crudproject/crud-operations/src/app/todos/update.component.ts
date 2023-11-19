import { Component, Input, inject } from '@angular/core';
import { Todo, TodosService } from './todos.service';
import { Router } from '@angular/router';
import { FormBuilder } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-update',
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
export class UpdateComponent {
  #service = inject(TodosService);
  #router = inject(Router);
  #notification = inject(ToastrService)
  @Input() todo_id: string = '';
  form = inject(FormBuilder).nonNullable.group({
    _id: '',
    title: '',
    description: '',
    completed: false,
  });

  ngOnInit() {
    this.#service.get_todo_by_id(this.todo_id).subscribe((response) => {
      if (response.data) this.form.patchValue(response.data);
    });
  }

  go() {
    this.#service
      .update_todo_by_id(this.form.value as Todo)
      .subscribe((response) => {
        this.#router.navigate(['']);
        this.#notification.success('Todo is updated successfully');
      });
  }
}
