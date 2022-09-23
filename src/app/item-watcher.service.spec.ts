import { TestBed } from '@angular/core/testing';

import { ItemWatcherService } from './item-watcher.service';

describe('ItemWatcherService', () => {
  let service: ItemWatcherService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ItemWatcherService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
