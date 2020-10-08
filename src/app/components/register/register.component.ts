import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { global } from '../../services/global';
import { Router } from '@angular/router';
import { User } from '../../models/user.model';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  
  public url;
  public user;
  public status;
  constructor(public userService:UserService,
              public router:Router,
              )
              {
                this.url = global.url;
                this.user = new User (1,'','','ROLE_USER','','','','','','','');
              }

  ngOnInit(): void {

  }
  
  onSubmit(form){
    this.userService.register(this.user).subscribe(
      response => {
        if(response.status == 'success'){
          this.status = response.status;
          form.reset();
          setTimeout(() =>  {
            this.router.navigate(['login']);
          }, 2000);           
        }else{
          this.status = response.status;
        }        
      },
      error => {
        console.log(<any>error);
      }
    );
  }
}
