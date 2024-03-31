import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AddUpdateItemService } from '../add-update-item/add-update-item.service';
import { HttpClientModule } from '@angular/common/http';
import { ManageItemComponent } from './manage-item.component';
import { ActivatedRoute } from '@angular/router';
import { of, throwError } from 'rxjs';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators, AsyncValidatorFn, ValidationErrors  } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { Router } from '@angular/router';
import { ModalService } from 'src/app/tools/modal/modal.service';

describe('ManageItemComponent', () => {
  let component: ManageItemComponent;
  let fixture: ComponentFixture<ManageItemComponent>;
  let addUpdateItemService: AddUpdateItemService;
  let modalService: ModalService;
  let formBuilder: FormBuilder;
  let router: Router;

  beforeEach(async () => {
    const activatedRouteStub = {
      snapshot: {
        paramMap: {
          get: jasmine.createSpy().and.returnValue('cat-food')
        }
      }
    };

    await TestBed.configureTestingModule({
      declarations: [ManageItemComponent],
      providers: [
        AddUpdateItemService,
        ModalService,
        FormBuilder,
        { provide: ActivatedRoute, useValue: activatedRouteStub }
      ],
      imports: [HttpClientModule,ReactiveFormsModule,RouterTestingModule],
    }).compileComponents();

    addUpdateItemService = TestBed.inject(AddUpdateItemService);
    modalService = TestBed.inject(ModalService);
    fixture = TestBed.createComponent(ManageItemComponent);
    component = fixture.componentInstance;
    router = TestBed.inject(Router);

    formBuilder = TestBed.inject(FormBuilder);

    component.searchItemForm= formBuilder.group({
      searchValue: [
        'Banana',
        [Validators.required],
      ],
    });

    fixture.detectChanges();
  });

  it('should create', () => {
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  it(`${ManageItemComponent.prototype.triggerProvideList.name} should set inventoryItems$ and selectedItem on successful subscription`, () => {

    const date = new Date('01-01-2023');

    const mockItems = [
                        {
                          _id: '11111',
                          itemPrice: 7.50,
                          itemName: 'Beterraba',
                          itemType: 'Kg',
                          date: date,
                        }, 
                        { 
                          _id: '22222',
                          itemPrice: 4.50,
                          itemName: 'Laranja',
                          itemType: 'Kg',
                          date: date,
                        }
                    ];

    const allItemsSpy = spyOn(addUpdateItemService, 'allItems');
    const setSelectedItemSpy = spyOn(addUpdateItemService, 'setSelectedItem');

    component.categoryId = 'cat-food';
    allItemsSpy.and.returnValue(of(mockItems));

    component.triggerProvideList();

    expect(allItemsSpy).toHaveBeenCalledWith(component.categoryId);
    expect(component.inventoryItems$).toEqual(mockItems);
    expect(component.selectedItem).toEqual(mockItems[0]);
    expect(setSelectedItemSpy).toHaveBeenCalledWith(mockItems[0]);
  });

  it(`${ManageItemComponent.prototype.triggerProvideList.name} should handle error during subscription`, () => {
    const mockError = 'Test error';
    const allItemsSpy = spyOn(addUpdateItemService, 'allItems');
    spyOn(console, 'log');
    allItemsSpy.and.returnValue(throwError(mockError));

    component.triggerProvideList();

    expect(allItemsSpy).toHaveBeenCalledWith(component.categoryId);
    expect(console.log).toHaveBeenCalledWith('There was an error in Add Update List! >>', mockError);
  });

  it(`${ManageItemComponent.prototype.searchItem.name} should bring items according to search results`, async () => {

    component.searchItemForm.controls['searchValue'].setAsyncValidators(null);

    component.searchItemForm.setValue({
      searchValue: 'Banana',
    }, 
    { emitEvent: false }
    );

    const date = new Date('01-01-2023');

    const response = [
      {
        _id: '33333',
        itemPrice: 4.50,
        itemName: 'Banana Nanica',
        itemType: 'Kg',
        date: date,
      }, 
      { 
        _id: '4444',
        itemPrice: 6.50,
        itemName: 'Banana Prata',
        itemType: 'Kg',
        date: date,
      }
    ];

    const searchItemsSpy = spyOn(addUpdateItemService, 'searchItems');
    const setSelectedItemSpy = spyOn(addUpdateItemService, 'setSelectedItem');

    searchItemsSpy.and.returnValue(of(response));

    component.searchItem();

    fixture.detectChanges();
    await fixture.whenStable();

    expect(searchItemsSpy).toHaveBeenCalledWith(jasmine.objectContaining({
      searchValue: 'Banana',
    }));

    expect(component.selectedItem).toEqual(response[0]);
    expect(setSelectedItemSpy).toHaveBeenCalledWith(response[0]);
    expect(component.inventoryItems$).toEqual(response);
    expect(!component.itemNotFound);
  });

  it(`${ManageItemComponent.prototype.searchItem.name} should handle error during subscription`, () => {

      component.searchItemForm.controls['searchValue'].setAsyncValidators(null);

      component.searchItemForm.setValue({
        searchValue: 'Beterraba',
      }, 
      { emitEvent: false }
      );

      const mockError = new Error('Mock error');
      const searchedItemsSpy = spyOn(addUpdateItemService, 'searchItems');
      spyOn(console, 'log');

      searchedItemsSpy.and.returnValue(throwError(mockError));

      component.searchItem();

      expect(searchedItemsSpy).toHaveBeenCalled();
      expect(component.itemNotFound).toBeTruthy();
      expect(console.log).toHaveBeenCalledWith('There was an error in the item search! >>', mockError);
  });

  it(`${ManageItemComponent.prototype.selectItem.name} should select item and store in the injectable variable`,() => {

    const date = new Date('01-01-2023');
    const mockItem =  {
      _id: '11111',
      itemPrice: 7.50,
      itemName: 'Beterraba',
      itemType: 'Kg',
      date: date,
    }

    const setSelectedItemSpy = spyOn(addUpdateItemService, 'setSelectedItem');

    component.selectItem(mockItem);

    expect(component.selectedItem).toEqual(mockItem);
    expect(setSelectedItemSpy).toHaveBeenCalledWith(mockItem);

  })

  it(`${ManageItemComponent.prototype.addItem.name} should navigate to add update page with chosen category and action`,() => {

    const categoryMock = 'cat-food';
    const navigateSpy = spyOn(router, 'navigateByUrl').and.stub();
    const setCatIdSpy = spyOn(addUpdateItemService, 'setCatId');
    const setActionSpy = spyOn(addUpdateItemService, 'setAction');

    component.addItem(categoryMock);

    expect(navigateSpy).toHaveBeenCalledTimes(1); // Ensure navigateByUrl is called exactly once
    expect(navigateSpy).toHaveBeenCalledWith(jasmine.stringMatching('/add-update-item'), jasmine.anything());
    expect(setCatIdSpy).toHaveBeenCalledWith(categoryMock);
    expect(setActionSpy).toHaveBeenCalledWith('add-item');

  })

  it(`${ManageItemComponent.prototype.editItem.name} should navigate to edit update page with chosen category and action`, () => {
    
    const categoryMock = 'cat-food';
    const date = new Date('01-01-2023');
    const mockItem =  {
      _id: '11111',
      itemPrice: 7.50,
      itemName: 'Beterraba',
      itemType: 'Kg',
      date: date,
    }

    const navigateSpy = spyOn(router, 'navigateByUrl').and.stub();
    const setCatIdSpy = spyOn(addUpdateItemService, 'setCatId');
    const setActionSpy = spyOn(addUpdateItemService, 'setAction');

    component.editItem(categoryMock,mockItem);

    expect(navigateSpy).toHaveBeenCalledTimes(1); // Ensure navigateByUrl is called exactly once
    expect(navigateSpy).toHaveBeenCalledWith(jasmine.stringMatching('/add-update-item'), jasmine.anything());
    expect(setCatIdSpy).toHaveBeenCalledWith(categoryMock);
    expect(setActionSpy).toHaveBeenCalledWith('update-item');

  })

  it(`${ManageItemComponent.prototype.deleteItem.name} should send item to delete function in the service`, () => {
    
    const categoryMock = 'cat-food';
    const date = new Date('01-01-2023');
    const mockItem =  {
      _id: '11111',
      itemPrice: 7.50,
      itemName: 'Beterraba',
      itemType: 'Kg',
      date: date,
    }

    const setCatIdSpy = spyOn(addUpdateItemService, 'setCatId');
    const deleteItemSpy = spyOn(addUpdateItemService, 'deleteItem');

    deleteItemSpy.and.returnValue(of(null));
    const alertSpy = spyOn(window, 'alert');

    component.deleteItem(categoryMock,mockItem);

    expect(setCatIdSpy).toHaveBeenCalledWith(categoryMock);
    expect(deleteItemSpy).toHaveBeenCalledWith(mockItem);
    expect(alertSpy).toHaveBeenCalledWith('Item deleted!');

  })

  it(`${ManageItemComponent.prototype.deleteItem.name} should handle error in case of something has gone wrong`, () => {
    
    const categoryMock = 'cat-food';
    const date = new Date('01-01-2023');
    const mockItem =  {
      _id: '11111',
      itemPrice: 7.50,
      itemName: 'Beterraba',
      itemType: 'Kg',
      date: date,
    }

    const mockError = new Error('Mock error');

    const setCatIdSpy = spyOn(addUpdateItemService, 'setCatId');
    const deleteItemSpy = spyOn(addUpdateItemService, 'deleteItem');

    deleteItemSpy.and.returnValue(throwError(mockError));
    spyOn(console, 'log');


    component.deleteItem(categoryMock,mockItem);

    expect(setCatIdSpy).toHaveBeenCalledWith(categoryMock);
    expect(deleteItemSpy).toHaveBeenCalledWith(mockItem);
    expect(console.log).toHaveBeenCalledWith(mockError);

  })

  it(`${ManageItemComponent.prototype.onModalChangeDeleteItem.name} should display Delete Item Icon and Message When Modal event is dispatched`, () => {
    
    const event = true;

    const date = new Date('01-01-2023');
    const mockItem =  {
      _id: '11111',
      itemPrice: 7.50,
      itemName: 'Beterraba',
      itemType: 'Kg',
      date: date,
    };

    component.selectedItem = mockItem;
  
    component.onModalChangeDeleteItem(event);
  
    expect(component.modalMessage).toBe(component.DELETE_ITEM_MESSAGE + mockItem.itemName + ' ?'); // Ensure modalMessage is set correctly
    expect(component.modalIcon).toBe(component.DELETE_ICON); 
    expect(modalService.openModal).toBeTrue();

  })

});
