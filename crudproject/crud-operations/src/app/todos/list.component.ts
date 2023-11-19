import { Component, Input, inject } from '@angular/core';
import { Todo, TodosService } from './todos.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-list',
  template: `
    <button (click)="handle_add()">Add new</button>
    <p *ngFor="let todo of todos">
      <a [routerLink]="['', 'update', todo._id]">{{ todo.title }}</a>
      <button (click)="handle_delete(todo._id)">X</button>
    </p>
    <button (click)="handle_next()" *ngIf="display_next">next</button>
  `,
  styles: [],
})
export class ListComponent {
  #service = inject(TodosService);
  #router = inject(Router);
  #notification = inject(ToastrService)
  @Input() page = 1;
  todos: Todo[] = [];
  display_next: boolean = false;
  ngOnChanges() {
    this.#service.get_todos(this.page).subscribe(({ data, next }) => {
      this.todos = data;
      this.display_next = next;
    });
  }

  handle_next() {
    this.#router.navigate(['', 'list'], {
      queryParams: { page: this.page + 1 },
    });
  }

  handle_add() {
    this.#router.navigate(['', 'add']);
  }

  handle_delete(todo_id: string) {
    this.#service.delete_todo_by_id(todo_id).subscribe(response =>{
      this.todos = this.todos.filter(todo => todo._id !== todo_id);
      this.#notification.success('Todo is deleted')
    });
  }
}
