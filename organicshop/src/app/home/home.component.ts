import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment.prod';
import { UserService } from '../login/auth/user/user.service';
import { AuthService } from '../login/auth/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(private userService: UserService, private authService: AuthService){
  }

  private API: string = environment.apiURL;

  ngOnInit(){
  }
}
