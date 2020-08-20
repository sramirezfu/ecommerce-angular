import { Component, OnInit, DoCheck} from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { UserService } from '../../services/user.service';
import { CategoryService } from '../../services/category.service';
import { PostService } from '../../services/post.service';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.css']
})
export class PostListComponent implements OnInit, DoCheck {
  
  public status;
  public identity;
  public token;
  public posts;
  public categories;
  public id;
  public page;
  public number_pages;
  public prev_page;
  public next_page;
  public change_page;
  public total_pages;
  public filterPost;

  constructor(public userService:UserService,
              public postService:PostService,
              public router:Router,
              public activatedRoute:ActivatedRoute,
              public categoryService:CategoryService)
              {
                this.identity = this.userService.getIdentity();
                this.token = this.userService.getToken();     
                this.filterPost = {category_id: 0,
                                  title: ''}                         
              }

  ngOnInit(): void {
    this.getPost();   
    this.getCategories(); 
  }
  
  ngDoCheck(){
    // console.log(this.posts);
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

  getPost(){
    this.activatedRoute.params.subscribe(
      params => {
        this.page = +params['page'];
        this.postService.getPosts(this.page).subscribe(
          response => {
            if(response.status == 'success'){
              this.posts = response.posts;
              this.status = response.status;
              this.change_page = response.page_actual;
              this.total_pages = response.total_pages;
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
  
  getThumb(url, size) {
    var video, results, thumburl;
    
     if (url === null) {
         return '';
     }     
     results = url.match('[\\?&]v=([^&#]*)');
     video   = (results === null) ? url : results[1];
    
     if(size != null) {
         thumburl = 'http://img.youtube.com/vi/' + video + '/'+ size +'.jpg';
     }else{
         thumburl = 'http://img.youtube.com/vi/' + video + '/mqdefault.jpg';
     }
    
      return thumburl;        
  }
  deletePost(id){
    this.postService.delete(this.token, id).subscribe(
      response => {
        if(response.status == 'success'){
          this.getPost();
          this.status = 'delete';
        }
      },
      error => {
        console.log(<any>error);
      }
    );
  }

}
