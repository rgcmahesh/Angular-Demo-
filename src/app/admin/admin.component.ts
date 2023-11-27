import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { NgToastService } from 'ng-angular-popup';
import { AdminService } from './admin.service'

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {

  public loading = false;
  public errors: any;
  public dashboard: any;

  constructor(
    private formBuilder: FormBuilder,
     private router: Router,
     private toast: NgToastService,
     private adminService:AdminService
     ) {
  }

  ngOnInit(): void {
    this.getAdminDashboard();
   }

  getAdminDashboard() {
    this.loading = true;
    this.adminService.getAdminDashboard()
    .subscribe({
      next: resp => {
        this.dashboard = resp;
        console.log(this.dashboard);
      }, 
      error: err => {
        this.loading = false;
        this.toast.error({detail:"ERROR",summary: err?.error.message, sticky:true});
        this.errors = err?.error.message;
        console.log(this.errors);
      }
    });
  }

}
