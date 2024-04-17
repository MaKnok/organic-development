import { TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { LoginService } from './login.service';
import { AuthService } from './auth/auth.service';
import { of } from 'rxjs';
import { environment } from 'src/environments/environment';

describe('LoginService', () => {
  let service: LoginService;
  let authService: AuthService;
  let httpMock: HttpTestingController;

  const api: string = environment.apiURL;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule, HttpClientTestingModule],
    });
    service = TestBed.inject(LoginService);
    authService = TestBed.inject(AuthService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should authenticate user', fakeAsync(() => {
    const mockToken = 'mockToken';
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
