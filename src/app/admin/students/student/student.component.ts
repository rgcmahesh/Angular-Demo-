import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { NgToastService } from 'ng-angular-popup';
import { AdminService } from '../../admin.service'
import { NgxSpinnerService } from "ngx-spinner";  

@Component({
  selector: 'app-student',
  templateUrl: './student.component.html',
  styleUrls: ['./student.component.scss']
})
export class StudentComponent implements OnInit {

  public loading = false;
  public errors: any;
  public users: any;

  constructor(
    private formBuilder: FormBuilder,
     private router: Router,
     private toast: NgToastService,
     private adminService:AdminService,
     private SpinnerService: NgxSpinnerService
     ) {
  }

  ngOnInit(): void {
    this.getAllUsers();    
   }

  getAllUsers() {
    this.loading = true;
    this.adminService.getAllStudents()
    .subscribe({
      next: resp => {
        this.users = resp;
        console.log(this.users);
      }, 
      error: err => {
        this.loading = false;
        this.toast.error({detail:"ERROR",summary: err?.error.message, sticky:true});
        this.errors = err?.error.message;  
        console.log(this.errors);
      }
    });
  }

  studentDelete(id: any) {
    this.loading = true;
    this.adminService.deleteUser(id)
    .subscribe({
        next: resp => {
          // if (resp) {
            console.log(resp)
              this.loading = false;
              this.toast.success({detail:"SUCCESS",summary:'Student Deleted Successfully', duration:3000});
              this.getAllUsers();
          // } 
        }, 
        error: err => {
          this.loading = false;
          this.toast.error({detail:"ERROR",summary: err?.error.message, sticky:true});
          console.log(this.errors);
        }
    });
  }

}
