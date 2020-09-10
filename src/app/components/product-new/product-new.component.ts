import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { ProductService } from '../../services/product.service';
import { CategoryService } from '../../services/category.service';
import { global } from '../../services/global';
import { Product } from '../../models/product.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-product-new',
  templateUrl: '../product-edit/product-edit.component.html',
  styleUrls: ['./product-new.component.css']
})
export class ProductNewComponent implements OnInit {
  
  public estado;
  public url;
  public categories;
  public product:Product;
  public identity;
  public token;
  public is_exist;
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
      url:global.url+'upload/product',
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

  constructor(public router:Router,
              public userService:UserService,
              public productService:ProductService,
              public categoryService:CategoryService
              ) 
              {
                this.url = global.url;
                this.is_exist = null;
                this.identity = this.userService.getIdentity();
                this.token = this.userService.getToken();   
                this.product = new Product(1,this.identity.sub,1,'','','','0',0,1);             
              }

  ngOnInit(): void {
    this.getCategories();
  }
  
  getCategories(){
    this.categoryService.getCategories().subscribe(
      response => {
        if(response.status == 'success'){
          this.categories = response.categories;                
        }
      },
      error => {
        console.log(<any>error);
      }
    );
  }

  onSubmit(form){
    this.productService.create(this.token,this.product).subscribe(
      response => {
        if(response.status == 'success'){
          this.product = response.product;
          this.estado = response.status;
          setTimeout(() => {
            this.router.navigate(['detalle/producto/' + this.product.id]);
          }, 2000);          
        }
      },
      error => {
        console.log(<any>error);
      }
    );
  }

  avatarUpload(data){
    let image = data.body.image;
    this.product.image = image;
  }
}
