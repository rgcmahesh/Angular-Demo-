import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { NgToastService } from 'ng-angular-popup';
import { AdminService } from '../../admin.service'
import { NgxSpinnerService } from "ngx-spinner";  

@Component({
  selector: 'app-course',
  templateUrl: './course.component.html',
  styleUrls: ['./course.component.scss']
})
export class CourseComponent implements OnInit {

  public loading = false;
  public errors: any;
  public courses: any;

  constructor(
    private formBuilder: FormBuilder,
     private router: Router,
     private toast: NgToastService,
     private adminService:AdminService,
     private SpinnerService: NgxSpinnerService
     ) {
  }

  ngOnInit(): void {
    this.getAllCourse();    
   }

   getAllCourse() {
    this.loading = true;
    this.adminService.getAllCourses()
    .subscribe({
      next: resp => {
        this.courses = resp;
        console.log(this.courses);
      }, 
      error: err => {
        this.loading = false;
        this.toast.error({detail:"ERROR",summary: err?.error.message, sticky:true});
        this.errors = err?.error.message;  
        console.log(this.errors);
      }
    });
  }

  courseDelete(id: any) {
    this.loading = true;
    this.adminService.deleteCourse(id)
    .subscribe({
        next: resp => {
          // if (resp) {
            console.log(resp)
              this.loading = false;
              this.toast.success({detail:"SUCCESS",summary:'Course Deleted Successfully', duration:3000});
              this.getAllCourse();
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
