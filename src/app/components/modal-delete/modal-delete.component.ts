import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { ProductService } from '../../services/product.service';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-modal-delete',
  templateUrl: './modal-delete.component.html',
  styleUrls: ['./modal-delete.component.scss']
})
export class ModalDeleteComponent implements OnInit {

  @Input() public  product;

  public token;

  constructor(public productService:ProductService,
              public userService:UserService,
              public router:Router) {
    this.token = this.userService.getToken();
  }

  ngOnInit(): void {
  }
  
  // Delete product
  deleteProduct(id){
    this.productService.delete(this.token,this.product.id).subscribe(
      response => {
        if(response.status == 'success'){
          this.router.navigate(['/inicio']);          
        } 
        console.log(response);       
      },
      error =>{
        console.log(<any>error);
      }
    );
  }
}
