import { Component, Input, inject } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { DataService } from './data.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-edit-parent',
  template: `
    <p>Editing: {{ parent_name }}</p>
    <form [formGroup]="parent_form" (ngSubmit)="saveIncome()">
      <input formControlName="income" />
      <button type="submit">save</button>
    </form>
  `,
  styles: [],
})
export class EditParentComponent {
  #router = inject(Router)
  #data = inject(DataService);
  @Input() parent_name: string = '';
  parent_form = inject(FormBuilder).nonNullable.group({
    name: '',
    income: 0,
  });

  ngOnChanges() {
    const parent_obj = this.#data.get_parent_details(this.parent_name);
    const incomev = parent_obj.income ? +parent_obj.income : 0;
    if (parent_obj) {
      this.parent_form.patchValue({
        name: parent_obj.name,
        income: incomev
      });
    }
    // console.log(incomev)
  
  }
  saveIncome() {
    this.#data.save_parent_details(this.parent_form.value as {name: string, income: number})
    console.log(this.parent_form.value)
    this.#router.navigate([''])
  }
}
