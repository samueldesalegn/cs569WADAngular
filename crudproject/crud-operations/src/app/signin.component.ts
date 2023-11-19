import { Component, inject } from '@angular/core';
import { AuthService, JWT, User } from './auth.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { FormBuilder } from '@angular/forms';
import { jwtDecode } from 'jwt-decode';

@Component({
  selector: 'app-signin',
  template: `
    <form>
      <input type="email" placeholder="email" />
      <input type="password" placeholder="password" />
      <button type="submit">go</button>
    </form>
  `,
  styles: [],
})
export class SigninComponent {
  #auth = inject(AuthService);
  #router = inject(Router);
  #notification = inject(ToastrService);
  form = inject(FormBuilder).nonNullable.group({
    email: '',
    password: '',
  });

  go() {
    this.#auth.signin(this.form.value as User).subscribe((response: any) => {
      const decoded = jwtDecode(response.data) as JWT;
      const state = {
        ...decoded,
        jwt: response.data,
      };
      this.#auth.auth_signal.set(state);
      localStorage.setItem('token', JSON.stringify(state));
      this.#notification.success('User Logged in successfully!');
      this.#router.navigate(['', 'list']);
    });
  }
}
