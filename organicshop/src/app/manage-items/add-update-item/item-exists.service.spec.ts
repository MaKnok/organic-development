import { TestBed } from '@angular/core/testing';
import { AddUpdateItemService } from './add-update-item.service';
import { HttpClientModule } from '@angular/common/http';
import { AbstractControl, FormControl } from '@angular/forms';
import { of } from 'rxjs';
import { ItemExistsService } from './item-exists.service';

describe('ItemExistsService', () => {
  let service: ItemExistsService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule],
      providers: [
        ItemExistsService,  
        { provide: AddUpdateItemService, useValue: { verifyExistingItem: () => of([]) } }
      ],
    });
    service = TestBed.inject(ItemExistsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it(`${ItemExistsService.prototype.itemExists.name} should return a validator function`, () => {
    const validatorFn = service.itemExists();
    expect(typeof validatorFn).toBe('function');
  });

});
