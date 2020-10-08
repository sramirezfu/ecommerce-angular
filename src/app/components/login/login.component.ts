import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { UserService } from '../../services/user.service';
import { User } from '../../models/user.model';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  
  public status;
  public user;
  public identity;
  public token;
  constructor(public router:Router,
              public activatedRouter:ActivatedRoute,
              public userService:UserService) 
              {
                this.user = new User(1,'','','','','','','','','','');
              }

  ngOnInit(): void {
    this.logout();
  }
  
  onSubmit(form){
    this.userService.login(this.user).subscribe(
      response => {
        if(response.status != 'error'){
          this.status = 'success';
          this.identity = response;
          this.userService.login(this.user, true).subscribe(
            response => {         
              this.token = response;
              localStorage.setItem('identity', JSON.stringify(this.identity));
              localStorage.setItem('token', this.token);
              this.router.navigate(['/']);              
            },
            error => {
              console.log(<any>error);
            }
          );
        }else{
          this.status = response.status;
        }
      },
      error => {
        console.log(<any>error);
      }
    );
  }

  logout(){
    this.activatedRouter.params.subscribe(
      params => {
        let logout = +params['sure'];
        if(logout == 1){
          localStorage.removeItem('identity');
          localStorage.removeItem('token');
          this.identity = null;
          this.token = null;
          this.router.navigate(['/']);
        }
      }
    );
  }
}
