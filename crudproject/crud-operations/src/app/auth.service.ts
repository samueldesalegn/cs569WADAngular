import { HttpClient } from '@angular/common/http';
import { Injectable, inject, signal } from '@angular/core';

export type User = {
  _id: string;
  fullname: string;
  email: string;
  password: string;
};

export type JWT = {
  _id: string;
  fullname: string;
  email: string;
};

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  auth_signal = signal({ _id: '', fullname: '', email: '', jwt: '' });
  #http = inject(HttpClient);
  constructor(){
    const state = localStorage.getItem('token');
    if (state) {
      this.auth_signal.set(JSON.parse(state))
    }
  }

  isLoggedIn() {
    return this.auth_signal().jwt ? true : false;
  }

  signup(user: User) {
    return this.#http.post(`http://localhost:3000/users/signup`, user)
  }

  signin(user: { email: string; password: string }) {
    return this.#http.post(`http://localhost:3000/users/signin`, user)
  }
  
}
