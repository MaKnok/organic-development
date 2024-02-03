import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AddUpdateItemService } from '../add-update-item/add-update-item.service';
import { HttpClientModule } from '@angular/common/http';
import { ManageItemComponent } from './manage-item.component';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';
import { ReactiveFormsModule } from '@angular/forms';

describe('ManageItemComponent', () => {
  let component: ManageItemComponent;
  let fixture: ComponentFixture<ManageItemComponent>;

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

    fixture = TestBed.createComponent(ManageItemComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });
});