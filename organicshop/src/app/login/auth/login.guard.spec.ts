import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { Router } from '@angular/router';
import { of } from 'rxjs';
import { LoginGuard } from './login.guard';
import { HttpClientModule } from '@angular/common/http';
import { UserService } from './user/user.service';

describe('LoginGuard', () => {
  let guard: LoginGuard;
  let userService: jasmine.SpyObj<UserService>;
  let router: Router;

  beforeEach(() => {

    const userServiceSpy = jasmine.createSpyObj('UserService', ['isLoggedIn']);

    TestBed.configureTestingModule({
      imports: [HttpClientModule],
      providers: [
        LoginGuard,
        { provide: UserService, useValue: userServiceSpy }
      ],
    });

    guard = TestBed.inject(LoginGuard);
    userService = TestBed.inject(UserService) as jasmine.SpyObj<UserService>;
    router = TestBed.inject(Router);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });

  it('should allow loading when user is not logged in', () => {
    userService.isLoggedIn.and.returnValue(false);
    const result = guard.canLoad(null, null);
    expect(result).toBeTrue();
  });

  it('should not allow loading when user is logged in and navigate to home', ()=>{
    userService.isLoggedIn.and.returnValue(true);
    const routerSpy = spyOn(router, 'navigate');
    const result = guard.canLoad(null, null);

    expect(routerSpy).toHaveBeenCalledWith(['home']);
    expect(result).toBe(false);

  })


});
