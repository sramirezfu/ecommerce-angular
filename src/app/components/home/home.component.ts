import { Component, OnInit, DoCheck } from '@angular/core';
import { Router } from '@angular/router';
import { CategoryService } from '../../services/category.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, DoCheck {
  
  public categories;
  public category;
  public letter;
  public invalido;
  constructor(public categoryService:CategoryService,
              public router:Router)
             {
                this.category = 0;
             }

  ngOnInit(): void {
    this.getCategories();
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

}
