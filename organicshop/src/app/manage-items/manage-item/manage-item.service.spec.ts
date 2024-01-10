import { TestBed } from '@angular/core/testing';

import { ManageItemService } from './manage-item.service';

describe('ManageItemService', () => {
  let service: ManageItemService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ManageItemService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
