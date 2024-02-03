import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AddUpdateItemService } from 'src/app/manage-items/add-update-item/add-update-item.service';
import { AddUpdateItemComponent } from './add-update-item.component';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators  } from '@angular/forms';
import { ItemExistsService } from './item-exists.service';
import { ManageItemsService } from '../manage-items.service';
import { Router } from '@angular/router';

describe('AddUpdateItemComponent', () => {
  let component: AddUpdateItemComponent;
  let fixture: ComponentFixture<AddUpdateItemComponent>;
  let formBuilder: FormBuilder;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddUpdateItemComponent ],
      providers: [ AddUpdateItemService, ItemExistsService, ManageItemsService, Router], 
      imports: [ HttpClientModule,ReactiveFormsModule ],
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddUpdateItemComponent);
    component = fixture.componentInstance;

    formBuilder = TestBed.inject(FormBuilder);

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
});
