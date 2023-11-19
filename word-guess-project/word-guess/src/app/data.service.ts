import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  
  private readonly API_URL = 'http://localhost:3000/mock/check';

  private http = inject(HttpClient);

  checkWord(word: string) {
    return this.http.get<{
      success: boolean;
      data: {
        valid: boolean;
      };
    }>(`${this.API_URL}/${word}`);
  }
}
