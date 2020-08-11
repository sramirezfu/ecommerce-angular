import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterProduct'
})
export class FilterProductPipe implements PipeTransform {

  transform(value: any, text: any): any {
    if(!text){
      return value;
    }
    
    return value.filter(product => product.name.toUpperCase().includes(text.toUpperCase()));
  }

}
