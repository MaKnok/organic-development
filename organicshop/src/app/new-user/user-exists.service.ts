import { Injectable } from '@angular/core';
import { AbstractControl } from '@angular/forms';
import { NewUserService } from './new-user.service';
import { first, map, switchMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class UserExistsService {
  constructor(private newUserService: NewUserService) {}

  userExists() {
    return (control: AbstractControl) => {
      return control.valueChanges.pipe(
        //receives what user is typing...
        switchMap(
          (userName) => this.newUserService.verifyExistingUser(userName)
          //converts typed value into request to backend, changes flow
        ),
        map((user) => (user.length !== 0 ? { existingUser: true } : null)),
        //doesnt change flow, but result
        first() //closes observable
      );
    };
  }

  emailExists() {
    return (control: AbstractControl) => {
      return control.valueChanges.pipe(
        //receives what user is typing...
        switchMap(
          (userEmail) => this.newUserService.verifyExistingEmail(userEmail)
          //converts typed value into request to backend, changes flow
        ),
        map((user) => (user.length !== 0 ? { existingEmail: true } : null)),
        //doesnt change flow, but result
        first() //closes observable
      );
    };
  }
}
