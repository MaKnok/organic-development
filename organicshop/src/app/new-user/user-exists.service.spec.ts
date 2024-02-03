import { TestBed } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';
import { UserExistsService } from './user-exists.service';
import { NewUserService } from './new-user.service';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { of } from 'rxjs';
import { User } from '../models/user.model';

describe('UserExistsService', () => {
  let service: UserExistsService;
  let newUserService: jasmine.SpyObj<NewUserService>;

  beforeEach(() => {

    const newUserServiceSpy = jasmine.createSpyObj('NewUserService', [
      'verifyExistingUser',
      'verifyExistingEmail',
    ]);

    TestBed.configureTestingModule({
      imports: [HttpClientModule, ReactiveFormsModule],
      providers: [
        UserExistsService,
        { provide: NewUserService, useValue: newUserServiceSpy },
      ],
    });
    service = TestBed.inject(UserExistsService);
    newUserService = TestBed.inject(NewUserService) as jasmine.SpyObj<NewUserService>;
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('userExists', () => {
    it('should return null if user does not exist', () => {
      const users: User[] = []; // Simulate non-existing user
      newUserService.verifyExistingUser.and.returnValue(of(users));
      const validatorFn = service.userExists();
      const control = new FormControl('nonexistinguser');
      validatorFn(control).subscribe(result => {
        expect(result).toBeNull(); // User does not exist, so validator should return null
      });
    });

    it('should return error if user exists', () => {

      const birthday  = new Date('1990-01-01');
      const users: User[] = [{ _id: 1, 
                               userName: 'existinguser', 
                               userEmail: 'existingemail@example.com',
                               userPassword: '123#existinguser',
                               userFullName: 'Existing User Full Name',
                               userBirthday: birthday,
                               userSegment: 'IT',
                               userRole: 'Fullstack Developer'}]; // Simulate existing user
      newUserService.verifyExistingUser.and.returnValue(of(users));
      const validatorFn = service.userExists();
      const control = new FormControl('existinguser');
      validatorFn(control).subscribe(result => {
        expect(result).toEqual({ existingUser: true }); // User exists, so validator should return error
      });
    });
  });


  describe('emailExists', () => {
    it('should return null if email does not exist', () => {
      const users: User[] = []; // Simulate non-existing email
      newUserService.verifyExistingEmail.and.returnValue(of(users));
      const validatorFn = service.emailExists();
      const control = new FormControl('nonexistingemail@example.com');
      validatorFn(control).subscribe(result => {
        expect(result).toBeNull(); // Email does not exist, so validator should return null
      });
    });

    it('should return error if email exists', () => {
      const birthday  = new Date('1990-01-01');
      const users: User[] = [{ _id: 1, 
                                userName: 'existinguser', 
                                userEmail: 'existingemail@example.com',
                                userPassword: '123#existinguser',
                                userFullName: 'Existing User Full Name',
                                userBirthday: birthday,
                                userSegment: 'IT',
                                userRole: 'Fullstack Developer'}]; // Simulate existing email
      newUserService.verifyExistingEmail.and.returnValue(of(users));
      const validatorFn = service.emailExists();
      const control = new FormControl('existingemail@example.com');
      validatorFn(control).subscribe(result => {
        expect(result).toEqual({ existingEmail: true }); // Email exists, so validator should return error
      });
    });
  });
});
