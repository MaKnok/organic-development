import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeComponent } from './home.component';
import { Router } from '@angular/router';
import { Component } from '@angular/core';
import { HomeRoutingModule } from './home-routing.module';
import { mockAuthGuardFactory } from '../login/mock-auth.guard';
import { RouterTestingModule } from '@angular/router/testing';
import { By } from '@angular/platform-browser';
import { SalesComponent } from '../sales/sales.component';
import { ManageItemsComponent } from '../manage-items/manage-items.component';

// Define stub components directly within the test file
@Component({
  selector: 'router-outlet',
  template: ''
})
class RouterOutletStubComponent {}


describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;
  let router: Router;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HomeComponent,
                      RouterOutletStubComponent, 
                    ],
      providers:[{ provide: 'CanActivate', useFactory: mockAuthGuardFactory}],
      imports:[HomeRoutingModule,
               RouterTestingModule.withRoutes([{ path: 'sales', component: SalesComponent, canActivate: ['CanActivate'] },
                                               { path: 'manage-items', component: ManageItemsComponent, canActivate: ['CanActivate'] }])]
    })
    .compileComponents();

    router = TestBed.inject(Router);

    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should check if manage items buttons redirects to its respective page', () => {
    const navigateSpy = spyOn(router, 'navigateByUrl').and.stub();
    
    fixture.detectChanges();
  
    const button = fixture.debugElement.query(By.css('button'));
  
    if (button) {
      button.nativeElement.click();
  
      expect(navigateSpy).toHaveBeenCalledTimes(1); // Ensure navigateByUrl is called exactly once
      expect(navigateSpy).toHaveBeenCalledWith(jasmine.stringMatching('/manage-items'), jasmine.anything());
    } else {
      fail('buttons not found');
    }
  })

  it('should check if manage items button redirects to its respective page', () => {
    const navigateSpy = spyOn(router, 'navigateByUrl').and.stub();
    
    fixture.detectChanges();
  
    const button = fixture.debugElement.query(By.css('button[routerLink="/manage-items"]'));
  
    if (button) {
      button.nativeElement.click();
  
      expect(navigateSpy).toHaveBeenCalledTimes(1); // Ensure navigateByUrl is called exactly once
      expect(navigateSpy).toHaveBeenCalledWith(jasmine.stringMatching('/manage-items'), jasmine.anything());
    } else {
      fail('button not found');
    }
  })

  it('should check if sales button redirects to its respective page', () => {
    const navigateSpy = spyOn(router, 'navigateByUrl').and.stub();
    
    fixture.detectChanges();
  
    const button = fixture.debugElement.query(By.css('button[routerLink="/sales"]'));
  
    if (button) {
      button.nativeElement.click();
  
      expect(navigateSpy).toHaveBeenCalledTimes(1); // Ensure navigateByUrl is called exactly once
      expect(navigateSpy).toHaveBeenCalledWith(jasmine.stringMatching('/sales'), jasmine.anything());
    } else {
      fail('button not found');
    }
  })
});
