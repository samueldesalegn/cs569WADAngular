import { Injectable, WritableSignal, signal } from '@angular/core';

export type Parent = {
  name: string,
  income: number,
  children: Child[]
}

export type Child = {
  name: string,
  hobbies: string[],
  allowance: number
}

@Injectable({
  providedIn: 'root'
})
export class DataService {
  isManager_signal = signal(true)
  data_signal: WritableSignal<Parent[]> = signal([]);

  constructor(){
    this.data_signal.update(prev =>[
      {
        name: 'George', income: 100_000, children:[
          { name: 'Asaad', hobbies:['playing', 'bowling'], allowance: 1000 },
          { name: 'Mike', hobbies:['running', 'hiking'], allowance: 2000 },
        ]
      },
      {
        name: 'John', income: 200_000, children:[
          { name: 'Anne', hobbies:['Soccer', 'cooking'], allowance: 2000 },
          { name: 'Lola', hobbies:['running', 'singing'], allowance: 1000 },
        ]
      }
    ])
  }
  getChildren(parentName: string){
    const parent = this.data_signal().find((parent) => parent.name === parentName);
    return parent? parent.children: [];     
    
  }

  get_parent_details(parent_name: string){
    const parent = this.data_signal().find((parent) => parent.name === parent_name);
    return parent ? {name: parent.name, income: parent.income} : {}; 
  }

  save_parent_details(parent_details: {name: string, income: number}){
    const parent = this.data_signal().find(
      (parent) => parent.name === parent_details.name
    );
    if (parent) {
      const data_without_parent = this.data_signal().filter(parent => parent.name !== parent_details.name);
      this.data_signal.set([...data_without_parent, parent])
    }
  }
  
}
  
  

