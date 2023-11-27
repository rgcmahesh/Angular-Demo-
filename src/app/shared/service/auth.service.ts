import { Injectable } from '@angular/core';
import {Router} from '@angular/router'
import { map } from 'rxjs/operators'
import { AppHttpService } from './app-http.service'
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  public redirectUrl: string = '';
  constructor(
    private httpService: AppHttpService,
    private router: Router
  ) { }

  isLoggedIn() {
    const user : any = localStorage.getItem('currentUser');
     return user && 'access_token' in JSON.parse(user);
  }

  getUserRole(){
    const user : any = localStorage.getItem('currentUser');
    return JSON.parse(atob(JSON.parse(user).access_token.split('.')[1])).role;
  }

  login(email: string, password: string) {
  
    const url = this.httpService.getApiurl('login');
    const loginData = {
      email,
      password
    }

    return this.httpService.postService(url, loginData)
    .pipe(
      map(resp => {
        if (resp.access_token) {
          this.redirectUrl = resp.home;
          const user : any = localStorage.getItem('currentUser');
          localStorage.setItem('dashboardUrl', resp.home);
          localStorage.setItem('currentUser', JSON.stringify(resp));
          return { status: 'LoggedIn'};
        } 
         throw new Error ('Invalid response');
      })
    );
  }

  register(firstName:any, lastName:any,  email: any, password: any) {
    const url = this.httpService.getApiurl('register');
    const registerData = {
      firstName,
      lastName,
      userName: firstName+ ' ' +lastName,
      password,
      role: "learner",
      token: "",
      deviceToken: "",
      email
    }

    return this.httpService.postService(url, registerData).pipe(
      map(resp => {
        if (resp) {
          return resp;
        } 
        throw new Error ('Invalid response');
      })
    );
  }
}
