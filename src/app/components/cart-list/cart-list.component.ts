import { Component, OnInit, DoCheck } from '@angular/core';
import { CartService } from '../../services/cart.service';
import { global } from '../../services/global';

@Component({
  selector: 'app-cart-list',
  templateUrl: './cart-list.component.html',
  styleUrls: ['./cart-list.component.css']
})
export class CartListComponent implements OnInit, DoCheck {
  
  public products;
  public status;
  public url;
  public total;

  constructor(public cartService:CartService)
  {
    this.url = global.url;
  }

  ngDoCheck(){
    this.getProductsCart();
  }

  ngOnInit(): void {
    
  }

  getProductsCart(){
    this.cartService.getProductCart().subscribe(
      response => {
        if(response.status == 'success'){
          this.products = response.products;
          this.status = response.status;
          let total = 0;
          for(let product of this.products){
            total += product.stock * product.price;
          }
          this.total = total;
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
