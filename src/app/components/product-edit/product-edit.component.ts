import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { ProductService } from '../../services/product.service';
import { UserService } from '../../services/user.service';
import { Product } from '../../models/product.model';
import { global } from '../../services/global';
import { CategoryService } from 'src/app/services/category.service';

@Component({
  selector: 'app-product-edit',
  templateUrl: './product-edit.component.html',
  styleUrls: ['./product-edit.component.css']
})
export class ProductEditComponent implements OnInit {
  
  public url;
  public categories;
  public identity;
  public token;
  public product:Product;
  public id;
  public is_exist;
  public estado;
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
              public activatedRoute:ActivatedRoute,
              public userService:UserService,
              public categoryService:CategoryService,
              public productService:ProductService) 
              {
                this.url = global.url;
                this.token = this.userService.getToken();
                this.identity = this.userService.getIdentity();
                this.is_exist = true;
                this.product = new Product (1, this.identity.sub,1,'','','','outstanding',1,1);
              }

  ngOnInit(): void {
    this.getCategories();
    this.getProduct();    
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
  getProduct(){
    this.activatedRoute.params.subscribe(
      params => {
        this.id = +params['id'];
        this.productService.getProduct(this.id).subscribe(
          response => {
            if(response.status == 'success'){
              this.buildProduct(response.product);              
            }
          },
          error => {
            console.log(<any>error);
          }
        );
      }
    );
  }

  buildProduct(productJson){
    this.product.id = productJson.id;
    this.product.category_id = productJson.category.id;
    this.product.user_id = productJson.user.id;
    this.product.name = productJson.name;
    this.product.description = productJson.description;
    this.product.image = productJson.image;
    this.product.status = productJson.status;
    this.product.price = productJson.price;
    this.product.stock = productJson.stock;
  }

  onSubmit(form){
    this.productService.update(this.token, this.product, this.id).subscribe(
      response => {
        if(response.status == 'success'){
          this.estado = response.status;
          this.buildProduct(response.changes);
          setTimeout(() => {
            this.router.navigate(['detalle/producto/' + this.id]);
          }, 2000);
        }else{
          this.estado = response.status;
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
