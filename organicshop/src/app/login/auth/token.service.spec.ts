import { TestBed } from '@angular/core/testing';
import { TokenService } from './token.service';

describe('TokenService', () => {
  let service: TokenService;
  const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c';

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TokenService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  afterEach(() => {
    // Clean up local storage after each test
    localStorage.removeItem('token');
  });

  it(`${TokenService.prototype.saveToken.name} should save token to local storage`, () => {
    service.saveToken(token);
    expect(localStorage.getItem('token')).toEqual(token);
  });

  it(`${TokenService.prototype.returnsToken.name} should return token from local storage`, () => {
    localStorage.setItem('token', token);
    expect(service.returnsToken()).toEqual(token);
  });

  it(`${TokenService.prototype.deleteToken.name} should delete token from local storage`, () => {
    localStorage.setItem('token', token);
    service.deleteToken();
    expect(localStorage.getItem('token')).toBeNull();
  });

  it(`${TokenService.prototype.hasToken.name} should check if token exists in local storage`, () => {
    localStorage.setItem('token', token);
    expect(service.hasToken()).toBe(true);
  });

  it(`should return false if token does not exist in local storage`, () => {
    localStorage.removeItem('token');
    expect(service.hasToken()).toBe(false);
  });
});
