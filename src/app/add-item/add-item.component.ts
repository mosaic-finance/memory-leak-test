import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { MfcToaster } from '@mosaic-finance/angular-core';
import { InventoryService } from '../inventory.service';

@Component({
  selector: 'app-add-item',
  templateUrl: './add-item.component.html',
  styleUrls: ['./add-item.component.scss']
})
export class AddItemComponent implements OnInit, AfterViewInit, OnDestroy {
  public form: FormGroup;

  private active: boolean;

  constructor(
    private toaster: MfcToaster,
    private service: InventoryService,
    private router: Router,
  ) {
    this.form = new FormGroup({
      name: new FormControl(),
      cost: new FormControl(),
    });
  }

  public ngOnInit(): void {
    setInterval(() => {
      if (!this.active && document.querySelector('#add-item-form')) {
        this.toaster.warn('Are you still there?', 'Checkup');
      }
      this.active = false;
    }, 10000);
  }

  public ngAfterViewInit(): void {
    document.addEventListener('mousedown', this.interacted.bind(this));
    document.addEventListener('keydown', this.interacted.bind(this));
  }

  public ngOnDestroy(): void {
      this.active = false;
  }

  public addItem(): void {
    this.service.addItem(this.form.getRawValue());
    this.router.navigate(['']);
  }

  private interacted() {
    this.active = true;
  }
}
