import { TestBed } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TokenService } from '../token.service';
import { of } from 'rxjs';
import { UserService } from './user.service';
import { AuthUser } from './auth-user';
import { environment } from 'src/environments/environment';

describe('UserService', () => {
  let userService: UserService;
  let tokenService: TokenService;
  let httpMock: HttpTestingController;

  const apiURL = environment.apiURL;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule, HttpClientTestingModule],
      providers: [
        UserService,
        TokenService
      ]
    });
    userService = TestBed.inject(UserService);
    tokenService = TestBed.inject(TokenService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(userService).toBeTruthy();
  });

  it(`${UserService.prototype.saveToken.name} should save token and decode it`, () => {

    const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c';                 
    
    const decodedUser =  {
      name: 'John Doe',
      sub: '1234567890',
      iat: 1516239022,
    };

    spyOn(tokenService, 'returnsToken').and.returnValue(token);
    spyOn(tokenService, 'saveToken').and.callThrough();

    userService.saveToken(token);

    expect(tokenService.saveToken).toHaveBeenCalledWith(token);
    expect(userService['userSubject'].getValue()).toEqual(decodedUser);
  });

  it(`${UserService.prototype.saveToken.name} should save user data`, () => {
    const userData = { id: 1, name: 'TestName', email: 'test@example.com' };

    userService.saveUserData(userData);
    userService['userData$'].subscribe(data => {
      expect(data).toEqual([userData]);
    })

    expect(userService['userData']).toContain(userData);

  });

  it(`${UserService.prototype.returnUserData.name} should return user data`, () => {
    const userData = { id: 1, name: 'TestName', email: 'test@example.com' };

    spyOn(userService, 'returnUserData').and.returnValue(of([userData]));

    userService.returnUserData().subscribe(data => {
      expect(data).toEqual([userData]);
    });
  });


  it(`${UserService.prototype.logout.name} should logout user`, () => {
    const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c';                 
    const logoutResponse = { success: true };

    spyOn(tokenService, 'deleteToken').and.callThrough();
    spyOn(userService['http'], 'post').and.returnValue(of(logoutResponse));
    const userSubjectSpy = spyOn(userService['userSubject'], 'next');

    userService.logout(token).subscribe(response => {
      expect(response).toEqual(logoutResponse);
    });

    expect(tokenService.deleteToken).toHaveBeenCalled();
    expect(userSubjectSpy).toHaveBeenCalledWith({});
    expect(userService['userData']).toEqual([]);
    expect(userService['userData$']).toBeTruthy();
  });

  it(`${UserService.prototype.isLoggedIn.name}`, ()=>{
    spyOn(tokenService, 'hasToken').and.returnValue(true);

    const isLoggedIn = userService.isLoggedIn();

    expect(isLoggedIn).toBeTrue();


  })



});
