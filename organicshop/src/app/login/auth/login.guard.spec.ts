import { TestBed } from '@angular/core/testing';

import { LoginGuard } from './login.guard';
import { HttpClientModule } from '@angular/common/http';
import { UserService } from './user/user.service';

describe('LoginGuard', () => {
  let guard: LoginGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule],
      providers: [
        UserService,
      ],
    });
    guard = TestBed.inject(LoginGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
