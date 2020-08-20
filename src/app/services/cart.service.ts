import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  
  public productCart;
  public info;

  constructor() {
    this.productCart = new Array<any>();
  }

  addCart(product):Observable<any>{
    

    let addItem = this.productCart.findIndex((obj => obj.id == product.id));
    if(addItem == -1){
      this.productCart.push(product);
    }else{
      this.productCart[addItem].stock += 1;
    }    

    if(this.productCart.length > 0){
      this.info = {
        code:200,
        status:'success',
        products: this.productCart
      };        
    }else{
      this.info = {
        code:400,
        status:'error',
        message:'Error al agregar producto'
      }; 
    }

    return of(this.info);
  }

  getProductCart():Observable<any>{
    
    if(this.productCart.length > 0){
      this.info = {
        code:200,
        status:'success',
        products: this.productCart
      };  
    }else{
      this.info = {
        code:400,
        status:'error',
        message:'No has agregado productos'
      };  
    }

    return of(this.info);

  }

  delete(id):Observable<any>{
    
    let products = [];
    for(let product of this.productCart){
        if(product.id != id){
          products.push(product);
        }
    }
    this.productCart = products;
    if(this.productCart){
      this.info = {
        code:200,
        status:'success',
        products: this.productCart
      };  
    }else{
      this.info = {
        code:400,
        status:'error',
        message:'No existen Jobs'
      };  
    }

    return of(this.info)
  }
}
