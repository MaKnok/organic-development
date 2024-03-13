import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { ManageItemsService } from './manage-items.service';
import { HttpClientModule } from '@angular/common/http';
import { ManageItemsComponent } from './manage-items.component';
import { ActivatedRoute, Router } from '@angular/router';
import { ManageItemsRoutingModule } from './manage-items-routing.module';
import { mockAuthGuardFactory } from '../login/mock-auth.guard';
import { RouterTestingModule } from '@angular/router/testing';
import { By } from '@angular/platform-browser';
import { Component } from '@angular/core';
import { HomeComponent } from '../home/home.component';
import { AddUpdateItemService } from './add-update-item/add-update-item.service';

@Component({
  selector: 'router-outlet',
  template: ''
})
class RouterOutletStubComponent {}


describe('ManageItemsComponent', () => {
  let component: ManageItemsComponent;
  let fixture: ComponentFixture<ManageItemsComponent>;
  let router: Router;
  let manageItemsService: ManageItemsService;
  let addUpdateItemService: AddUpdateItemService;

  beforeEach(waitForAsync(() => {

    TestBed.configureTestingModule({
      declarations: [ ManageItemsComponent, RouterOutletStubComponent,  ],
      providers: [ 
        ManageItemsService,
        AddUpdateItemService,
        { provide: ActivatedRoute, useValue: { /* mock values */ }},
        { provide: 'CanActivate', useFactory: mockAuthGuardFactory}
       ], // Add your service if applicable
      imports: [ HttpClientModule, 
                 ManageItemsRoutingModule,
                 RouterTestingModule.withRoutes([{ path: 'home', component: HomeComponent, canActivate: ['CanActivate'] }]),
                 ],
    })
    .compileComponents();

    router = TestBed.inject(Router);
    manageItemsService = TestBed.inject(ManageItemsService);
    addUpdateItemService = TestBed.inject(AddUpdateItemService);

    fixture = TestBed.createComponent(ManageItemsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should check if go back button redirects user to home', () => {
    const navigateSpy = spyOn(router, 'navigateByUrl').and.stub();
    spyOnProperty(router, 'url', 'get').and.returnValue('/manage-item;id=cat-food');
    
    fixture.detectChanges();
  
    const button = fixture.debugElement.query(By.css('button[routerLink="/home"]'));
  
    if (button) {
      button.nativeElement.click();
  
      expect(navigateSpy).toHaveBeenCalledTimes(1); // Ensure navigateByUrl is called exactly once
      expect(navigateSpy).toHaveBeenCalledWith(jasmine.stringMatching('/home'), jasmine.anything());
    } else {
      fail('button not found');
    }
  })

  it(`${ManageItemsComponent.prototype.gotoCategory.name} navigate to "/manage-item" with category id and set services correctly`, 
    () => {
      
      const category = { catId: 'cat-food', categoryName: 'Alimentação'};
      spyOn(router, 'navigate').and.stub();

      const manageItemChosenCatSpy = spyOn(manageItemsService, 'setChosenCategory');
      const addUpdateItemServiceCatIdSpy = spyOn(addUpdateItemService, 'setCatId');
      const addUpdateItemServiceCatLabelSpy = spyOn(addUpdateItemService, 'setCatLabel');

      component.gotoCategory(category);

      expect(router.navigate).toHaveBeenCalledWith(['/manage-item', { id: category.catId }]);
      expect (manageItemChosenCatSpy).toHaveBeenCalledWith(component.categoryId);
      expect(addUpdateItemServiceCatIdSpy).toHaveBeenCalledWith(component.categoryId);
      expect(addUpdateItemServiceCatLabelSpy).toHaveBeenCalledWith(category.categoryName);

    }
  );
});
