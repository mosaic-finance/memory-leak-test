import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class InventoryService {

  private inventory: BehaviorSubject<any[]> = new BehaviorSubject([] as any[]);

  constructor() {
    const cache = localStorage.getItem('inv');
    if (cache) {
      this.inventory.next(JSON.parse(cache));
    } else {
      this.inventory.next([{ name: 'Test', cost: 500 }]);
    }
  }

  public addItem(item: any): void {
    const newInv = [...this.inventory.getValue(), item];
    localStorage.setItem('inv', JSON.stringify(newInv));
    this.inventory.next(newInv);
  }

  public editItem(item: any): void {
    const newInv = this.inventory.getValue();
    const ind = newInv.findIndex(i => i.name === item.name);
    if (ind === -1) {
      return;
    }

    newInv[ind] = item;
    localStorage.setItem('inv', JSON.stringify(newInv));
    this.inventory.next(newInv);
  }

  public getInventory(): Observable<any[]> {
    return this.inventory;
  }
}
