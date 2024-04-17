import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { AddUpdateItemService } from 'src/app/manage-items/add-update-item/add-update-item.service';
import { AddUpdateItemComponent } from './add-update-item.component';
import { ActivatedRoute } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators, FormControl  } from '@angular/forms';
import { ItemExistsService } from './item-exists.service';
import { ManageItemsService } from '../manage-items.service';
import { Router } from '@angular/router';
import { of } from 'rxjs';

describe('AddUpdateItemComponent', () => {
  let component: AddUpdateItemComponent;
  let fixture: ComponentFixture<AddUpdateItemComponent>;
  let formBuilder: FormBuilder;
  let addUpdateItemService: AddUpdateItemService;
  let router: Router;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddUpdateItemComponent ],
      providers: [ 
        AddUpdateItemService, 
        ItemExistsService, 
        ManageItemsService,
        { provide: ActivatedRoute, useValue: { snapshot: { paramMap: { get: (key: string) => 'cat-food' } } } }], 
      imports: [ HttpClientModule,ReactiveFormsModule ],
    })
    .compileComponents();

    addUpdateItemService = TestBed.inject(AddUpdateItemService);
  
    fixture = TestBed.createComponent(AddUpdateItemComponent);
    component = fixture.componentInstance;

    formBuilder = TestBed.inject(FormBuilder);
    router = TestBed.inject(Router);

    // Create a FormGroup instance for newItemForm
    component.newItemForm = formBuilder.group({
      itemName: ['Test Item', [Validators.required]],
      itemPrice: [10, [Validators.required]],
      itemType: ['un', [Validators.required]],
    });

    fixture.detectChanges();
    
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  //defineForm
  it('should define form for ADD_ITEM action', () => {
    // Arrange
    const mockAction = 'ADD_ITEM';
    const getActionSpy = spyOn(addUpdateItemService, 'getAction');

    getActionSpy.and.returnValue(mockAction);
    
    // Act
    component['defineForm']();

    // Assert
    expect(component.newItemForm).toBeDefined();
  });

  it('should define form for UPDATE_ITEM action', () => {
    // Arrange
    const mockAction = 'UPDATE_ITEM';
    const getActionSpy = spyOn(addUpdateItemService, 'getAction');

    getActionSpy.and.returnValue(mockAction);
    
    // Act
    component['defineForm']();

    // Assert
    expect(component.newItemForm).toBeDefined();
  });

  //configureSection
  it('should set action to ADD_ITEM_TITLE when action is ADD_ITEM', () => {
    // Arrange
    const mockAction = 'ADD_ITEM';
    const getActionSpy = spyOn(addUpdateItemService, 'getAction');
    getActionSpy.and.returnValue(addUpdateItemService.ADD_ITEM);
    
    // Act
    component['configureSection']();

    // Assert
    expect(component.action).toEqual(component.ADD_ITEM_TITLE);
  });

  it('should set action to UPDATE_ITEM_TITLE when action is UPDATE_ITEM', () => {
    // Arrange
    const mockAction = 'UPDATE_ITEM';
    const getActionSpy = spyOn(addUpdateItemService, 'getAction');
    const getSelectedItemSpy = spyOn(addUpdateItemService, 'getSelectedItem');

    const date = new Date('01-01-2023');
    const mockItem = {
      _id: '11111',
      itemPrice: 9.00,
      itemName: 'Uva Itália Cx',
      itemType: 'un',
      date: date,
    };

    getActionSpy.and.returnValue(addUpdateItemService.UPDATE_ITEM);
    getSelectedItemSpy.and.returnValue(mockItem); 
    
    // Act
    component['configureSection']();

    // Assert
    expect(component.action).toEqual(component.UPDATE_ITEM_TITLE);
    expect(component.newItemForm.get('itemType').value).toEqual('un');
  });

   //setUpdateRadioValues
  it('should set itemType to "un" in newItemForm when selectedItem itemType is "un"', () => {
    // Arrange
    const date = new Date('01-01-2023');
    const mockItem = {
      _id: '11111',
      itemPrice: 9.00,
      itemName: 'Uva Itália Cx',
      itemType: 'un',
      date: date,
    };
    spyOn(component['addUpdateItemService'], 'getSelectedItem').and.returnValue(mockItem);
    
    // Act
    component['setUpdateRadioValues']();
  
    // Assert
    expect(component.newItemForm.get('itemType').value).toEqual('un');
  });
  
  it('should set itemType to "kg" in newItemForm when selectedItem itemType is "kg"', () => {
    // Arrange
    const date = new Date('01-01-2023');
    const mockItem = {
      _id: '11111',
      itemPrice: 8.98,
      itemName: 'Pêssego Amarelo',
      itemType: 'kg',
      date: date,
    };
    spyOn(component['addUpdateItemService'], 'getSelectedItem').and.returnValue(mockItem);
    
    // Act
    component['setUpdateRadioValues']();
  
    // Assert
    expect(component.newItemForm.get('itemType').value).toEqual('kg');
  });

  //hydratePriceItem
  it('should hydrate item price correctly', () => {
    // Arrange
    const newItemValue = {
      itemName: 'Test Item',
      itemPrice: '',
      itemType: 'un' // assuming itemType is required in newItemForm
    };
    const mockItemPriceValue = '10,00'; // Mock itemPrice value
    component.newItemForm.setValue(newItemValue); // Set newItemForm value
    component.itemPrice = { nativeElement: { value: mockItemPriceValue } }; // Mock itemPrice
    
    // Act
    const hydratedItem = component['hydratePriceItem']();
  
    // Assert
    expect(hydratedItem.itemPrice).toEqual(10.00); // Adjust the expected value according to your test case
  });
  

  it(`${AddUpdateItemComponent.prototype.addUpdateItem.name} should add item when newItemForm is valid and action is ADD_ITEM`, fakeAsync(
    () => {

      // Arrange
      const mockAction = 'add-item';
      const mockCatId = 'cat-food';

      // Create a spy object for the AddUpdateItemService
      const addUpdateItemServiceSpy = jasmine.createSpyObj('AddUpdateItemService', ['addItem', 'getAction', 'getCatId']);

      const mockItemPriceValue = '10,00'; // Mock itemPrice value
      component.itemPrice = { nativeElement: { value: mockItemPriceValue } }; // Mock itemPrice
  
      // Set up the getAction and getCatId method spies to return the mock values
      addUpdateItemServiceSpy.getAction.and.returnValue(mockAction);
      addUpdateItemServiceSpy.ADD_ITEM = mockAction;
      const hydratePriceItemSpy = spyOn(component, 'hydratePriceItem').and.callThrough();
      addUpdateItemServiceSpy.getCatId.and.returnValue(mockCatId);
      const navigateSpy = spyOn(router, 'navigate');

      // Set up the addItem method spy to return an observable that completes immediately
      addUpdateItemServiceSpy.addItem.and.returnValue(of(null));

      // Replace the original service with the spy
      component['addUpdateItemService'] = addUpdateItemServiceSpy;

      // Act
      component.addUpdateItem();
      tick();

      // Assert
      expect(component.newItemForm.valid).toBeTrue();
      expect(addUpdateItemServiceSpy.getAction).toHaveBeenCalled();
      expect(hydratePriceItemSpy).toHaveBeenCalled();
      expect(navigateSpy).toHaveBeenCalledWith(['/manage-item', { id: mockCatId }]);

  }
  ));

  it(`${AddUpdateItemComponent.prototype.addUpdateItem.name} should update item when newItemForm is valid and action is UPDATE_ITEM`, fakeAsync(
    () => {

      // Arrange
      const mockAction = 'update-item';
      const mockCatId = 'cat-food';
      const mockItemId = '123';
      const hydratedItem = {
        itemName: 'Test Item',
        itemPrice: 10.00,
        itemType: 'un' // assuming itemType is required in newItemForm
      };;

      // Create a spy object for the AddUpdateItemService
      const addUpdateItemServiceSpy = jasmine.createSpyObj('AddUpdateItemService', ['updateItem', 'getAction', 'getCatId', 'getSelectedItem']);
  
      // Set up the getAction and getCatId method spies to return the mock values
      addUpdateItemServiceSpy.getAction.and.returnValue(mockAction);
      addUpdateItemServiceSpy.UPDATE_ITEM = mockAction;
      const hydratePriceItemSpy = spyOn(component, 'hydratePriceItem').and.returnValue(hydratedItem);

      const itemIdSpy = addUpdateItemServiceSpy.getSelectedItem.and.returnValue({_id: mockItemId});
      addUpdateItemServiceSpy.getCatId.and.returnValue(mockCatId);
      const navigateSpy = spyOn(router, 'navigate');

      // Set up the updateItem method spy to return an observable that completes immediately
      const updateItemSpy = addUpdateItemServiceSpy.updateItem.and.returnValue(of(null));

      // Replace the original service with the spy
      component['addUpdateItemService'] = addUpdateItemServiceSpy;

      // Act
      component.addUpdateItem();
      tick();

      // Assert
      expect(component.newItemForm.valid).toBeTrue();
      expect(addUpdateItemServiceSpy.getAction).toHaveBeenCalled();
      expect(hydratePriceItemSpy).toHaveBeenCalled();
      expect(updateItemSpy).toHaveBeenCalledWith(mockItemId, hydratedItem);
      expect(navigateSpy).toHaveBeenCalledWith(['/manage-item', { id: mockCatId }]);

  }
  ));

  it(`${AddUpdateItemComponent.prototype.addUpdateItem.name} should dispatch an alert when the form is not valid`, 
      ()=>{

        const newItemValue = {
          itemName: '',
          itemPrice: '',
          itemType: ''
        };

        component.newItemForm.setValue(newItemValue);

        spyOn(window, 'alert');

        component.addUpdateItem();

        expect(component.newItemForm.valid).toBeFalse();
        expect(window.alert).toHaveBeenCalledWith('Invalid form');


      }
    )


});
