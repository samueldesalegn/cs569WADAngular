import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { StateService } from './state.service';
import { DataService } from './data.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-root',
  template: `
    <nav>
      <div>
        <a [routerLink]="['', 'words']" class="nav-link">Words Game</a>
        <a [routerLink]="['', 'history']" class="nav-link">History</a>
        <a [routerLink]="['', 'settings']" class="nav-link">Settings</a>
      </div>
      <h2>Word Guessing Game</h2>
    </nav>
    <router-outlet> </router-outlet>
  `,
  styles: [
    `
      .nav-link {
        margin-left: 3ch;
      }
    `,
  ],
})
export class AppComponent {
  result: any = false;
  private stateService = inject(StateService);
  private dataService = inject(DataService);
  private notification = inject(ToastrService);

  private router = inject(Router);
}
