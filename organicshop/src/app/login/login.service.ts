import { Observable, tap } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from './auth/auth.service';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  constructor(
    private httpClient: HttpClient,
    private authService: AuthService
  ) {}

  authenticate(user: string, password: string): Observable<any> {

    let userData = {
      "userName": user,
      "userPassword": password
    }

    return this.authService.loginUser(userData);
  }
}
