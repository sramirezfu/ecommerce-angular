import { Injectable, Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterCategory'
})

@Injectable()
export class FilterCategoryPipe implements PipeTransform {

  transform(posts: any, param: any ): any {
    
    let id = Number(param);
    if(id == 0){
      return posts;
    }
    const resultPost = [];    
    for(let post of posts){
      if(post.category.id === id){
        resultPost.push(post);
      };
    };

    return resultPost;
  }

}
