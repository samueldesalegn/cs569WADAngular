import { Component, EventEmitter, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-defar',
  template: `
    <p>
      defar works! {{ count }} - message from Joshua: {{ jmessage }}
    </p>
    <app-joshua treat="maths" (msg)="print($event)" />
  `,
  styles: [],
  changeDetection: ChangeDetectionStrategy.Default,
})
export class DefarComponent {
  jmessage = '';
  count = 0;

  constructor(private cdRef: ChangeDetectorRef) {} // Add this constructor

  print(msg: string) {
    this.jmessage = msg;
    this.cdRef.detectChanges(); // Explicitly trigger change detection
  }
}
