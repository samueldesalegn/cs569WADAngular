import { Component, Input, inject } from '@angular/core';
import { DataService } from './data.service';
import { BannedService } from './banned.service';

@Component({
  selector: 'app-sub-breeds',
  template: `
    <h3>Selected Breed is: {{ breed }}</h3>

    <button
      (click)="ban()"
      *ngIf="!breed_ban_status"
      type="button"
      class="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
    >
      Ban
    </button>
    <button
      (click)="unban()"
      *ngIf="breed_ban_status"
      type="button"
      class="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
    >
      Unban
    </button>
    <img [src]="breed_img_url" />

    <div *ngIf="!sub_breeds.length">No sub breeds for {{ breed }}</div>
    <button
      (click)="fetch_sub_breed_image_of(sub_breed)"
      *ngFor="let sub_breed of sub_breeds"
      type="button"
      class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
    >
      {{ sub_breed }}
    </button>
    <img [src]="sub_breed_img_url" />
  `,
  styles: [],
})
export class SubBreedsComponent {
  breed_img_url: string = '';
  sub_breed_img_url: string = '';
  sub_breeds: string[] = [];
  #data = inject(DataService);
  #ban_service = inject(BannedService);

  @Input() breed: string = '';
  breed_ban_status: boolean = false;

  ngOnChanges() {
    this.#data.get_breed_image(this.breed).subscribe((imgUrl) => {
      this.breed_img_url = imgUrl;
    });
    this.#data.list_sub_breeds(this.breed).subscribe((res) => {
      this.sub_breeds = res;
    });
    this.sub_breed_img_url = '';
    this.breed_ban_status = this.#ban_service.isBanned(this.breed);
  }

  fetch_sub_breed_image_of(sub_breed: string) {
    this.#data
      .get_sub_breed_image(this.breed, sub_breed)
      .subscribe((imgUrl) => {
        this.sub_breed_img_url = imgUrl;
      });
  }
  ban() {
    this.#ban_service.ban(this.breed);
    this.breed_ban_status = true;
  }
  unban() {
    this.#ban_service.unban(this.breed);
    this.breed_ban_status = false;
  }
}
