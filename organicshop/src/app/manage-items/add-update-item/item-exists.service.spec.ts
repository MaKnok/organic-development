import { TestBed } from '@angular/core/testing';

import { ItemExistsService } from './item-exists.service';

describe('ItemExistsService', () => {
  let service: ItemExistsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ItemExistsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
