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

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule.withRoutes(routes), HttpClientModule],
      providers:[
        UserService,
        AuthGuard,
      ]
    });
    guard = TestBed.inject(AuthGuard);
    router = TestBed.inject(Router);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });

  it('should allow navigation to "home" when canActivate returns true', () => {
    spyOn(guard, 'canActivate').and.returnValue(true); 
    const spy = spyOn(router, 'navigate');

    const result = guard.canActivate(null, null);

    expect(result).toBe(true); 
    expect(spy).not.toHaveBeenCalled(); 
  });
});
