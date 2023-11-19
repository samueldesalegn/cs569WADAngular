import { Component, inject } from '@angular/core';
import {
  GUESS_RESULT,
  INITIAL_STATE,
  IState,
  StateService,
} from './state.service';
import { DataService } from './data.service';
import { FormBuilder } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { response } from 'express';

@Component({
  selector: 'app-words',
  template: `
    <div>
      <h1>Scoreboard</h1>
      <p>Wins: {{ this.stateService.state().win_count }}</p>
      <p>Losses: {{ this.stateService.state().loss_count }}</p>

      <span
        *ngFor="let letter of selected_letters; index as i"
        (click)="removeLetter(i)"
        >{{ letter }}</span
      >
      <button (click)="clearWord()">Clear</button>

      <button (click)="shuffleLetters()">Shuffle</button>
      <button
        *ngFor="let letter of random_letters"
        (click)="selectLetter(letter)"
      >
        {{ letter }}
      </button>
      <button (click)="checkWord()">Check</button>
    </div>
  `,
  styles: [
    `
      span {
        font-size: 26px;
        cursor: pointer;
      }
    `,
  ],
})
export class WordsComponent {
  stateService = inject(StateService);
  private notification = inject(ToastrService);
  private dataService = inject(DataService);
  selected_letters: string[] = []; // Array to hold selected_letters
  random_letters: string[] = []; // Array to hold selected_letters

  form = inject(FormBuilder).group({
    currentWord: '',
  });

  constructor() {
    this.shuffleLetters();
  }

  currentWord: string = ''; // User's current word

  shuffleLetters() {
    this.random_letters = [];
    const complexity = this.stateService.state().complexity;
    for (let i = 0; i < complexity; i++) {
      const randomChar = String.fromCharCode(
        97 + Math.floor(Math.random() * 26)
      );
      this.random_letters.push(randomChar);
    }
  }

  removeLetter(i: number) {
    this.selected_letters = this.selected_letters.filter(
      (letter, index) => index !== i
    );
  }

  checkWord() {
    const wordToCheck = this.selected_letters.join('');
    this.dataService.checkWord(wordToCheck).subscribe((response) => {
      if (response.success) {
        if (response.data.valid) {
          this.notification.success('Correct');
          this.stateService.state.mutate((state) => ++state.win_count);
        } else {
          this.notification.error('Incorrect');
          this.stateService.state.mutate((state) => ++state.loss_count);
        }
        this.stateService.state.mutate((state) =>
          state.logs.push({
            word: wordToCheck,
            result: response.data.valid
              ? GUESS_RESULT.Correct
              : GUESS_RESULT.Incorrect,
            timestamp: Date.now(),
          })
        );
        this.shuffleLetters();
        this.selected_letters = [];
      }
      localStorage.setItem(
        'WORDS_GAME',
        JSON.stringify(this.stateService.state())
      );
    });
  }

  selectLetter(letter: string) {
    this.selected_letters.push(letter);
  }

  clearWord() {
    // Clear the currentWord
    this.selected_letters = [];
    // this.form.controls['currentWord'].reset();
  }
}
