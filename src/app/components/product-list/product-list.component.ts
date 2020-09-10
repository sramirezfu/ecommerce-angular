import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { CategoryService } from '../../services/category.service';
import { ProductService } from '../../services/product.service';
import { UserService } from '../../services/user.service';
import { CartService } from '../../services/cart.service';
import { global } from '../../services/global';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit {
  
  public status;
  public products;
  public token;
  public identity;
  public categories;
  public url;  
  public type;
  public page;
  public number_pages;
  public prev_page;
  public next_page;
  public change_page;
  public total_pages;
  public is_exist;
  public filterProduct;
  public modalAdd;
  public total_items;


  constructor(public router:Router,
              public activatedRoute:ActivatedRoute,
              public categoryService:CategoryService,
              public productService:ProductService,
              public userService:UserService,
              public cartService:CartService)
              {
                this.token = this.userService.getToken();
                this.identity = this.userService.getIdentity();
                this.url = global.url;    
                this.is_exist = true;     
                this.filterProduct = {
                  name:'',
                  category: 0
                }      
              }

  ngOnInit(): void {
    this.getCategories();
    this.getProducts();
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

  getProducts(){
    this.activatedRoute.params.subscribe(
      params => {
        this.page = +params['page'];
        this.type = params['type'];
        this.productService.getProducts(this.page, this.type).subscribe(
          response => {            
            if(response.status == 'success'){
              this.products = response.products;
              this.status = response.status;
              this.change_page = response.page_actual;
              this.total_pages = response.total_pages;
              this.total_items = response.total_items_count;
              if(this.type == 'all' && this.total_items <= response.items_per_page){
                this.router.navigate(['/catalogo/2/all']);
              }
              let pages = [];
              for(let i = 1; i <= this.total_pages; i++){
                pages.push(i);
              }
              this.number_pages = pages;
              if(this.page >= 2){
                this.prev_page = this.page-1;
              }else{
                this.prev_page = 1;
              }
              if(this.page == this.total_pages){
                this.next_page = 1;
              }else{
                this.next_page = this.page+1;
              }
            }
          },
          error => {
            console.log(<any>error);
          }
        );
      }
    );
  }
  
  deleteProduct($event){
    if($event == true){
      this.getProducts();
    } 
  }
}
