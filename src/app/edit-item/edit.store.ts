import { Injectable } from '@angular/core';
import { ComponentStore } from '@ngrx/component-store';
import { InventoryService } from '../inventory.service';

interface EditStoreState {
  selectedItem: string;
  items: any[];
}

const defaultState: EditStoreState = {
  selectedItem: '',
  items: []
}

@Injectable()
export class EditStore extends ComponentStore<EditStoreState> {
  public selectedItem$ = this.select(state => state.items.find(i => i.name === state.selectedItem));

  private setItems = this.updater((state, items: any[]) => ({
    ...state,
    items
  }));

  public setSelectedItem = this.updater((state, selectedItem: string) => ({
    ...state,
    selectedItem
  }));

  constructor(
    private service: InventoryService
  ) {
    super(defaultState);
    this.service.getInventory().subscribe(this.setItems);
  }
}
