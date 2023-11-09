// app.component.ts
import { Component } from '@angular/core';
import { TaskService } from './task.service';

@Component({
  selector: 'app-root',
  template: `
    <h1>Task List</h1>
    <input [(ngModel)]="newTask" placeholder="Add a new task" />
    <button (click)="addTask(newTask)">Add Task</button>
    <ul>
      <li *ngFor="let task of tasks">{{ task }}</li>
    </ul>
  `,
})
export class AppComponent {
  newTask: string = '';
  tasks: string[] = [];

  constructor(private taskService: TaskService) {}

  addTask(task: string) {
    this.taskService.addTask(task);
    this.tasks = this.taskService.getTasks();
    this.newTask = '';
  }
}
