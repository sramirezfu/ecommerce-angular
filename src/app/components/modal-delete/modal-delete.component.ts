import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { ProductService } from '../../services/product.service';
import { UserService } from '../../services/user.service';
import { PostService } from '../../services/post.service';

@Component({
  selector: 'app-modal-delete',
  templateUrl: './modal-delete.component.html',
  styleUrls: ['./modal-delete.component.scss']
})
export class ModalDeleteComponent implements OnInit {

  @Input() public  product;
  @Input() public  post;

  @Output() public is_delete = new EventEmitter<boolean>();

  public token;

  constructor(public productService:ProductService,
              public userService:UserService,
              public router:Router,
              public postService:PostService) {
    this.token = this.userService.getToken();
  }

  ngOnInit(): void {
  }
  
  // Delete product
  deleteProduct(id){
    this.productService.delete(this.token,this.product.id).subscribe(
      response => {
        if(response.status == 'success'){
          this.is_delete.emit(true);    
        }             
      },
      error =>{
        console.log(<any>error);
      }
    );
  }


  // Delete post
  deletePost(id){
    this.postService.delete(this.token, id).subscribe(
      response => {
        if(response.status == 'success'){
          // window.location.reload();
          this.is_delete.emit(true);
        }        
      },  
      error => {
        console.log(<any>error);
      }
    );
  }
}
