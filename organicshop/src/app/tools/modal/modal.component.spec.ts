import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';
import { ModalComponent } from './modal.component';
import { AddUpdateItemService } from 'src/app/manage-items/add-update-item/add-update-item.service';
import { Router } from '@angular/router';
import { of } from 'rxjs';
import { InventoryItem } from 'src/app/models/inventory-item.model';

describe('ModalComponent', () => {
  let component: ModalComponent;
  let fixture: ComponentFixture<ModalComponent>;
  let addUpdateItemService: jasmine.SpyObj<AddUpdateItemService>;
  let router: jasmine.SpyObj<Router>;

  beforeEach(async () => {

    const addUpdateItemServiceSpy = jasmine.createSpyObj('AddUpdateItemService', ['setCatId', 'deleteItem']);
    const routerSpy = jasmine.createSpyObj('Router', ['navigate']);

    await TestBed.configureTestingModule({
      imports: [ HttpClientModule ],
      declarations: [ ModalComponent ],
      providers:[
        { provide: AddUpdateItemService, useValue: addUpdateItemServiceSpy },
        { provide: Router, useValue: routerSpy }
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModalComponent);
    addUpdateItemService = TestBed.inject(AddUpdateItemService) as jasmine.SpyObj<AddUpdateItemService>;
    router = TestBed.inject(Router) as jasmine.SpyObj<Router>;

    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it(`${ModalComponent.prototype.yesAnswer.name} should call addUpdateItemService.deleteItem and close modal when icon is DELETE_ICON`, () => {

    const date = new Date('01-01-2023');
    const mockItem =  {
      _id: '11111',
      itemPrice: 7.50,
      itemName: 'Beterraba',
      itemType: 'Kg',
      date: date,
    };

    const item: InventoryItem = mockItem;

    component.item = item;
    component.icon = component.DELETE_ICON;
    component.catId = 'cat-food';

    addUpdateItemService.deleteItem.and.returnValue(of(mockItem));

    component.yesAnswer();

    expect(addUpdateItemService.setCatId).toHaveBeenCalledWith('cat-food');
    expect(addUpdateItemService.deleteItem).toHaveBeenCalledWith(item);
    expect(component.statusModal).toBe(false);
  });

  it(`${ModalComponent.prototype.yesAnswer.name} should navigate and close modal when icon is CHECK_ICON`, () => {
    component.icon = component.CHECK_ICON;

    component.yesAnswer();

    expect(router.navigate).toHaveBeenCalledWith(['']);
    expect(component.statusModal).toBe(false);
  });

  it(`${ModalComponent.prototype.closeModal.name} should close modal and emit changedModal event`, () => {
    spyOn(component.changedModal, 'emit');

    component.closeModal();

    expect(component.statusModal).toBe(false);
    expect(component.changedModal.emit).toHaveBeenCalledWith(false);
  });

});
