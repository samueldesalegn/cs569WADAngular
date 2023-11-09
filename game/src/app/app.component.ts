import { Component, ElementRef } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
    <h1>
      Wins: {{ scoreboard_state.wins }} - Losses: {{ scoreboard_state.losses }}
    </h1>
    <div [cheat]="game_state.computer_color"
      [ngStyle]="{
        'background-color': game_state.computer_color,
        height: '100px'
      }"
    ></div>
    <button (click)="go(game_state.color1)" [disabled]="buttonsDisabled">{{ game_state.color1 }}</button>
    <button (click)="go(game_state.color2)" [disabled]="buttonsDisabled">{{ game_state.color2 }}</button>
    <button (click)="go(game_state.color3)" [disabled]="buttonsDisabled">{{ game_state.color3 }}</button>

    <div *ngFor="let history of history_state; even as even" [ngStyle]="{'background-color': even ? 'gray' : '#fff'}">
      {{ history.computer }} - {{ history.human }} - {{ history.wins }} -
      {{ history.losses }}
    </div>
    <button (click)="clear()" *ngIf="history_state.length">clear</button>
  `,
  styles: [],
})
export class AppComponent {
  scoreboard_state = { wins: 0, losses: 0 };
  game_state = {
    color1: '',
    color2: '',
    color3: '',
    computer_color: '',
  };
  history_state: Array<{
    computer: string;
    human: string;
    wins: number;
    losses: number;
  }> = [];
  buttonsDisabled: boolean = false;

  ngOnInit() {
   this.#getRandomColors();
   const stored_state = localStorage.getItem('hex');
   if (stored_state) {
    this.history_state = JSON.parse(stored_state);
    const last_item = this.history_state.at(-1);
    this.scoreboard_state = {
      wins: last_item?.wins as number,
      losses: last_item?.losses as number
    }
   }
  }

  go(human: string) {
    if (human === this.game_state.computer_color) {
      this.scoreboard_state.wins++;
    } else {
      this.scoreboard_state.losses++;
    }
    this.history_state.push({
      computer: this.game_state.computer_color,
      human,
      wins: this.scoreboard_state.wins,
      losses: this.scoreboard_state.losses,
    });
    localStorage.setItem('hex', JSON.stringify(this.history_state))
    this.#getRandomColors();
    if (this.scoreboard_state.wins >= 10) {
      this.buttonsDisabled = true;
    }
  }

  #generateRandomHexColor(): string {
    return (
      '#' + ((Math.random() * 0xffffff) << 0).toString(16).padStart(6, '0')
    );
  }

  #getRandomItemFromArray(arr: string[]): string {
    return arr[Math.floor(Math.random() * arr.length)];
  }

  #getRandomColors() {
    const game_colors = [
      this.#generateRandomHexColor(),
      this.#generateRandomHexColor(),
      this.#generateRandomHexColor(),
    ];
    this.game_state.color1 = game_colors[0];
    this.game_state.color2 = game_colors[1];
    this.game_state.color3 = game_colors[2];
    this.game_state.computer_color = this.#getRandomItemFromArray(game_colors);
    this.buttonsDisabled = false; // Re-enable buttons when new colors are set
  }

  clear(){
    this.scoreboard_state = { wins: 0, losses: 0 };
    this.history_state = [];
    localStorage.removeItem('hex');
    this.buttonsDisabled = false; // Re-enable buttons when the history is cleared
  }
}
