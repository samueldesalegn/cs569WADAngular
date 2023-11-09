import { Component, Input, ChangeDetectionStrategy } from '@angular/core';
import { HISTORY } from './types';

@Component({
  selector: 'app-history',
  template: `
    <p *ngFor="let his of history">{{his.human}} -{{his.computer}} - {{his.result}}</p>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HistoryComponent {
@Input() history: HISTORY[]= []
}
