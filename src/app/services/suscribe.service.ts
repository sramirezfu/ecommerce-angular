import { Injectable } from '@angular/core';
import { HttpClient,  HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs';
import { global } from './global';

@Injectable()

export class SuscribeService {
    
    public url;

    constructor(public http:HttpClient){
        this.url = global.url;
    }

    suscribe(user):Observable<any>{
        let json = JSON.stringify(user);
        let params = 'json='+json;
        let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');

        return this.http.post(this.url + 'subscribe', params, {headers:headers});
    }
}