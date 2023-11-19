import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { environment as env } from 'src/environments/environment.development';


export type Todo = {
  _id: string;
  title: string;
  description: string;
  completed: boolean;
};

export type GET_TODOS_RESPONSE = {success: boolean, data: Todo[], next: boolean}
export type ADD_TODO_RESPONSE = { success: boolean; data: Todo };
export type PUT_TODO_RESPONSE = { success: boolean; data: { modifiedCount: number } };
export type DELETE_TODO_RESPONSE = { success: boolean; data: { deletedCount: number }};
export type GET_TODO_RESPONSE = { success: boolean; data: Todo | null };


@Injectable({
  providedIn: 'root',
})
export class TodosService {
  #http = inject(HttpClient);

  get_todos(page: number = 1) {
    return this.#http.get<GET_TODOS_RESPONSE>(
      `${env.SERVER_URL}/todos?page=${page}`
    );
  }

  add_todo(todo: Todo) {
    return this.#http.post<ADD_TODO_RESPONSE>(`${env.SERVER_URL}/todos`, todo);
  }

  get_todo_by_id(todo_id: string) {
    return this.#http.get<GET_TODO_RESPONSE>(
      `${env.SERVER_URL}/todos/${todo_id}`
    );
  }

  delete_todo_by_id(todo_id: string) {
    return this.#http.delete<DELETE_TODO_RESPONSE>(
      `${env.SERVER_URL}/todos/${todo_id}`
    );
  }

  update_todo_by_id(todo: Todo) {
    return this.#http.put<PUT_TODO_RESPONSE>(
      `${env.SERVER_URL}/todos/${todo._id}`, todo
    );
  }
}
