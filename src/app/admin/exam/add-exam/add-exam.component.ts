import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { AdminService } from '../../admin.service'
import { NgToastService } from 'ng-angular-popup';

@Component({
  selector: 'app-add-exam',
  templateUrl: './add-exam.component.html',
  styleUrls: ['./add-exam.component.scss']
})
export class AddExamComponent implements OnInit {

  public examForm: FormGroup = this.formBuilder.group({
    courseId: ["", [Validators.required]],
    examName: ["", [Validators.required]],
    durationMinutes: ["", [Validators.required]]
  });
  
  public isInitialized = false;
  public submitted = false;
  public loading = false;
  public errors: any;
  examObj:any ;
  courses: any;
  user: any;
  
  get formControl() {
    return this.examForm.controls;
  }

  constructor(
    private formBuilder: FormBuilder,
     private router: Router,
     private adminService: AdminService,
     private toast: NgToastService
     ) {
  }

  ngOnInit(): void {
    this.getAllCourses();
    this.isInitialized = true;
    this.user = localStorage.getItem('currentUser');
  }

  getAllCourses() {
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

  onSubmit(): void {
    console.log(this.examForm)
    this.submitted = true;
    if (this.examForm.valid) {
      this.loading = true;
      this.adminService.addExam(JSON.parse(this.user).data.userId, this.examForm.value.courseId, this.examForm.value.examName, this.examForm.value.durationMinutes)
      .subscribe({
          next: resp => {
            if (resp) {
                this.loading = false;
                this.toast.success({detail:"SUCCESS",summary:'Exam Added Successfully', duration:3000});
                this.router.navigate(['/admin/exam/']);
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
