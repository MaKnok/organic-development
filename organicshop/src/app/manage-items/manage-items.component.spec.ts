import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ManageItemsService } from './manage-items.service';
import { HttpClientModule } from '@angular/common/http';
import { ManageItemsComponent } from './manage-items.component';
import { ActivatedRoute } from '@angular/router';
import { ManageItemsRoutingModule } from './manage-items-routing.module';


describe('ManageItemsComponent', () => {
  let component: ManageItemsComponent;
  let fixture: ComponentFixture<ManageItemsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManageItemsComponent ],
      providers: [ ManageItemsService,
        { provide: ActivatedRoute, useValue: { /* mock values */ }}
       ], // Add your service if applicable
      imports: [ HttpClientModule, ManageItemsRoutingModule  ],
    })
    .compileComponents();

    fixture = TestBed.createComponent(ManageItemsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
