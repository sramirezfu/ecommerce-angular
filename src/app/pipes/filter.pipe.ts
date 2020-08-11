import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {

  transform(value: any, text: string): any  {

    if(!text){
      return value;
    }
    
    return value.filter(post => post.title.toUpperCase().includes(text.toUpperCase()));
    
    // const resultPost = [];   
    // for(let post of value){
    //   if(post.title.toLowerCase().indexOf(arg) > -1 ){
    //     resultPost.push(post);
    //   };
    // };

    // return resultPost;
  }

}
