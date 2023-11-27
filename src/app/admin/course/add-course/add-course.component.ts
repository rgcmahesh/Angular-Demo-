import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { AdminService } from '../../admin.service'
import { NgToastService } from 'ng-angular-popup';

@Component({
  selector: 'app-add-course',
  templateUrl: './add-course.component.html',
  styleUrls: ['./add-course.component.scss']
})
export class AddCourseComponent implements OnInit {

  public courseForm: FormGroup = this.formBuilder.group({
    courseName: ["", [Validators.required]],
    description: ["", [Validators.required]]
  });
  
  public isInitialized = false;
  public submitted = false;
  public loading = false;
  public errors: any;
  courseObj:any ;
  
  get formControl() {
    return this.courseForm.controls;
  }

  constructor(
    private formBuilder: FormBuilder,
     private router: Router,
     private adminService: AdminService,
     private toast: NgToastService
     ) {
  }

  ngOnInit(): void {
    this.isInitialized = true;
  }

  onSubmit(): void {
    this.submitted = true;
    if (this.courseForm.valid) {
      this.loading = true;
      this.adminService.addCourse(this.courseForm.value.courseName, this.courseForm.value.description)
      .subscribe({
          next: resp => {
            if (resp) {
                this.loading = false;
                this.toast.success({detail:"SUCCESS",summary:'Course Added Successfully', duration:3000});
                this.router.navigate(['/admin/course/']);
            } 
          }, 
          error: err => {
            this.loading = false;
            this.toast.error({detail:"ERROR",summary: err?.error.message, sticky:true});
            console.log(this.errors);
          }
      });
    }
  }

}