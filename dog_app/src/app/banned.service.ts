import { Injectable, WritableSignal, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class BannedService {

  banned_breeds_signal: WritableSignal<string[]> = signal([]);
  constructor(){

    const persisted_banned_breed = localStorage.getItem('banned');
    if (persisted_banned_breed) {
      this.banned_breeds_signal.set(JSON.parse(persisted_banned_breed));
    }
  }

  ban(breed: string){
    this.banned_breeds_signal.update(prev => {
      return [...prev, breed];
    })
    localStorage.setItem('banned', JSON.stringify(this.banned_breeds_signal()))
  }
  unban(breed: string){
    this.banned_breeds_signal.update(prev => {
      return prev.filter(banned_breed =>banned_breed !== breed);
    })
    localStorage.setItem('banned', JSON.stringify(this.banned_breeds_signal()))
  }

  isBanned(breed: string) {
    return this.banned_breeds_signal().includes(breed)
  }

}
