import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { routes } from 'src/app/app-routing.module';
import { HomeComponent } from '../../home/home.component';
import { AuthGuard } from './auth.guard';
import { HttpClientModule } from '@angular/common/http';
import { UserService } from './user/user.service';
import { Router } from '@angular/router';

describe('AuthGuard', () => {
  let guard: AuthGuard;
  let router: Router;
  let userService:  jasmine.SpyObj<UserService>;

  beforeEach(() => {

    const userServiceSpy = jasmine.createSpyObj('UserService', ['isLoggedIn']);

    TestBed.configureTestingModule({
      imports: [RouterTestingModule.withRoutes(routes), HttpClientModule],
      providers:[
        { provide: UserService, useValue: userServiceSpy },
        AuthGuard,
      ]
    });
    guard = TestBed.inject(AuthGuard);
    router = TestBed.inject(Router);
    userService = TestBed.inject(UserService) as jasmine.SpyObj<UserService>;
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });

  it('should not allow navigation to "login" when canActivate returns true', () => {
    userService.isLoggedIn.and.returnValue(true);
    const spy = spyOn(router, 'navigate');

    const result = guard.canActivate(null, null);

    expect(result).toBe(true); 
    expect(spy).not.toHaveBeenCalled(); 
  });

  it('should allow navigation to "login" when canActivate returns false', () => {
    userService.isLoggedIn.and.returnValue(false);
    const routerSpy = spyOn(router, 'navigate');
    const result = guard.canActivate(null, null);

    expect(routerSpy).toHaveBeenCalledWith(['']);
    expect(result).toBe(false);

  })
});
