import { ComponentFixture, TestBed, fakeAsync, tick} from '@angular/core/testing';
import { LoginComponent } from './login.component';
import { LoginService } from './login.service';
import { AuthService } from '../login/auth/auth.service';
import { UserService } from '../login/auth/user/user.service';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { LoginRoutingModule } from './login-routing.module';
import { of } from 'rxjs';
import { RouterTestingModule } from '@angular/router/testing';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { mockAuthGuardFactory } from './mock-auth.guard';
import { HomeComponent } from '../home/home.component';
import { By } from '@angular/platform-browser';


// Define stub components directly within the test file
@Component({
  selector: 'router-outlet',
  template: ''
})
class RouterOutletStubComponent {}

@Component({
  selector: 'router-link',
  template: '<a></a>'
})
class RouterLinkStubComponent {}


describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let loginService: jasmine.SpyObj<LoginService>;
  let authService: jasmine.SpyObj<AuthService>;
  let userService: jasmine.SpyObj<UserService>;
  let router: Router;

  beforeEach(async () => {

    const loginServiceSpy = jasmine.createSpyObj('LoginService', ['authenticate']);
    const authServiceSpy = jasmine.createSpyObj('AuthService', ['getLoggedInUser']);
    const userServiceSpy = jasmine.createSpyObj('UserService', ['saveToken', 'saveUserData', 'returnUserData']);

    await TestBed.configureTestingModule({
      declarations: [LoginComponent, RouterOutletStubComponent, RouterLinkStubComponent],
      providers: [LoginService,
          { provide: LoginService, useValue: loginServiceSpy },
          { provide: AuthService, useValue: authServiceSpy },
          { provide: UserService, useValue: userServiceSpy },
          { provide: 'CanActivate', useFactory: mockAuthGuardFactory}
        ],
      imports: [HttpClientModule, 
                FormsModule,
                LoginRoutingModule,
                RouterTestingModule.withRoutes([{ path: 'home', component: HomeComponent, canActivate: ['CanActivate'] }])
              ],
    })
    .compileComponents();

    loginService = TestBed.inject(LoginService) as jasmine.SpyObj<LoginService>;
    authService = TestBed.inject(AuthService) as jasmine.SpyObj<AuthService>;
    userService = TestBed.inject(UserService) as jasmine.SpyObj<UserService>;
    router = TestBed.inject(Router);

    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

  });


  it('should create', () => {
    expect(component).toBeTruthy();
  });

  
  /** Enter Login */
  it(`${LoginComponent.prototype.enterLogin.name} should handle successful login`, 
    fakeAsync(() => {

      const user = 'Test User Name';
      const password = '65e8ad9785213b1dfc4d8c1adb32e11d036b8b7a70c844732d…30089b0df8fb2961a5acb49d6WdBFt+KsgmW/hjbKG1UeqA==';
      const mockToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c';

      const userData = {
        user: 'Test User Name', 
        password: '65e8ad9785213b1dfc4d8c1adb32e11d036b8b7a70c844732d…30089b0df8fb2961a5acb49d6WdBFt+KsgmW/hjbKG1UeqA==', 
      };

      const mockUserData = { token: mockToken, data: userData }; // Mock user data object

      loginService.authenticate.and.returnValue(of(userData));
      authService.getLoggedInUser.and.returnValue(of(mockUserData));
  
      component.user = user;
      component.password = password;

      const navigateSpy = spyOn(router, 'navigate');

      component.enterLogin(); // Call the login function

      tick(1000);

      expect(loginService.authenticate).toHaveBeenCalledWith(user, password); // Ensure that authenticate was called with the correct arguments
      expect(userService.saveToken).toHaveBeenCalledWith(mockToken); 
      expect(navigateSpy).toHaveBeenCalledWith(['/home']); // Ensure that navigation occurred after successful login
  
    }));

  it('should clear inputs when reset button is clicked', () => {
      const userInputElement: HTMLInputElement = fixture.nativeElement.querySelector('#user');
      const passwordInputElement: HTMLInputElement = fixture.nativeElement.querySelector('#password');

      // Set input values
      userInputElement.value = 'testUser';
      passwordInputElement.value = 'test#123Password';

      // Simulate input event
      userInputElement.dispatchEvent(new Event('input'));
      passwordInputElement.dispatchEvent(new Event('input'));

       // Ensure input values are set
      expect(component.user).toEqual('testUser');
      expect(component.password).toEqual('test#123Password');

       // Find and click the reset button
      const resetButton: HTMLButtonElement = fixture.nativeElement.querySelector('button[type=reset]');
      resetButton.click();

      expect(component.user).toEqual(null);
      expect(component.password).toEqual(null);
    })
  
  it('should navigate to home page when the router link is clicked', () => {
      const navigateSpy = spyOn(router, 'navigateByUrl').and.stub();
    
      fixture.detectChanges();
    
      const newUserLink = fixture.debugElement.query(By.css('a'));
    
      if (newUserLink) {
        newUserLink.nativeElement.click();
    
        expect(navigateSpy).toHaveBeenCalledTimes(1); // Ensure navigateByUrl is called exactly once
        expect(navigateSpy).toHaveBeenCalledWith(jasmine.stringMatching('/new-user'), jasmine.anything());
      } else {
        fail('New user link not found');
      }
  });

  it('should keep form enter button disabled when form is not valid', () => {
        const userInputElement: HTMLInputElement = fixture.nativeElement.querySelector('#user');

        userInputElement.value = null; // Set an invalid value
    
        fixture.detectChanges();
    
        const submitButton = fixture.debugElement.query(By.css('button[type=submit]')).nativeElement;
        expect(submitButton.disabled).toBeTruthy();
  })

});
