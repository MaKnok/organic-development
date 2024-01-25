import { TestBed } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';
import { AddUpdateItemService } from './add-update-item.service';

describe('AddUpdateItemService', () => {
  let service: AddUpdateItemService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule],
      });
    service = TestBed.inject(AddUpdateItemService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
