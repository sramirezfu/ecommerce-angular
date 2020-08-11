import { Component, OnInit, DoCheck } from '@angular/core';
import { UserService } from '../../services/user.service';
import { global } from '../../services/global';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, DoCheck {
  
  public categories;
  public identity;
  public url;
  constructor(public userService:UserService) {
    this.url = global.url;
    this.categories = ['uno','dos'];
   }

  ngDoCheck(){
    this.getIdentity();
  }

  ngOnInit(): void {
      
  }
  
  getIdentity(){
    this.identity = this.userService.getIdentity();
  }

}
