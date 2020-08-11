import { Injectable } from '@angular/core';
import { HttpClient,  HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs';
import { global } from './global';

@Injectable()

export class PostService {

    public url;

    constructor(public http:HttpClient){
        this.url = global.url;
    }

    create(token, post):Observable<any>{
        
        let json = JSON.stringify(post);
        let params = 'json='+json;        
        let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')
                                       .set('Authorization', token);

        return this.http.post(this.url + 'create/post', params, {headers:headers});
    }

    update(token, post, id):Observable<any>{
        
        let json = JSON.stringify(post);
        let params = 'json='+json;
        let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')
                                       .set('Authorization', token);

        return this.http.put(this.url + 'update/post/' + id, params, {headers:headers});
    }

    delete(token, id):Observable<any>{
        
        let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')
                                       .set('Authorization', token);;

        return this.http.delete(this.url + 'delete/post/' + id, {headers:headers});
    }

    getPost(id):Observable<any>{
        
        let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');
        
        return this.http.get(this.url + 'get/post/' + id, {headers:headers});
    }

    getPosts(page):Observable<any>{
        
        let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');

        return this.http.get(this.url + 'get/posts' + '?page=' + page, {headers:headers});
    }

}