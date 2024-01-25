import { TestBed } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';
import { UserExistsService } from './user-exists.service';

describe('UserExistsService', () => {
  let service: UserExistsService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule],
    });
    service = TestBed.inject(UserExistsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
