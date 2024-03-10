import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { UserService } from '../login/auth/user/user.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(){
  }


  ngOnInit(){

  }
}
