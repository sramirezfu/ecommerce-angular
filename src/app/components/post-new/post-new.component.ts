import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { CategoryService } from '../../services/category.service';
import { PostService } from '../../services/post.service';
import { global } from '../../services/global';
import { Post } from '../../models/post.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-post-new',
  templateUrl: './post-new.component.html',
  styleUrls: ['./post-new.component.css']
})
export class PostNewComponent implements OnInit {
  
  public url;
  public post:Post;
  public identity;
  public token;
  public categories;
  public estado;
  public is_exist;
  public froala_options: Object = {
    charCounterCount: true,
    toolbarButtons: ['bold', 'italic', 'underline', 'paragraphFormat','alert'],
    toolbarButtonsXS: ['bold', 'italic', 'underline', 'paragraphFormat','alert'],
    toolbarButtonsSM: ['bold', 'italic', 'underline', 'paragraphFormat','alert'],
    toolbarButtonsMD: ['bold', 'italic', 'underline', 'paragraphFormat','alert'],
  };

  constructor(public userService:UserService,
              public categoryService:CategoryService,
              public postService:PostService,
              public router:Router) 
              {
                this.url = global.url;
                this.identity = this.userService.getIdentity();
                this.token = this.userService.getToken();
                this.is_exist = true;
                this.post = new Post(1, this.identity.sub, 1, '', '', '', '');
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
    this.postService.create(this.token, this.post).subscribe(
      response => {
        if(response.status == 'success'){
          this.estado = response.status;
          this.post = response.post;
          setTimeout(() => {
            this.router.navigate(['/detalle/articulo/' + this.post.id]);
          }, 2000);
        }
      }, 
      error => {
        console.log(<any>error);
      }
    );
  }

}
