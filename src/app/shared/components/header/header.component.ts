import { Component } from '@angular/core';
import { Router } from "@angular/router";
import { AuthService } from '../../service/auth.service'

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {

  isLoggedIn: boolean = false;
  isCollapsed = false;
  dashboardUrl:any = '/learner';

  constructor(private authService: AuthService, private router: Router) {
    this.dashboardUrl = localStorage.getItem('dashboardUrl');
    this.isLoggedIn = this.authService.isLoggedIn();
  }

  signOut() {
    localStorage.clear();
    this.isLoggedIn = false;
    this.router.navigateByUrl('/sign_in');
  }
 
}
