import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: ` <app-child [parentValue]="parentData" (customEvent)="handleEvent($event)" /> `,
  styles: [],
})
export class AppComponent {
  parentData = 'Hello from parent';

  handleEvent(event: string){
    console.log(event);
  }
}
