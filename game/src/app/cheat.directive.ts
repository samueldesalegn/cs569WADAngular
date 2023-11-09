import { Directive, HostListener, Input } from '@angular/core';

@Directive({
  selector: '[cheat]'
})
export class CheatDirective {

  @Input() cheat: string = '';

  @HostListener('dblclick') foo() {
    alert(this.cheat)
  }

}
