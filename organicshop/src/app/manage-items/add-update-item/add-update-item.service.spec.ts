import { TestBed, inject } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { AddUpdateItemService } from './add-update-item.service';
import { RouterTestingModule } from '@angular/router/testing';
import { InventoryItem } from '../../models/inventory-item.model';
import { catchError, of, throwError } from 'rxjs';

describe('AddUpdateItemService', () => {
  let service: AddUpdateItemService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule, HttpClientTestingModule, RouterTestingModule],
      providers: [AddUpdateItemService]
      });
    service = TestBed.inject(AddUpdateItemService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it(`${AddUpdateItemService.prototype.getSelectedItem.name} should return selected item`, () => {

    const date = new Date('01-01-2023');
    const mockItem =  {
      _id: '11111',
      itemPrice: 7.50,
      itemName: 'Beterraba',
      itemType: 'Kg',
      date: date,
    };

    service.setSelectedItem(mockItem);
    expect(service.getSelectedItem()).toEqual(mockItem);
  });

  it(`${AddUpdateItemService.prototype.getCatLabel.name} should return category label`, () => {
    const mockLabel = 'Test Label';
    service.setCatLabel(mockLabel);
    expect(service.getCatLabel()).toEqual(mockLabel);
  });

  it(`${AddUpdateItemService.prototype.getAction.name} should return action`, () => {
    const mockAction = 'add-item';
    service.setAction(mockAction);
    expect(service.getAction()).toEqual(mockAction);
  });

  it(`${AddUpdateItemService.prototype.getCatId.name} should return category ID`, () => {
    const mockCatId = 'cat-food';
    service.setCatId(mockCatId);
    expect(service.getCatId()).toEqual(mockCatId);
  });

  it(`${AddUpdateItemService.prototype.getCatId.name} should return inventory items array`, () => {
    expect(service.inventoryItems).toEqual([]);
  });

  it(`${AddUpdateItemService.prototype.allItems.name} should return items for a given category ID`, (done: DoneFn) => {
    const mockCategoryId = 'cat-food';
    const date = new Date('01-01-2023');
    const mockItems: InventoryItem[] = [
      {
        _id: '11111',
        itemPrice: 7.50,
        itemName: 'Beterraba',
        itemType: 'Kg',
        date: date,
      },
      {
        _id: '22222',
        itemPrice: 9.50,
        itemName: 'Abacate',
        itemType: 'Kg',
        date: date,
      }
    ];
    

    service.allItems(mockCategoryId).subscribe(items => {
      expect(items).toEqual(mockItems);
      done();
    });

    const req = httpTestingController.expectOne(req => req.url.includes(`/inventoryItems`)); 
    expect(req.request.method).toEqual('GET');
    req.flush([{ [mockCategoryId]: mockItems }]);

  });


});
