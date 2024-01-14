import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { AuthService } from 'src/app/login/auth/auth.service';
import { User } from '../models/user.model';
import { Observable } from 'rxjs';

const API = environment.apiURL;

@Injectable({
  providedIn: 'root',
})
export class NewUserService {
  constructor(private http: HttpClient, private authService: AuthService) {}

  registerNewUser(newUser: User): Observable<User> {
    return this.authService.registerUser(newUser);
  }

  verifyExistingUser(userName: string): Observable<User[]> {
    return this.authService.getByUserName(userName);
  }

  verifyExistingEmail(email: string): Observable<User[]>{
    return this.authService.getByUserEmail(email);
  }
}
