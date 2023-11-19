import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
    <nav>
      <a [routerLink]="['']">Home</a>
      <!-- <a [routerLink]="['']">Breeds</a> -->
    </nav>
    <router-outlet />
  `,
  styles: [],
})
export class AppComponent {
  title = 'dog_app';
}
