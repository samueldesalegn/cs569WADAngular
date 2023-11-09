import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  loginForm: FormGroup;

  constructor(private formBuilder: FormBuilder) {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  onSubmit() {
    if (this.loginForm.valid) {
      const username = this.loginForm.get('username')?.value;
      const password = this.loginForm.get('password')?.value;

      
      if (this.isLoginValid(username, password)) {
        console.log('Login successful');
      } else {
        console.log('Login failed. Please check your credentials.');
      }
    }
  }

  // Simulated login function (replace with your actual login logic)
  private isLoginValid(username: string, password: string): boolean {
    // Replace this with your authentication logic (e.g., API call)
    // For demonstration purposes, we'll assume a static username and password.
    const validUsername = 'user';
    const validPassword = 'password';

    return username === validUsername && password === validPassword;
  }
}
