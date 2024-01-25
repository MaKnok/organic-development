import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AddUpdateItemService } from '../add-update-item/add-update-item.service';
import { HttpClientModule } from '@angular/common/http';
import { ManageItemComponent } from './manage-item.component';

describe('ManageItemComponent', () => {
  let component: ManageItemComponent;
  let fixture: ComponentFixture<ManageItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManageItemComponent ],
      providers: [AddUpdateItemService], // Add your service if applicable
      imports: [HttpClientModule],
    })
    .compileComponents();

    fixture = TestBed.createComponent(ManageItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
