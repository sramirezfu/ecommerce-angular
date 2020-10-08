import { Component, OnInit, DoCheck } from '@angular/core';
import { CartService } from '../../services/cart.service';
import { global } from '../../services/global';

@Component({
  selector: 'app-car-deploy',
  templateUrl: './car-deploy.component.html',
  styleUrls: ['./car-deploy.component.scss']
})
export class CarDeployComponent implements OnInit, DoCheck {
  
  public products;
  public status;
  public url;
  public total;
  public quantity;

  constructor(public cartService:CartService) {
    this.url = global.url;
  }
  
  ngDoCheck(){
    this.getProducts();
  }

  ngOnInit(): void {
    
  }
  
  getProducts(){
    this.cartService.getProductCart().subscribe(
      response => {
        if(response.status == 'success'){
          this.products = response.products;
          this.status = response.status;   
          let total = 0;
          let quantity = 0;
          for(let product of this.products){
            total += product.stock * product.price;  
            quantity += product.stock;  
          }         
          this.total = total;         
          this.quantity = quantity;            
        }else{
          this.status = response.status;
        }
      },  
      error => {
        console.log(<any>error);
      }
    );
  } 
  
  delete(id){
    this.cartService.delete(id).subscribe(
      response => {
        if (response.status === 'success') {
          this.getProducts();
        }
      },
      error => {
        console.log(<any>error);
      }
    );
  }
}
