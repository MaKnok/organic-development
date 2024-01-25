import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AddUpdateItemService } from 'src/app/manage-items/add-update-item/add-update-item.service';
import { AddUpdateItemComponent } from './add-update-item.component';
import { HttpClientModule } from '@angular/common/http';

describe('AddUpdateItemComponent', () => {
  let component: AddUpdateItemComponent;
  let fixture: ComponentFixture<AddUpdateItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddUpdateItemComponent ],
      providers: [ AddUpdateItemService ], 
      imports: [ HttpClientModule ],
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddUpdateItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
