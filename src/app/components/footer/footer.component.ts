import { Component, OnInit } from '@angular/core';
import { SuscribeService } from '../../services/suscribe.service';
import { Router } from '@angular/router';
import { Suscribe } from '../../models/suscribe.model';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {
  
  public user;
  public status;
  constructor(public suscribeService:SuscribeService,
              public router:Router)
              {
                this.user = new Suscribe (1,'','null');
              }

  ngOnInit(): void {
  }
  
  onSubmit(form){
    this.suscribeService.suscribe(this.user).subscribe(
      response => {
          if(response.status == 'success'){
            this.status = response.status;
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
