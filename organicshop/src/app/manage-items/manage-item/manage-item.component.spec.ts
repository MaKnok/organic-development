import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AddUpdateItemService } from '../add-update-item/add-update-item.service';
import { HttpClientModule } from '@angular/common/http';
import { ManageItemComponent } from './manage-item.component';
import { ActivatedRoute } from '@angular/router';
import { of, throwError } from 'rxjs';
import { ReactiveFormsModule } from '@angular/forms';

describe('ManageItemComponent', () => {
  let component: ManageItemComponent;
  let fixture: ComponentFixture<ManageItemComponent>;
  let addUpdateItemService: AddUpdateItemService;

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
        { provide: ActivatedRoute, useValue: activatedRouteStub }
      ],
      imports: [HttpClientModule,ReactiveFormsModule],
    }).compileComponents();

    addUpdateItemService = TestBed.inject(AddUpdateItemService);

    fixture = TestBed.createComponent(ManageItemComponent);
    component = fixture.componentInstance;
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



});