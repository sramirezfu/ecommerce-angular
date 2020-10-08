import { Component, OnInit, DoCheck } from '@angular/core';
import { CartService } from '../../services/cart.service';
import { global } from '../../services/global';

@Component({
  selector: 'app-cart-list',
  templateUrl: './cart-list.component.html',
  styleUrls: ['./cart-list.component.scss']
})
export class CartListComponent implements OnInit, DoCheck {
  
  public products;
  public status;
  public url;
  public total;
  public quantity;

  constructor(public cartService:CartService)
  {
    this.url = global.url;
  }

  ngDoCheck(){
    this.getProductsCart();
  }

  ngOnInit(): void {
    
  }

  getProductsCart() {
    this.cartService.getProductCart().subscribe(
      response => {        
        if (response.status == 'success') {
          this.products = response.products;
          this.status = response.status;
          let total = 0;
          let quantity = 0;
          for(let product of this.products) {
            total += product.stock * product.price;
            quantity += product.stock;
          }
          this.total = total;
          this.quantity = quantity;
        }else {
          this.status = response.status;
          this.products = 'empty';         
        }
      },
      error => {
        console.log(<any>error);
      }
    );
  }

  delete(id) {
    this.cartService.delete(id).subscribe(
      response => {
        if (response.status === 'success') {
          this.getProductsCart();
        }       
      },
      error => {
        console.log(<any>error);
      }
    );
  }
}
