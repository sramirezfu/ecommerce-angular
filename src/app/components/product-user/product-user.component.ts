import { Component, OnInit, DoCheck } from '@angular/core';
import { UserService } from '../../services/user.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { global } from '../../services/global';
import { ProductService } from '../../services/product.service';

@Component({
  selector: 'app-profile',
  templateUrl: './product-user.component.html',
  styleUrls: ['./product-user.component.css']
})
export class ProductUserComponent implements OnInit, DoCheck {
  
  public identity;
  public token;
  public user;
  public status;
  public products;
  public page;
  public number_pages;
  public prev_page;
  public next_page;
  public change_page;
  public id;
  public url;
  public total_pages;

  constructor(public userService:UserService,
              public activatedRoute:ActivatedRoute,
              public router:Router,
              public productService:ProductService
              )
              {
                this.identity = this.userService.getIdentity();
                this.token = this.userService.getToken();
                this.url = global.url;
              }

  ngOnInit(): void {   
    this.getProducts();
     this.getUser();
  }

  ngDoCheck(){
    
  }

  getProducts(){
    this.activatedRoute.params.subscribe(
      params => {
        this.id = +params['id'];
        this.page = +params['page'];
        this.userService.getProductsByUser(this.id, this.page).subscribe(
          response => {           
            if(response.status == 'success'){
              this.products = response.products;
              this.status = response.status;
              this.change_page = response.page_actual;
              this.total_pages = response.total_pages;
              if(response.total_items_count <= response.items_per_page){
                this.router.navigate([`/productos/usuario/${this.user.id}/1`]);
              }
              var pages = [];
              for(var i = 1; i <= response.total_pages; i++){
                  pages.push(i);
              }
              this.number_pages = pages;
              if(this.page >= 2){
                this.prev_page = this.page -1;
              }else{
                this.prev_page = 1;
              }
              if(this.page == response.total_pages){
                this.next_page = 1;
              }else{
                this.next_page = this.page+1;
              }
            }else{
              this.status = response.status;
            }
          },
          error => {
            console.log(<any>error);
            this.status = 'error';
          }
        );
      }
    );
  }

  getUser(){    
    this.userService.getUser(this.id).subscribe(
      response => {
        if(response.status == 'success'){
          this.user = response.user[0];
        }else{
          setTimeout(() => {
            this.router.navigate(['/']);
            this.status = response.status;
          }, 2000);
        }
      },
      error => {
        console.log(<any>error);
      }
    );
  }

  deleteProduct(event){
    if(event == true){
      this.getProducts();
    }
  }

}
