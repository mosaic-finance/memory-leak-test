import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { InventoryService } from '../inventory.service';

@Component({
  selector: 'app-catalog',
  templateUrl: './catalog.component.html',
  styleUrls: ['./catalog.component.scss']
})
export class CatalogComponent implements OnInit {

  public items$: Observable<any>;

  constructor(
    private service: InventoryService
  ) { }

  ngOnInit(): void {
    this.items$ = this.service.getInventory();
  }
}
