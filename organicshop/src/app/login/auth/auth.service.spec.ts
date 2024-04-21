import { TestBed } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { AuthService } from './auth.service';
import { UserService } from './user/user.service';
import { User } from '../../models/user.model';
import { environment } from 'src/environments/environment';


describe('AuthService', () => {
  let authService: AuthService;
  let httpMock: HttpTestingController;
  let userService: jasmine.SpyObj<UserService>;

  const apiURL = environment.apiURL;


  //Users Mock
  const birthday01 = new Date('1990-01-01');
  const birthday02 = new Date('1990-02-01');

  const dummyUsers: User[] = [
    {
      userName: 'initialUserName',
      userEmail: 'initialUserEmail@example.com',
      userPassword: 'password#123',
      userFullName: 'Full User Name',
      userBirthday: birthday01,
      userSegment: 'IT',
      userRole: 'Fullstack Developer'
    },
    {
      userName: 'initialUserName1',
      userEmail: 'initialUserEmail1@example.com',
      userPassword: 'password#1234',
      userFullName: 'Full User Name 01',
      userBirthday: birthday02,
      userSegment: 'IT',
      userRole: 'Fullstack Developer'
    }
  ];


  beforeEach(() => {

    const userServiceSpy = jasmine.createSpyObj('UserService', ['isLoggedIn']);

    TestBed.configureTestingModule({
      imports: [HttpClientModule, HttpClientTestingModule],
      providers: [
        AuthService,
        { provide: UserService, useValue: userServiceSpy }
      ]
    });

    authService = TestBed.inject(AuthService);
    httpMock = TestBed.inject(HttpTestingController);
    userService = TestBed.inject(UserService) as jasmine.SpyObj<UserService>;
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(authService).toBeTruthy();
  });

  it(`${AuthService.prototype.getAll.name} should get all users`, () => {

    authService.getAll().subscribe(users => {
      expect(users).toEqual(dummyUsers);
    });

    const req = httpMock.expectOne(`${apiURL}/users`);
    expect(req.request.method).toBe('GET');
    req.flush(dummyUsers);
  });

  it(`${AuthService.prototype.getByUserName.name} should get user by name`, () => {

    const userNameMock = 'initialUserName';

    authService.getByUserName(userNameMock).subscribe(
      user => {
        expect(user).toEqual([dummyUsers[0]]);
      }
    )

    const req = httpMock.expectOne(`${apiURL}/users/username/${userNameMock}`);
    expect(req.request.method).toBe('GET');
    req.flush([dummyUsers[0]]);
  
  });

  it(`${AuthService.prototype.getByUserEmail.name} should get user by email`, () => {

    const userEmailMock = 'initialUserEmail@example.com';

    authService.getByUserEmail(userEmailMock).subscribe(
      user => {
        expect(user).toEqual([dummyUsers[0]]);
      }
    )

    const req = httpMock.expectOne(`${apiURL}/users/useremail/${userEmailMock}`);
    expect(req.request.method).toBe('GET');
    req.flush([dummyUsers[0]]);
  
  });

  it(`${AuthService.prototype.getLoggedInUser.name} should get logged user`, () => {

    const dummyLoggedInUser: User =  {
      userName: 'initialUserName',
      userEmail: 'initialUserEmail@example.com',
      userPassword: 'password#123',
      userFullName: 'Full User Name',
      userBirthday: birthday01,
      userSegment: 'IT',
      userRole: 'Fullstack Developer'
    }

    authService.getLoggedInUser().subscribe(user => {
      expect(user).toEqual(dummyLoggedInUser);
    });

    const req = httpMock.expectOne(`${apiURL}/user`);
    expect(req.request.method).toBe('GET');
    req.flush(dummyLoggedInUser);

  });

  it(`${AuthService.prototype.loginUser.name} should log user in`, () => {

    const userData = {
      "userName": 'initialUserName',
      "userPassword": 'password#123'
    }

    const token = {
      token:'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c'
    }

    authService.loginUser(userData).subscribe(response => {
      expect(response).toEqual(token); 
    });

    const req = httpMock.expectOne(`${apiURL}/users/login`);
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual(userData);
    req.flush(token);
    
  });

  it(`${AuthService.prototype.registerUser.name} should register user`, () => {

    const birthday03 = new Date('1998-09-02')

    const dummyNewUser: User =  {
      userName: 'initialUserName3',
      userEmail: 'initialUserEmai3l@example.com',
      userPassword: 'password#123456',
      userFullName: 'Full User Name3',
      userBirthday: birthday03,
      userSegment: 'IT',
      userRole: 'Fullstack Developer'
    }

    authService.registerUser(dummyNewUser).subscribe(response => {
      expect(response).toEqual(dummyNewUser); 
    });

    const req = httpMock.expectOne(`${apiURL}/users`);
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual(dummyNewUser);
    req.flush(dummyNewUser);
    
  });

  it(`${AuthService.prototype.updateUser.name} should update user`, () => {

    const id = '1234'

    const birthday03 = new Date('1998-09-02')

    const dummyUpdatedUser: User =  {
      userName: 'initialUserName3',
      userEmail: 'initialUserEmai3l@example.com',
      userPassword: 'password#123456',
      userFullName: 'Full User Name3',
      userBirthday: birthday03,
      userSegment: 'IT',
      userRole: 'Frontend Developer'
    }

    authService.updateUser(id, dummyUpdatedUser).subscribe(response => {
      expect(response).toEqual(dummyUpdatedUser); 
    });

    const req = httpMock.expectOne(`${apiURL}/users/${id}`);
    expect(req.request.method).toBe('PUT');
    expect(req.request.body).toEqual(dummyUpdatedUser);
    req.flush(dummyUpdatedUser);
    
  });





});
