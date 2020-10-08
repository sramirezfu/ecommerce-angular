import { Component, OnInit, DoCheck } from '@angular/core';
import { CartService } from '../../services/cart.service';
import { UserService } from '../../services/user.service'
import { User } from '../../models/user.model';
import { global } from '../../services/global';
import { Router } from '@angular/router';
import { PreviousRouteService } from '../../services/previousRouter.service';


@Component({
  selector: 'app-detail-payment',
  templateUrl: './detail-payment.component.html',
  styleUrls: ['./detail-payment.component.scss']
})
export class DetailPaymentComponent implements OnInit, DoCheck {

  public products;
  public url;
  public user;
  public identity;
  public total;
  public quantity;

  constructor(public cartService:CartService,
              public userService:UserService,
              public router:Router,
              public previousRoute:PreviousRouteService) { 
    this.url = global.url;
    this.identity = this.userService.getIdentity();
    this.user = new User (1, '', '', '', '', '', '', '', '', '', '');
  }
  
  ngDoCheck() {
    this.getProducts();
  }

  ngOnInit(): void {    
    if (this.identity){
      this.user = this.identity;
    }
  }
  
  getUser() {
    this.user = this.userService.getIdentity();
  }

  getProducts() {
    this.cartService.getProductCart().subscribe(
      response => {
        if (response.status === 'success') {
          this.products = response.products;
          let total = 0;
          let quantity = 0;
          for (let product of this.products) {
            total += product.price * product.stock;
            quantity += product.stock;
          }
          this.total = total;
          this.quantity = quantity;                              
        } else {
          this.router.navigate(['/']);
        }        
      },
      error => {
        console.log(<any>error);        
      }
    );
  }

  onSubmit(form) {

  }

  previewPage() {
    this.router.navigate(['lista/carro']); 
  }

}
