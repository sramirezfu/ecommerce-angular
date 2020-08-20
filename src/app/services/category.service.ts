import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { global } from './global';

@Injectable()

export class CategoryService {

    public url;
    public objectList;

    constructor(public http:HttpClient){
        this.url = global.url;
        this.objectList = new Array<any>();
    }

    getCategories():Observable<any>{
        let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');

        return this.http.get(this.url + 'get/categories', {headers:headers});
    }

    getPostsByCategory(id, page):Observable<any>{
        let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');

        return this.http.get(this.url + 'category/posts/' + id + '?page=' + page, {headers:headers});
    }

    getProductsByCategory(id, page):Observable<any>{
    
        let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');

        return this.http.get(this.url + 'category/products/' + id + '?=page' + page, {headers:headers});
    }
}