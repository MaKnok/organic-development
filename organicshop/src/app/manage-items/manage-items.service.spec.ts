import { TestBed } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';
import { ManageItemsService } from './manage-items.service';

describe('ManageItemsService', () => {
  let service: ManageItemsService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ HttpClientModule ],
    });
    service = TestBed.inject(ManageItemsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
