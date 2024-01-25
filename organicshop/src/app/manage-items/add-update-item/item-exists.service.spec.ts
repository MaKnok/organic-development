import { TestBed } from '@angular/core/testing';
import { AddUpdateItemService } from './add-update-item.service';
import { HttpClientModule } from '@angular/common/http';

import { ItemExistsService } from './item-exists.service';

describe('ItemExistsService', () => {
  let service: ItemExistsService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule],
      providers: [
        AddUpdateItemService,  
      ],
    });
    service = TestBed.inject(ItemExistsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
