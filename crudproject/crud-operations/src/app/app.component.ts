import { Component, inject } from '@angular/core';
import { AuthService } from './auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  template: `
    <a [routerLink]="['']">Home</a>

    <div *ngIf="authService.auth_signal().jwt; else welcome">
      <button (click)="signin()">sign in</button>
      <button (click)="signup()">sign up</button>
    </div>
    <ng-template #welcome>
      <p>Welcome {{ authService.auth_signal().fullname}}</p>
      <button (click)="signout()">sign out</button>
    </ng-template>
    <router-outlet />
  `,
  styles: [],
})
export class AppComponent {
  authService = inject(AuthService);
  #router = inject(Router);

  signup() {
    this.#router.navigate(['', 'signup']);
  }

  signin() {
    this.#router.navigate(['', 'signin']);
  }

  signout() {
    this.authService.auth_signal.set({
      _id: '',
      fullname: '',
      email: '',
      jwt: '',
    });

    localStorage.clear();
    this.#router.navigate(['', 'signin']);
  }
}
