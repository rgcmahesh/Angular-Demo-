import { Component } from '@angular/core';
import { Router } from "@angular/router";
import { AuthService } from '../../service/auth.service'

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent {

  isLoggedIn: boolean = false;
  isCollapsed = false;
  role: any;
  
  constructor (private authService: AuthService, private router: Router) {
    this.role =this.authService.getUserRole();
  }

  signOut() {
    localStorage.clear();
    this.isLoggedIn = false;
    this.router.navigateByUrl('/sign_in');
  }

}
