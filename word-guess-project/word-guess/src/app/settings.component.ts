import { Component, inject } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { StateService } from './state.service';

@Component({
  selector: 'app-settings',
  template: `
    <form [formGroup]="form">
      <input
        type="number"
        formControlName="complexity"
        min="3"
        max="26"
        (change)="setComplexity()"
      />
    </form>
  `,
  styles: [],
})
export class SettingsComponent {
  stateService = inject(StateService);
  form = inject(FormBuilder).group({
    complexity: [
      this.stateService.state().complexity,
      [Validators.min(3), Validators.max(6)],
    ],
  });

  setComplexity() {
    const currentComplexity = this.form.get('complexity')?.value;
    if (this.form.get('complexity')?.valid) {
      this.stateService.state.mutate(
        (state) => (state.complexity = currentComplexity!)
      );
    }
    console.log(this.stateService.state());
    console.log(currentComplexity);
  }
}
