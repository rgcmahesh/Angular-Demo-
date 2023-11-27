import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../service/auth.service';
import { NgToastService } from 'ng-angular-popup';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard {

  constructor(private authService: AuthService, private router: Router,  private toast: NgToastService) { }
  canActivate(): boolean {
    if (!this.authService.isLoggedIn()) {
      this.toast.error({detail:"ERROR",summary: "Please Login First", sticky:true});
      this.router.navigate(['/sign_in']);
      return false;
    }

    return true;
  }
}