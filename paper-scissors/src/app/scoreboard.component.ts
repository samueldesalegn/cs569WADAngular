import { Component, Input, ChangeDetectionStrategy } from '@angular/core';
import { APP_STATE, APP_INITIAL_STATE } from './types';



@Component({
  selector: 'app-scoreboard',
  template: `
    <p>
      Wins: {{app_state.winCount}} - Losses: {{app_state.lossCount}} - Ties: {{app_state.tieCount}}
    </p>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ScoreboardComponent {
 @Input() app_state: APP_STATE = APP_INITIAL_STATE
}
