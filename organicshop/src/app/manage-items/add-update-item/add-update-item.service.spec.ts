import { TestBed } from '@angular/core/testing';

import { AddUpdateItemService } from './add-update-item.service';

describe('AddUpdateItemService', () => {
  let service: AddUpdateItemService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AddUpdateItemService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
