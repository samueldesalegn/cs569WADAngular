import { Component, EventEmitter, Output, ChangeDetectionStrategy } from '@angular/core';
import { OPTIONS } from './options';


@Component({
  selector: 'app-buttons',
  template: `
    <button (click)="sendHumanChoice(options.Rock)">{{options[0]}}</button>
    <button (click)="sendHumanChoice(options.Paper)">{{options[1]}}</button>
    <button (click)="sendHumanChoice(options.Scissors)">{{options[2]}}</button>
  `,
  styles: [
  ], 
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ButtonsComponent {
 options = OPTIONS;

 @Output() human_choice = new EventEmitter<OPTIONS>();
 sendHumanChoice(choice: OPTIONS) {
  this.human_choice.emit(choice);
 }


}
