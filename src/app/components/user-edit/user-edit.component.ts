import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { global } from '../../services/global';
import { User } from '../../models/user.model';

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.css']
})
export class UserEditComponent implements OnInit {

  public status;
  public identity;
  public token;
  public user;
  public url;
  public froala_options: Object = {
    charCounterCount: true,
    toolbarButtons: ['bold', 'italic', 'underline', 'paragraphFormat','alert'],
    toolbarButtonsXS: ['bold', 'italic', 'underline', 'paragraphFormat','alert'],
    toolbarButtonsSM: ['bold', 'italic', 'underline', 'paragraphFormat','alert'],
    toolbarButtonsMD: ['bold', 'italic', 'underline', 'paragraphFormat','alert'],
  };
  public afuConfig = {
    multiple: false,
    formatsAllowed: ".jpg,.png,.gif,.jpeg",
    maxSize: "50",
    uploadAPI:  {
      url:global.url+'upload',
      headers: {     
     "Authorization" : this.userService.getToken()
      }
    },
    theme: "attachPin",
    hideProgressBar: true,
    hideResetBtn: true,
    hideSelectBtn: false,
    attachPinText: 'Subir imagen',
  };

  constructor(public userService:UserService)
    {
      this.url = global.url;
      this.token = this.userService.getToken();
      this.identity = this.userService.getIdentity();
      this.user = new User(
          this.identity.sub,
          this.identity.name,
          this.identity.surname,
          this.identity.role,
          this.identity.email,
          '',
          this.identity.description,
          this.identity.image);
    }

  ngOnInit(): void {
  }

  avatarUpload(datos){
    let data = datos.body.image;    
    this.user.image = data;
  }
  
  onSubmit(form){
    this.userService.update(this.token,this.user).subscribe(
      response => {
        if(response.status == 'success'){
          this.status = response.status;
          this.identity = response.changes;
          localStorage.setItem('identity', JSON.stringify(this.identity));
        }
      },
      error => {
        console.log(<any>error);
      }
    );    
  }
}
