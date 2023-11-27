import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { NgToastService } from 'ng-angular-popup';
import { AdminService } from '../../admin.service'
import { NgxSpinnerService } from "ngx-spinner";  

@Component({
  selector: 'app-faculty',
  templateUrl: './faculty.component.html',
  styleUrls: ['./faculty.component.scss']
})
export class FacultyComponent implements OnInit {

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
    this.getAllFaculties();
   }

   getAllFaculties() {
    this.loading = true;
    this.SpinnerService.show();  
    this.adminService.getAllFaculties()
    .subscribe({
      next: resp => {
        this.users = resp;
        this.SpinnerService.hide();  
        console.log(this.users);
      }, 
      error: err => {
        this.loading = false;
        this.toast.error({detail:"ERROR",summary: err?.error.message, sticky:true});
        this.errors = err?.error.message;
        this.SpinnerService.hide();  
        console.log(this.errors);
      }
    });
  }

  facultyDelete(id: any) {
    this.loading = true;
    this.adminService.deleteUser(id)
    .subscribe({
        next: resp => {
          // if (resp) {
            console.log(resp)
              this.loading = false;
              this.toast.success({detail:"SUCCESS",summary:'Faculty Deleted Successfully', duration:3000});
              this.getAllFaculties();
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