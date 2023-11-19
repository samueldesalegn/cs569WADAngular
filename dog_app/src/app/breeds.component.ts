import { Component, inject } from '@angular/core';
import { DataService } from './data.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-breeds',
  template: `
    <button
      (click)="go_to_sub_breed(breed)"
      *ngFor="let breed of breeds"
      type="button"
      class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
    >
      {{ breed }}
    </button>
    <router-outlet />
  `,
  styles: [],
})
export class BreedsComponent {
  #data = inject(DataService);
  #router = inject(Router)
  breeds: string[] = [];
  constructor() {
    this.#data.list_breeds().subscribe((response) => {
      this.breeds = Object.keys(response);
    });
  }
  go_to_sub_breed(breed: string){
    this.#router.navigate(['', "breeds", breed, 'sub-breeds']);
  }
}
