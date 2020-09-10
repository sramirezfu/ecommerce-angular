import { Component, OnInit, Input } from '@angular/core';
import { CartService } from '../../services/cart.service';
import { global } from '../../services/global';

@Component({
  selector: 'app-modal-cart',
  templateUrl: './modal-cart.component.html',
  styleUrls: ['./modal-cart.component.scss']
})
export class ModalCartComponent implements OnInit {
  
  @Input() product;

  public modalAdd;
  public url;

  constructor(public cartService:CartService) 
  {
    this.url = global.url;
  }  

  ngOnInit(): void {
    
  }

  addCart(product){
    this.cartService.addCart(product).subscribe(
      response => {
        if(response.status == 'success'){
          this.modalAdd = 'success';
        }
      },
      error =>{
        console.log(<any>error);
      }
    );
  }

}
