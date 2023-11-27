import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router, ActivatedRoute } from "@angular/router";
import { AdminService } from '../../admin.service'
import { NgToastService } from 'ng-angular-popup';

@Component({
  selector: 'app-edit-course',
  templateUrl: './edit-course.component.html',
  styleUrls: ['./edit-course.component.scss']
})
export class EditCourseComponent implements OnInit {

  public courseForm: FormGroup = this.formBuilder.group({
    courseName: ["", [Validators.required]],
    description: ["", [Validators.required]]
  });
  
  public isInitialized = false;
  public submitted = false;
  public loading = false;
  public errors: any;
  courseObj:any ;
  course: any;
  id: any;
  
  get formControl() {
    return this.courseForm.controls;
  }

  constructor(
    private formBuilder: FormBuilder,
     private router: Router,
     private route: ActivatedRoute,
     private adminService: AdminService,
     private toast: NgToastService
     ) {
  }

  ngOnInit(): void {
    this.isInitialized = true;
    this.id = this.route.snapshot.paramMap.get('id');
    this.getCourse();
  }

  toReactiveForm(course: any) {
    this.formControl.courseName.setValue(course.courseName);
    this.formControl.description.setValue(course.description);
  }

  getCourse() {
    this.loading = true;
    this.adminService.getCourse(this.id)
    .subscribe({
      next: resp => {
        console.log(resp)
        this.course = resp;
        this.toReactiveForm(this.course);
      }, 
      error: err => {
        this.loading = false;
        this.toast.error({detail:"ERROR",summary: err?.error.message, sticky:true});
        this.errors = err?.error.message;  
        console.log(this.errors);
      }
    });
  }

  onSubmit(): void {
    this.submitted = true;
    if (this.courseForm.valid) {
      this.loading = true;
      this.adminService.editCourse(this.courseForm.value.courseName, this.courseForm.value.description, this.id)
      .subscribe({
          next: resp => {
            if (resp) {
                this.loading = false;
                this.toast.success({detail:"SUCCESS",summary:'Course Updated Successfully', duration:3000});
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
