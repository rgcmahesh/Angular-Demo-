import { Injectable } from '@angular/core';
import { Router, ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs'
import { AuthService } from '../service/auth.service';
import { NgToastService } from 'ng-angular-popup';

@Injectable({
  providedIn: 'root'
})
export class hasRoleGuard  {

  constructor(
    private authService: AuthService, 
    private router: Router,  
    private toast: NgToastService) { }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot):
  | Observable<boolean | UrlTree> 
  | Promise <boolean | UrlTree>
  | boolean
  | UrlTree {

    const isAuthorized = (this.authService.getUserRole() == route.data.role) || (this.authService.getUserRole() == 'faculty');

    if (!isAuthorized) {
      this.toast.error({detail:"ERROR",summary: "Unauthorized Action", sticky:true});
      this.router.navigate(['/']);
      return false;

    }

    return isAuthorized;
  }
}