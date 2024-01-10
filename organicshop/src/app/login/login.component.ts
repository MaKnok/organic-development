import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from './login.service';
import { User } from '../models/user.model';
import { Subscription } from 'rxjs';
import { UserService } from '../login/auth/user/user.service';
import { AuthService } from '../login/auth/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  constructor(private loginService: LoginService, 
              private userService: UserService,
              private authService: AuthService,
              private router: Router) {}

  user: string;
  password: string;
  userData: any;
  validationMessage: string;

  subscription: Subscription;

  ngOnInit(): void {
    console.log('user data >>', this.userService.returnUserData());
  }

  enterLogin() {
    this.subscription = this.loginService
      .authenticate(this.user, this.password)
      .subscribe({
        next: async (res) => {
          this.userData = res;
          console.log(this.userData);
          console.log(this.user, this.password);
          if (this.userData.length == 0) {
            this.validationMessage = 'Usuário não existe. Cadastre o usuário!';
            console.log(this.validationMessage);
            this.clearFields();
            return;
          } else if (
            this.userData.user === this.user &&
            this.userData.password === this.password
          ) {
            await this.storeToken();

            setTimeout(()=>{
              this.router.navigate(['/home']);
            }, 1000)

            this.clearValidationMessage();
            this.clearFields();
          } else {
            this.validationMessage = 'Senha invalida!';
            return;
          }
        },
        error: (error) => {
          this.validationMessage = 'Usuário e/ou senha inválidos';
          console.log(error);
          console.log(this.validationMessage);
          this.clearFields();
        },
        complete: () => {
          console.info('Login completed!');
          
          this.subscription.unsubscribe();
          console.log('unsubscribe done!');
        },
      });
  }

  storeToken() {
    this.authService.getLoggedInUser()
    .subscribe((res: any)=>{
      console.log(res);
      const authToken = res.token;
      const userData = res.data;
      this.userService.saveToken(authToken);
      this.userService.saveUserData(userData);
    },
    (err)=>{
      console.log(`${err} - not logged in`); 
    })
  }

  clearValidationMessage() {
    this.validationMessage = '';
  }

  clearFields() {
    this.user = '';
    this.password = '';
  }
}
