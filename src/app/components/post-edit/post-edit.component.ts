import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { PostService } from '../../services/post.service';
import { CategoryService } from '../../services/category.service';
import { UserService } from '../../services/user.service';
import { global } from '../../services/global';
import { Post } from 'src/app/models/post.model';

@Component({
  selector: 'app-post-edit',
  templateUrl: '../post-new/post-new.component.html',
  styleUrls: ['./post-edit.component.css']
})
export class PostEditComponent implements OnInit {
  
  public id:number;
  public estado:string;
  public is_exist:boolean;
  public post:Post;
  public categories;
  public identity;
  public token;
  public url;
  public froala_options: Object = {
    charCounterCount: true,
    toolbarButtons: ['bold', 'italic', 'underline', 'paragraphFormat','alert'],
    toolbarButtonsXS: ['bold', 'italic', 'underline', 'paragraphFormat','alert'],
    toolbarButtonsSM: ['bold', 'italic', 'underline', 'paragraphFormat','alert'],
    toolbarButtonsMD: ['bold', 'italic', 'underline', 'paragraphFormat','alert'],
  };

  constructor(public router:Router,
              public activatedRouter:ActivatedRoute,
              public postService:PostService,
              public categoryService:CategoryService,
              public userService:UserService)
              {
                this.url = global.url;
                this.is_exist = null;
                this.identity = this.userService.getIdentity();
                this.token = this.userService.getToken();
                this.post = new Post(1,this.identity.sub,1,'','','','');
              }

  ngOnInit(): void {
    this.getCategories();
    this.getPost();
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
    this.activatedRouter.params.subscribe(
      params => {
        this.id = +params['id'];
        this.postService.getPost(this.id).subscribe(
          response => {
            if(response.status == 'success'){
              this.bullingPost(response.post);
            }else{
              this.estado = response.status;
              setTimeout(() => {
                this.router.navigate(['/']);
              }, 2000);
            }
          },
          error => {
            console.log(<any>error);
          }
        );
      }
    );
  }

  bullingPost(postJson){
      this.post.id = postJson.id;
      this.post.user_id = postJson.user.id;
      this.post.category_id = postJson.category.id;
      this.post.title = postJson.title;
      this.post.content = postJson.content;
      this.post.url = postJson.url;
      this.post.status = postJson.status;
  }

  onSubmit(form){
    this.postService.update(this.token,this.post, this.id).subscribe(
      response => {
        if(response.status == 'success'){          
          this.estado = response.status;
          setTimeout(() =>{
            this.router.navigate(['/detalle/articulo/' + this.id]);
          }, 2000);          
        }else{
          this.estado = response.status;
        }
      },
      error => {
        console.log(<any>error);
        this.estado = 'error';
      }
    );
  }

}
