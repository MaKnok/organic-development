import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.prod';
import { User } from '../../models/user.model';
import { Observable, tap } from 'rxjs';
import { UserService } from './user/user.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient, private userService: UserService) {}

  private API: string = environment.apiURL;

  getAll() {
    return this.http.get<User[]>(this.API + '/users');
  }

  getByUserName(userName: string): Observable<User[]> {
    return this.http
      .get<User[]>(
        this.API + '/users/username/' + userName,
      )
  }

  getByUserEmail(userEmail: string): Observable<User[]> {
    return this.http
      .get<User[]>(
        this.API + '/users/useremail/' + userEmail,
      )
  }

  getLoggedInUser(): Observable<any> {
    return this.http.get(this.API + '/user',{
      withCredentials: true
    })
  }

  loginUser(userData: any) {
    return this.http
     .post<any>(this.API + '/users/login', userData,{
      withCredentials: true
    })
  }

  registerUser(newUserData: User) {
    return this.http.post<User>(this.API + '/users', newUserData, {
      withCredentials: true
    })
  }

  updateUser(id: string, newUserData: any) {
    return this.http.put<User>(this.API + '/users/' + id, newUserData);
  }
}
