import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BreedImageResponse, ListBreedsResponse, SubBreedImageResponse, SubBreedResponse } from './response.type';
import { map } from 'rxjs';



const apiURL = 'https://dog.ceo/api';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  #http = inject(HttpClient);

  list_breeds() {
    return this.#http.get<ListBreedsResponse>(`${apiURL}/breeds/list/all`)
    .pipe(map(response=> response.message))
  }

  list_sub_breeds(breed: string) {
    return this.#http.get<SubBreedResponse>(`${apiURL}/breed/${breed}/list`)
    .pipe(map(res => res.message))
  }

  get_breed_image(breed: string, n: number = 1) {
    return this.#http
      .get<BreedImageResponse>(`${apiURL}/breed/${breed}/images/random/${n}`)
      .pipe(map((res) => res.message));
  }

  get_sub_breed_image(breed: string, sub_breed: string, n: number = 1) {
    return this.#http
      .get<SubBreedImageResponse>(
        `${apiURL}/breed/${breed}/${sub_breed}/images/random/${n}`
      )
      .pipe(map((res) => res.message));
  }
}
