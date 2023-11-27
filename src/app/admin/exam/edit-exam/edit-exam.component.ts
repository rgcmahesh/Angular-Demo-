import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router, ActivatedRoute } from "@angular/router";
import { AdminService } from '../../admin.service'
import { NgToastService } from 'ng-angular-popup';

@Component({
  selector: 'app-edit-exam',
  templateUrl: './edit-exam.component.html',
  styleUrls: ['./edit-exam.component.scss']
})
export class EditExamComponent implements OnInit {

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
  id: any;
  exam?:  any;
  
  get formControl() {
    return this.examForm.controls;
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
    this.id = this.route.snapshot.paramMap.get('id');
    this.getExam();
    this.getAllCourses();
    this.user = localStorage.getItem('currentUser');
    this.isInitialized = true;
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

  toReactiveForm(exam: any) {
    this.formControl.examName.setValue(exam.examName);
    this.formControl.durationMinutes.setValue(exam.durationMinutes);
  }

  getExam() {
    this.loading = true;
    this.adminService.getExam(this.id)
    .subscribe({
      next: resp => {
        console.log(resp)
        this.exam = resp;
        this.toReactiveForm(this.exam);
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
    console.log(JSON.parse(this.user).data.userId);
    if (this.examForm.valid) {
      this.loading = true;
      this.adminService.editExam(JSON.parse(this.user).data.userId, this.examForm.value.courseId, this.examForm.value.examName, this.examForm.value.durationMinutes, this.id)
      .subscribe({
          next: resp => {
            if (resp) {
                this.loading = false;
                this.toast.success({detail:"SUCCESS",summary:'Exam Updated Successfully', duration:3000});
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
