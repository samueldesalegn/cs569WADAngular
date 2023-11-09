import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
    <h1 *ngIf="cond; else thao">Hello Asaad</h1>
    <button (click)="cond=!cond">switch</button>

    <ng-template #thao><h1>Hello Thao</h1></ng-template>

    <ul>
      <li *ngFor="let student of students; let i = index" [class.odd]="isOdd(i)">{{i+1}} - {{student.name}} - {{student.grade}}</li>
    </ul>

  `,
  styles: [`
    .odd {
      color: blue;
    }
  `]
})
export class AppComponent {
  cond = true;

  students = [
    { name: 'Asaad', grade: 99 },
    { name: 'Thao', grade: 95 },
    { name: 'Mike', grade: 88 },
    { name: 'John', grade: 92 },
    { name: 'Angela', grade: 87 },
    { name: 'George', grade: 90 },
  ];

  isOdd(index: number): boolean {
    return (index+1) % 2 !== 0;
  }
  
}

