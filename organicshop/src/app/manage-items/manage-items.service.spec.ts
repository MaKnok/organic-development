import { TestBed } from '@angular/core/testing';

import { ManageItemsService } from './manage-items.service';

describe('ManageItemsService', () => {
  let service: ManageItemsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ManageItemsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
