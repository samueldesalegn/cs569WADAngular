// task.service.ts
import { Injectable } from '@angular/core';

@Injectable()
export class TaskService {
  private tasks: string[] = [];

  addTask(task: string) {
    this.tasks.push(task);
  }

  getTasks() {
    return this.tasks;
  }
}
