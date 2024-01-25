import { TestBed } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';
import { ManageItemService } from './manage-item.service';

describe('ManageItemService', () => {
  let service: ManageItemService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule],
    });
    service = TestBed.inject(ManageItemService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
