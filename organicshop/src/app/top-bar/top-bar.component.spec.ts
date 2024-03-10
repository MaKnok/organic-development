import { ComponentFixture, TestBed, fakeAsync, tick, waitForAsync } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';
import { TopBarComponent } from './top-bar.component';
import { UserService } from '../login/auth/user/user.service';
import { TokenService } from '../login/auth/token.service';
import { RouterTestingModule } from '@angular/router/testing';
import { Router } from '@angular/router';
import { of } from 'rxjs';
import { HomeComponent } from '../home/home.component';
import { mockAuthGuardFactory } from '../login/mock-auth.guard';
import { PageReloadService } from '../login/auth/logout.service';

describe('TopBarComponent', () => {
  let component: TopBarComponent;
  let fixture: ComponentFixture<TopBarComponent>;
  let userService: jasmine.SpyObj<UserService>;
  let tokenService: jasmine.SpyObj<TokenService>;
  let router: Router;

  beforeEach(async () => {
    
    userService = jasmine.createSpyObj('UserService', ['returnUserData','logout']);
    tokenService = jasmine.createSpyObj('TokenService', ['returnsToken']);

    const pageReloadServiceStub = {
      reloadPage: () => {} 
    };

    await TestBed.configureTestingModule({
      declarations: [ TopBarComponent ],
      imports: [ HttpClientModule, RouterTestingModule.withRoutes([{ path: 'home', component: HomeComponent, canActivate: ['CanActivate']  }]) ],
      providers: [
        { provide: UserService, useValue: userService },
        { provide: TokenService, useValue: tokenService },
        { provide: 'CanActivate', useFactory: mockAuthGuardFactory},
        { provide: PageReloadService, useValue: pageReloadServiceStub }
      ],
    })
    .compileComponents();

    fixture = TestBed.createComponent(TopBarComponent);
    component = fixture.componentInstance;
    router = TestBed.inject(Router); 
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display username when user is logged in', async () => {

    const mockUser = [{ 
      userBirthday:"1999-01-04T03:00:00.000Z",
      userEmail:"teste@organicshop.com",
      userFullName:"Teste Full Name",
      userName:"testUser",
      userRole:"Test Role",
      userSegment:"Teste",
      __v: 0,
      _id: "11111111111111"

    }];

    component.user$ = of(mockUser);
    component.user$.subscribe(user => console.log('Mock user:', user));

    await router.navigateByUrl('/home');

    console.log('Current URL', component.router.url);

    fixture.detectChanges();

    expect(router.url).toBe('/home'); // Check if router URL is set correctly
  
    // Wait for the DOM to update
    await fixture.whenStable();

    const compiled = fixture.nativeElement;
    const usernameElement = compiled.querySelector('.mr-2');
    console.log('template', fixture.nativeElement);
  
    if (usernameElement) {
      expect(usernameElement).toBeTruthy();
      expect(usernameElement.textContent).toContain(mockUser[0].userName);
    } else {
      fail('Username element with class .mr-2 not found');
    }

  });

  it(`${TopBarComponent.prototype.logout.name} should handle successful logout`, waitForAsync(() => {
    // Mock returnsToken to return a mock token
    const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c';
    tokenService.returnsToken.and.returnValue(token);

    // Mock userService.logout to return a mock Observable
    const mockResponse = { status: 'Logout successful' }; // Mock response object
    userService.logout.and.returnValue(of(mockResponse)); // Replace null with your mock response

    // Spy on router.navigate method
    const navigateSpy = spyOn(router, 'navigate');

    // Call logout method
    component.logout();

    // Expectations
    fixture.whenStable().then(() => {
      // Expectations
      expect(tokenService.returnsToken).toHaveBeenCalled();
      expect(userService.logout).toHaveBeenCalledWith(token);
      expect(navigateSpy).toHaveBeenCalledWith(['/']);
    });
  }))
});
