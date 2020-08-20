import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { CategoryService } from '../../services/category.service';
import { ProductService } from '../../services/product.service';
import { UserService } from '../../services/user.service';
import { CartService } from '../../services/cart.service';
import { global } from '../../services/global';

@Component({
  selector: 'app-search-product',
  templateUrl: '../product-list/product-list.component.html',
  styleUrls: ['./search-product.component.css']
})
export class SearchProductComponent implements OnInit {

  public url;
  public status;
  public products;
  public identity;
  public token;
  public category;
  public search;
  public page;
  public number_pages;
  public prev_page;
  public next_page;
  public change_page;
  public total_pages;
  public is_exist;
  public filterProduct;
  public categories;
  public modalAdd;
  
  constructor(public router:Router,
              public activatedRoute:ActivatedRoute,
              public categoryService:CategoryService,
              public productService:ProductService,
              public userService:UserService,
              public cartService:CartService)
              { 
                this.url = global.url;
                this.is_exist = false;
                this.filterProduct = {
                  name:'',
                  category: 0
                }  
              }

  ngOnInit(): void {
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
        this.search = params['producto'];
        this.category = +params['category'];
        this.page = +params['page'];
        if(this.search == undefined){
          this.categoryService.getProductsByCategory(this.category, this.page).subscribe(
            response => {
              if(response.status == 'success'){
                this.products = response.products;
                this.total_pages = response.total_pages;
                this.pagination(this.total_pages, this.page);
                this.status = response.status;                              
              }else{
                this.status = response.status;
              }
            },
            error => {
              console.log(<any>error);
            }
          );
        }else{
          this.productService.searchproduct(this.search, this.page).subscribe(
            response => {  
              if(response.status == 'success'){
                this.status = response.status;
                this.products = response.products;  
                this.total_pages = response.total_pages;
                this.pagination(this.total_pages, this.page);              
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
    );
  }
  
  pagination(total_pages, page){  
    let pages = [];
    for(let i = 1; i <= total_pages; i++){
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
  deleteProduct(id){

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
