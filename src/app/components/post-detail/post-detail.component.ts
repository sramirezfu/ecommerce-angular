import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { PostService } from '../../services/post.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { PreviousRouteService } from '../../services/previousRouter.service';
 
@Component({
  selector: 'app-post-detail',
  templateUrl: './post-detail.component.html',
  styleUrls: ['./post-detail.component.scss']
})
export class PostDetailComponent implements OnInit {
  
  public id;
  public video;
  public status;
  public previous;

  constructor(public router:Router,
              public activatedRoute:ActivatedRoute,
              public userService:UserService,
              public postService:PostService,
              public sanitizer:DomSanitizer,
              public previousRouter:PreviousRouteService)
              {                 
              }

  ngOnInit(): void {
    this.getPost();
  }
  
  getPost(){
    this.activatedRoute.params.subscribe(
      params => {
        this.id = +params['id'];
        this.postService.getPost(this.id).subscribe(
        response => {
          if(response.status == 'success'){
            this.video = response.post;
            this.status = response.status;
          }else{
            this.status = response.status           
            // this.router.navigate([this.previousRouter.getPreviousUrl()]);
            this.router.navigate(['/']);
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

  getDate(day){
    const event = new Date(day);
    const options = { weekday: 'long', month: 'long', day: 'numeric' };
    day = event.toLocaleDateString(undefined, options);  
      
    return day;
  }

  getVideoIframe(url) {

    var video, results;
    if (url === null) {
        return '';
    }
    results = url.match('[\\?&]v=([^&#]*)');
    video   = (results === null) ? url : results[1];
 
    return this.sanitizer.bypassSecurityTrustResourceUrl('https://www.youtube.com/embed/' + video);   
  }
}
