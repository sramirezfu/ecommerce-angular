import { Injectable } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';

@Injectable()

export class PreviousRouteService {

    public previousUrl:string;
    public currentUrl:string;

    constructor(public router:Router){
        this.currentUrl = this.router.url;
        router.events.subscribe(event => {
          if (event instanceof NavigationEnd) {        
            this.previousUrl = this.currentUrl;
            this.currentUrl = event.url;
          };
        });
    }

    public getPreviousUrl() {
        return this.previousUrl;
    }   
}