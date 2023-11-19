import { Directive, ElementRef, Input, Renderer2, inject } from '@angular/core';
import { GUESS_RESULT } from './state.service';

@Directive({
  selector: '[applyColor]',
})
export class ColorDirective {
  @Input() applyColor: string = '';

  private element = inject(ElementRef);
  private renderer = inject(Renderer2);

  ngOnInit() {
    this.renderer.setStyle(
      this.element.nativeElement,
      'background-color',
      this.applyColor === GUESS_RESULT.Correct ? 'green' : 'red'
    );
  }
}
