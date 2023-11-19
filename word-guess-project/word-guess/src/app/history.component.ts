import { Component, inject } from '@angular/core';
import { INITIAL_STATE, StateService } from './state.service';

@Component({
  selector: 'app-history',
  template: `
    <h2>History of Results</h2>
    <button (click)="clear()">Clear History</button>
    <p
      *ngFor="let answer of stateService.state().logs"
      [applyColor]="answer.result"
    >
      {{ answer.word }} -- {{ answer.result }} --{{ answer.timestamp }}
    </p>
  `,
  styles: [],
})
export class HistoryComponent {
  stateService = inject(StateService);

  clear() {
    this.stateService.state.set(INITIAL_STATE);
    localStorage.clear();
  }
}
