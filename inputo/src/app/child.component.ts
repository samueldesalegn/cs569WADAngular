import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-child',
  template: `
    <h2>Child Component</h2>
    <p>Value from parent: {{ parentValue }}</p>
    <button (click)="customEvent.emit('Hello from child')">Emit</button>
  `,
  styles: [
  ]
})
export class ChildComponent {
  @Input() parentValue!: string;
  @Output() customEvent = new EventEmitter<string>();
}
