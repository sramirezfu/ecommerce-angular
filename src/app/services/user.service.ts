import { Injectable } from '@angular/core';
import { HttpClient,  HttpHeaders} from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { global } from './global';


@Injectable()

export class UserService{
    
    public url;
    public identity;
    public token;

    constructor(public http:HttpClient,
                public router:Router)
                {
                    this.url =  global.url;
                }
    
    register(user):Observable<any>{
        let json = JSON.stringify(user);
        let params = 'json='+json;
        let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');

        return this.http.post(this.url + 'register', params, {headers:headers});
    }

    login(user, getToken = null):Observable<any>{
        
        if(getToken){
            user.getToken = true;
        }        
        let json = JSON.stringify(user);
        let params = 'json='+json;       
        let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');

        return this.http.post(this.url + 'login', params, {headers:headers});
    }

    update(token, user):Observable<any>{
        let json = JSON.stringify(user);
        let params = 'json='+json; 
        let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')
                                       .set('Authorization', token); 

        return this.http.put(this.url + 'update', params, {headers:headers});
    }

    getUser(id):Observable<any>{
        let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');

        return this.http.get(this.url + 'user/' + id, {headers:headers});
    }

    getProductsByUser(id, page):Observable<any>{
        if(!page){
            page = 1;
        }
        let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');

        return this.http.get(this.url + 'user/products/' + id + '?page=' + page, {headers:headers});
    }

    getPostsByUser(id, page):Observable<any>{
        
        let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');

        return this.http.get(this.url + 'user/posts/' + id + '?page=' + page, {headers:headers});
    }
    
    getToken(){
        let token = localStorage.getItem('token');
        if(token){
            this.token = token;
        }else{
            this.token = null;
        }
        return this.token;
    }

    getIdentity(){
        let identity = JSON.parse(localStorage.getItem('identity'));
        if(identity){
            this.identity = identity;
        }else{
            this.identity = null;
        }

        return this.identity;
    }
}