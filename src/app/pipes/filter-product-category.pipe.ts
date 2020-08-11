import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterProductCategory'
})
export class FilterProductCategoryPipe implements PipeTransform {

  transform(products: any, param: any ): any {
    
    let id = Number(param);
    if(id == 0){
      return products;
    }
    const result = [];    
    for(let product of products){
      if(product.category.id === id){
        result.push(product);
      };
    };

    return result;
  }

}
