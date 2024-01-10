import { Component, OnInit } from '@angular/core';
import { LoginService } from '../login/login.service';
import { UserService } from '../login/auth/user/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-top-bar',
  templateUrl: './top-bar.component.html',
  styleUrls: ['./top-bar.component.scss'],
})
export class TopBarComponent {
  constructor(private userService: UserService, public router: Router) {}

  user$ = this.userService.returnUserData();

  logout() {
    this.userService.logout();
    this.router.navigate(['']);
  }
}
