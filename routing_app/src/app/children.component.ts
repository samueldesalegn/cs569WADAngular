import { Component, Input, inject } from '@angular/core';
import { Child, DataService } from './data.service';

@Component({
  selector: 'app-children',
  template: ` <p *ngFor="let child of children">{{ child.name }}</p> `,
  styles: [],
})
export class ChildrenComponent {
  children: Child[] = []
  @Input() parent_name: string = '';
  #data = inject(DataService)

  ngOnChanges(){
    this.children = this.#data.getChildren(this.parent_name);
    
  }
}
