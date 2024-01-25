import { Component, OnInit } from '@angular/core';
import { LoginService } from '../login/login.service';
import { UserService } from '../login/auth/user/user.service';
import { Router } from '@angular/router';
import { TokenService } from '../login/auth/token.service';
import { lastValueFrom } from 'rxjs';

@Component({
  selector: 'app-top-bar',
  templateUrl: './top-bar.component.html',
  styleUrls: ['./top-bar.component.scss'],
})
export class TopBarComponent {
  constructor(private userService: UserService, 
              public router: Router, 
              private tokenService: TokenService) {}

  user$ = this.userService.returnUserData();

  async logout() {

    try {
      const token = this.tokenService.returnsToken();
      const logoutUrl = this.userService.logout(token);

      await lastValueFrom(logoutUrl);
      
      // Clear the cookie on the client side
      document.cookie = 'jwt=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
  
      // Navigate to the desired route
      this.router.navigate(['/']);
      location.reload();

    } catch (error) {
      console.error(error);
      // Handle error
    }
  }

}
