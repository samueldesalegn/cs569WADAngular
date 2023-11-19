import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
    <nav>
      <a [routerLink]="['']">home</a>
      <a [routerLink]="['', 'parents']">parents</a>
    </nav>
    <router-outlet />
  `,
  styles: [
    `
      a {
        text-decoration: none;
        margin-right: 10px;
        color: #007bff;
      }
    `,
  ],
})
export class AppComponent {
  title = 'routing_app';
}
