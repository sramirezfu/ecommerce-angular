import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { PostService } from '../../services/post.service';
import { Router, ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-post-user',
  templateUrl: './post-user.component.html',
  styleUrls: ['./post-user.component.css']
})
export class PostUserComponent implements OnInit {
  
  public posts;
  public user;
  public identity;
  public token;
  public status;
  public id;
  public page;
  public number_pages;
  public total_pages;
  public prev_page;
  public next_page;
  public change_page;

  constructor(public router:Router,
              public activatedRoute:ActivatedRoute,
              public userService:UserService,
              public postService:PostService)
              {
                this.identity = this.userService.getIdentity();
                this.token = this.userService.getToken();
              }

  ngOnInit(): void {
    this.getPosts();
    this.getUser();
  }
  
  getPosts(){
    this.activatedRoute.params.subscribe(
      params => {
        this.id = +params['id'];
        this.page = +params['page'];
        this.userService.getPostsByUser(this.id, this.page).subscribe(
          response => {
            if(response.status == 'success'){
              this.posts = response.posts;
              this.status = response.status;
              this.change_page = response.page_actual;
              this.total_pages = response.total_pages;              
              var pages = [];
              for(var i = 1; i <= response.total_pages; i++){
                pages.push(i);
              }
              this.number_pages = pages;
              if(this.page >= 2){
                this.prev_page = this.page-1;
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
          this.status = 'delete';
          this.getPosts();               
          this.router.navigate(['articulos/usuario/' + this.user.id + '/1']); 
        }else{
          this.status = 'none'
        }
      },
      error => {
        console.log(<any>error);
      }
    );
  }
}
