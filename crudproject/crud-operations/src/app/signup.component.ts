import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AuthService, User } from './auth.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-signup',
  template: `
    <div class="container">
      <form [formGroup]="form" (ngSubmit)="go()">
        <input type="text" placeholder="Full Name" formControlName="fullname" />
        <input type="email" placeholder="Email" formControlName="email" />
        <input
          type="password"
          placeholder="Password"
          formControlName="password"
        />
        <button type="submit">Sign Up</button>
      </form>
    </div>
  `,
  styles: [
    `
      .container {
        max-width: 400px;
        margin: 20px auto;
      }

      form {
        padding: 20px;
        background-color: #fff;
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
        border-radius: 8px;
      }

      input {
        width: 100%;
        padding: 10px;
        margin-bottom: 15px;
        border: 1px solid #ccc;
        border-radius: 4px;
      }

      button {
        width: 100%;
        padding: 10px;
        background-color: #333;
        color: #fff;
        border: none;
        border-radius: 4px;
        cursor: pointer;
      }

      button:hover {
        background-color: #555;
      }
    `,
  ],
})
export class SignupComponent {
  #auth = inject(AuthService);
  #router = inject(Router);
  #notification = inject(ToastrService);
  form = inject(FormBuilder).nonNullable.group({
    fullname: '',
    email: '',
    password: '',
  });

  go() {
    this.#auth.signup(this.form.value as User).subscribe(response => {
      this.#notification.success('User registered successfully!');
      this.#router.navigate(['', 'signin']);

    });
  }
}
