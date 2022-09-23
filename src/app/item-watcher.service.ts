import { Injectable } from '@angular/core';
export type IEditWatcher = (udpate: any) => void;

@Injectable({
  providedIn: 'root'
})
export class ItemWatcherService {
  private editWatchers: Map<string, IEditWatcher[]> = new Map();

  constructor(
  ) {
    window.addEventListener('storage', event => {
      if (event.key !== 'inv') {
        return;
      }

      (JSON.parse(event.newValue ?? '[]') as any[]).forEach(i => {
        const watchers = this.editWatchers.get(i.name);
        if (watchers) {
          watchers.forEach(w => w(i));
        }
      });
    });
  }

  public watchItem(itemName: string, watcher: IEditWatcher): void {
    let existingWatchers = this.editWatchers.get(itemName);

    if (!existingWatchers) {
      existingWatchers = [];
    }

    existingWatchers.push(watcher);
    this.editWatchers.set(itemName, existingWatchers);
  }

  public unwatchItem(itemName: string, watcher: IEditWatcher): void {
    const existingWatchers = this.editWatchers.get(itemName);

    if (!existingWatchers) {
      return;
    }

    const index = existingWatchers.indexOf(watcher);

    if (index === -1) {
      return;
    }

    existingWatchers.splice(index, 1);
    this.editWatchers.set(itemName, existingWatchers);
  }
}
