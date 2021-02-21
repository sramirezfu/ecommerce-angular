import { Component, OnInit, DoCheck } from '@angular/core';
import { Router } from '@angular/router';
import { CategoryService } from '../../services/category.service';
import { ProductService } from '../../services/product.service';
import { PostService } from '../../services/post.service';
import { UserService } from '../../services/user.service';
import { CartService } from '../../services/cart.service';
import { global } from '../../services/global';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, DoCheck {
  
  public categories;
  public category;
  public letter;
  public invalido;
  public products;
  public posts;
  public url;
  public identity;
  public modalAdd;

  constructor(public categoryService:CategoryService,
              public productService:ProductService,
              public postService:PostService,
              public userService:UserService,
              public cartService:CartService,
              public router:Router)
             {
                this.category = 0;
                this.url = global.url;
                this.identity = this.userService.getIdentity();
             }

  ngOnInit(): void {
    this.getCategories();    
    this.getPosts();
    this.getProducts();
  }

  ngDoCheck(){
    
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

  clickInput(){
    this.category = 0;
  }
  clickSelect(){
    this.letter = '';
  }
  

  // Realizar la busqueda
  onSubmit(form){
    if(this.category === 0 && this.letter === undefined){
      this.invalido = true;
    }else{
      if(this.category === 0 ){
        this.router.navigate(['/buscar/' + this.letter + '/1']);
      }else{
        this.router.navigate(['/categoria/' + this.category + '/1']);
      }
    }
  }

  // Traer los productos destacados
  getProducts(){
    this.productService.getProducts(1,'destacado').subscribe(
      response => {
        if(response.status == 'success'){
          this.products = response.products;          
        }      
      },
      error => {
        console.log(<any>error);
      }
    );
  }

  // Traer los posts
  getPosts(){
    this.postService.getPosts(1).subscribe(
      response => {
        if(response.status == 'success'){
          this.posts = response.posts.sort().reverse();       
        }     
      },
      error => {
        console.log(<any>error);
      }
    );
  }
  getThumb(url, size) {
    var video, results, thumburl;
    
     if (url === null) {
         return '';
     }     
     results = url.match('[\\?&]v=([^&#]*)');
     video   = (results === null) ? url : results[1];
    
     if(size != null) {
         thumburl = 'https://img.youtube.com/vi/' + video + '/'+ size +'.jpg';
     }else{
         thumburl = 'https://img.youtube.com/vi/' + video + '/mqdefault.jpg';
     }
    
    return thumburl;        
  }
  getDate(day){
    const event = new Date(day);
    const options = { weekday: 'long', month: 'long', day: 'numeric' };
    day = event.toLocaleDateString(undefined, options);    
    return day;
  }

  // Agregar al carrito
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
  
  public slides = [{'image': '../../../assets/images/header/fondo2.jpg'}, {'image': '../../../assets/images/header/fondo1.jpg'},{'image': '../../../assets/images/header/fondo3.jpg'}, {'image': '../../../assets/images/header/fondo4.jpg'}, {'image': '../../../assets/images/header/fondo5.jpg'}];

}
