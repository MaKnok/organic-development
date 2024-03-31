import { TestBed, inject } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { AuthService } from 'src/app/login/auth/auth.service';
import { NewUserService } from './new-user.service';
import { User } from '../models/user.model';
import { of } from 'rxjs';

describe('NewUserService', () => {
  let service: NewUserService;
  let authService: jasmine.SpyObj<AuthService>;

  beforeEach(() => {

    const authServiceSpy = jasmine.createSpyObj('AuthService', ['registerUser', 'getByUserName', 'getByUserEmail']);

    TestBed.configureTestingModule({
      imports: [HttpClientModule, HttpClientTestingModule],
      providers: [
        NewUserService,
        { provide: AuthService, useValue: authServiceSpy }
      ]
    });
    service = TestBed.inject(NewUserService);
    authService = TestBed.inject(AuthService) as jasmine.SpyObj<AuthService>;
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it(`${NewUserService.prototype.registerNewUser.name} 
      should call authService.registerUser with the provided newUser when registerNewUser is called`, () => {

    const birthday = new Date('1990-01-01');

    const newUser: User = {  
      userName: 'Test User Name',
      userEmail: 'testemail@test.com',
      userPassword: '123#Test',
      userFullName: 'User Test Name',
      userBirthday: birthday,
      userSegment: 'TI',
      userRole: 'Desenvolvedor Fullstack' };

    const expectedResponse: User = { 
      userName: 'Test User Name', 
      userEmail: 'testemail@test.com', 
      userPassword: '65e8ad9785213b1dfc4d8c1adb32e11d036b8b7a70c844732d…30089b0df8fb2961a5acb49d6WdBFt+KsgmW/hjbKG1UeqA==', 
      userFullName: 'User Test Name', 
      userBirthday: birthday,
      userSegment: "TI",
      userRole: "Desenvolvedor Fullstack",
    };
    
    authService.registerUser.and.returnValue(of(expectedResponse));

    service.registerNewUser(newUser).subscribe(response => {
      expect(response).toEqual(expectedResponse);
    });

    expect(authService.registerUser).toHaveBeenCalledWith(newUser);
  });

  it(`${NewUserService.prototype.verifyExistingUser.name} 
      should call authService.getByUserName with the provided userName when verifyExistingUser is called`, () => {

    const userName = 'Test User Name';

    const birthday = new Date('1990-01-01');

    const expectedResponse: User[] = [{ 
      userName: 'Test User Name', 
      userEmail: 'testemail@test.com', 
      userPassword: '65e8ad9785213b1dfc4d8c1adb32e11d036b8b7a70c844732d…30089b0df8fb2961a5acb49d6WdBFt+KsgmW/hjbKG1UeqA==', 
      userFullName: 'User Test Name', 
      userBirthday: birthday,
      userSegment: "TI",
      userRole: "Desenvolvedor Fullstack",
    }];
    
    authService.getByUserName.and.returnValue(of(expectedResponse));

    service.verifyExistingUser(userName).subscribe(response => {
      expect(response).toEqual(expectedResponse);
    });

    expect(authService.getByUserName).toHaveBeenCalledWith(userName);
  });

  it(`${NewUserService.prototype.verifyExistingEmail.name}
      should call authService.getByUserEmail with the provided email when verifyExistingEmail is called`, () => {
        const email = 'testemail@test.com';

        const birthday = new Date('1990-01-01');

        const expectedResponse: User[] = [{ 
          userName: 'Test User Name', 
          userEmail: 'testemail@test.com', 
          userPassword: '65e8ad9785213b1dfc4d8c1adb32e11d036b8b7a70c844732d…30089b0df8fb2961a5acb49d6WdBFt+KsgmW/hjbKG1UeqA==', 
          userFullName: 'User Test Name', 
          userBirthday: birthday,
          userSegment: "TI",
          userRole: "Desenvolvedor Fullstack",
        }];

        authService.getByUserEmail.and.returnValue(of(expectedResponse));

        service.verifyExistingEmail(email).subscribe(response => {
          expect(response).toEqual(expectedResponse);
        }) 

        expect(authService.getByUserEmail).toHaveBeenCalledWith(email);
  })

});
