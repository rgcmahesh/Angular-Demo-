import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable, catchError } from 'rxjs';
import { NgToastService } from 'ng-angular-popup';
import { Router } from "@angular/router";

@Injectable()
export class HttpInterceptorService implements HttpInterceptor {

  constructor(private toast: NgToastService, private router: Router) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    const user: any = localStorage.getItem('currentUser');
    const currentUser = JSON.parse(user);
    //set request header with token if avaible 
    const clonedReq = this.setRequestHeader(request, currentUser);
    return next.handle(clonedReq).pipe(
      catchError((err: any)=>{
        if(err instanceof HttpErrorResponse){
          if(err.status === 401){
            localStorage.clear();
            this.toast.error({detail:"ERROR",summary: "Token is expired, Please Login again", sticky:true});
            this.router.navigate(['sign_in'])
            //handle
            //return this.handleUnAuthorizedError(request,next);
          }
          if(err.status === 404){
            localStorage.clear();
            this.toast.error({detail:"ERROR",summary: "Page Not Found", sticky:true});
            this.router.navigate(['page-not-found'])
            //handle
            //return this.handleUnAuthorizedError(request,next);
          }
        }
        throw err;
      })
    );
  }

  setRequestHeader(request: HttpRequest<any>, currentUser: any) {
    let clone: HttpRequest<any>;
    
    if (currentUser && Object.prototype.toString.call(currentUser) === '[object Object]' && currentUser.access_token) {
      clone = request.clone ({
        setHeaders: {
          //'Content-Type': `application/json`,
          Authorization: `Bearer ${currentUser.access_token}`
        }
      });
      return clone;
    } else {
      request.headers.append('Content-Type', `application/json`);
    }
     return request;
  }
}
