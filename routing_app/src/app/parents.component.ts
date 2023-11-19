import { Component, inject } from '@angular/core';
import { DataService, Parent } from './data.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-parents',
  template: `
    <p *ngFor="let parent of parents">
      <a [routerLink]="['', 'parents', parent.name]">{{ parent.name }}</a>
      <button (click)="edit(parent.name)">edit</button>
    </p>
    <router-outlet />
  `,
  styles: [],
})
export class ParentsComponent {

  #data = inject(DataService);
  #router = inject(Router)
  parents: Parent[] = [];
  constructor() {
    this.parents = this.#data.data_signal();
  }

  edit(parent_name: string){
    this.#router.navigate(['', 'parents', parent_name, 'edit'])
  }
}
