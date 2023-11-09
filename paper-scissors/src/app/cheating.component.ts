  
  import { Component, Input, ChangeDetectionStrategy  } from '@angular/core';

@Component({
  selector: 'app-cheating',
  template: `
    <p>
      Computer choice is: {{computer_choice}}
    </p>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CheatingComponent {
  @Input() computer_choice = ''
}
