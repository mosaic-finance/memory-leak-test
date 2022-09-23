import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { SubSink } from 'subsink';
import { MfcToaster } from '@mosaic-finance/angular-core';
import { InventoryService } from '../inventory.service';
import { ItemWatcherService } from '../item-watcher.service';
import { EditStore } from './edit.store';

@Component({
  selector: 'app-edit-item',
  templateUrl: './edit-item.component.html',
  styleUrls: ['./edit-item.component.scss'],
  providers: [EditStore]
})
export class EditItemComponent implements OnInit {
  public form: FormGroup;

  private subs: SubSink = new SubSink();

  constructor(
    private service: InventoryService,
    private route: ActivatedRoute,
    private router: Router,
    private store: EditStore,
    private watcherService: ItemWatcherService,
    private toaster: MfcToaster,
  ) {
    this.form = new FormGroup({
      name: new FormControl(),
      cost: new FormControl(),
    });
  }

  public ngOnInit(): void {
    this.subs.sink = this.route.params.subscribe(p => {
      const itemName = p['itemId'];
      if (itemName) {
        this.store.setSelectedItem(itemName);
        this.watcherService.watchItem(itemName, this.handleItem.bind(this));
      }
    });

    this.subs.sink = this.store.selectedItem$.subscribe(i => {
      this.form.setValue({
        name: i.name,
        cost: i.cost
      });
    });
  }

  public editItem(): void {
    this.service.editItem(this.form.getRawValue());
    this.router.navigate(['']);
  }

  private handleItem(): void {
    this.toaster.warn('The item you are editing was just changed!', 'Concurrent Modification');
  }
}
