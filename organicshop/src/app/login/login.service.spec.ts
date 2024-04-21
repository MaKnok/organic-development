import { TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { LoginService } from './login.service';
import { AuthService } from './auth/auth.service';
import { of } from 'rxjs';

describe('LoginService', () => {
  let service: LoginService;
  let authService: AuthService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule, HttpClientTestingModule],
    });
    service = TestBed.inject(LoginService);
    authService = TestBed.inject(AuthService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should authenticate user', fakeAsync(() => {
    const mockToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c';
    const user = 'testUser';
    const password = 'testPassword';
    const userData = {
      userName: user,
      userPassword: password
    };

    // Mock the response of loginUser method in AuthService
    spyOn(authService, 'loginUser').and.returnValue(of({ token: mockToken }));

    // Call the authenticate method of LoginService
    let authenticationSuccess = false;
    service.authenticate(user, password).subscribe((response) => {
      expect(response.token).toBe(mockToken);
      authenticationSuccess = true;
    });

    // Verify that the loginUser method in AuthService was called with the correct data
    expect(authService.loginUser).toHaveBeenCalledWith(userData);

    // Advance to the point in time when the asynchronous operations have completed
    tick();

    // Verify that authentication was successful
    expect(authenticationSuccess).toBeTruthy();
  }));
});
