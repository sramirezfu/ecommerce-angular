import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { global } from './global';

@Injectable()

export class ProductService {
 
    public url;

    constructor(public http:HttpClient){
        this.url = global.url;
    }

    create(token, product):Observable<any>{
        let json = JSON.stringify(product);
        let params = 'json=' + json;
        let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')
                                       .set('Authorization' , token);

        return this.http.post(this.url + 'create/product', params, {headers:headers});
    }

    update(token, product, id):Observable<any>{

        let json = JSON.stringify(product);
        let params = 'json=' + json;
        let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')
                                       .set('Authorization', token);

        return this.http.put(this.url + 'update/product/' + id, params, {headers:headers});
    }
    
    delete(token, id):Observable<any>{
        
        let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')
                                       .set('Authorization' , token);

        return this.http.delete(this.url + 'delete/product/' + id, {headers:headers});
    }

    getProduct(id):Observable<any>{
        
        let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');

        return this.http.get(this.url + 'get/product/' + id, {headers:headers});
    }
    
    getProducts(page, type):Observable<any>{
        
        let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');

        return this.http.get(this.url + 'get/products' + '?page=' + page + '&type=' + type, {headers:headers});
    }
    
    searchproduct(product, page):Observable<any>{
        
        let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');

        return this.http.get(this.url + 'search/product/' + product + '?page=' + page, {headers:headers});
    }
}