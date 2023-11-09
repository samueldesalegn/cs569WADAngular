import { Component } from '@angular/core';
import { OPTIONS } from "./options";
import { APP_STATE, APP_INITIAL_STATE, HISTORY } from './types';

@Component({
  selector: 'app-root',
  template: `
  <app-scoreboard [app_state]="app_state"/>
  <app-buttons (human_choice)="compare($event)"/>
  <app-cheating [computer_choice]="app_state.computerChoice"/>
  <app-history [history]="history_state"/>
        
  `,
  styles: []
})
export class AppComponent {
  options = OPTIONS;
  app_state: APP_STATE = APP_INITIAL_STATE;
  history_state: Array<HISTORY> = [];

  constructor() {
    this.#pick_computer_choice();
  }

  compare(playerChoice: OPTIONS) {
    console.log(this.options[playerChoice], this.app_state.computerChoice)
    // this.app_state.winCount++;
    this.app_state= {...this.app_state, winCount: ++this.app_state.winCount}
    // this.history_state.push({human: this.options[playerChoice], computer: this.app_state.computerChoice, result: 'Won'});
    this.history_state = [...this.history_state, {human: this.options[playerChoice], computer: this.app_state.computerChoice, result: 'Won'}]
    this.#pick_computer_choice();
  }
  // handle_human_choice(choice: OPTIONS) {
  //   this.#compare(this.options[choice], this.app_state.computerChoice);
  //   this.app_state.winCount++;
  //   this.#pick_computer_choice();
  // }

  #pick_computer_choice() {
    const key = Math.floor(Math.random() * Object.keys(this.options).length / 2);
    this.app_state.computerChoice = this.options[key];
  }



}
