import { Component, EventEmitter, Input, Output, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-joshua',
  template: `
    <p>
      joshua works! {{ treat }}
    </p>

    <input #theMsg />
    <button (click)="sendMsg(theMsg.value)">Send Msg to Defar</button>
  `,
  styles: [],
  changeDetection: ChangeDetectionStrategy.Default, // Add this line
})
export class JoshuaComponent {
  @Input() treat: string = '';
  @Output() msg = new EventEmitter<string>();

  sendMsg(message: string) {
    console.log(message);
    this.msg.emit(message);
  }
}
