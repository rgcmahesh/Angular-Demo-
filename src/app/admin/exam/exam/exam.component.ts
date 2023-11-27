import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { NgToastService } from 'ng-angular-popup';
import { AdminService } from '../../admin.service'
import { NgxSpinnerService } from "ngx-spinner";  

@Component({
  selector: 'app-exam',
  templateUrl: './exam.component.html',
  styleUrls: ['./exam.component.scss']
})
export class ExamComponent implements OnInit {

  public loading = false;
  public errors: any;
  public exams: any;

  constructor(
    private formBuilder: FormBuilder,
     private router: Router,
     private toast: NgToastService,
     private adminService:AdminService,
     private SpinnerService: NgxSpinnerService
     ) {
  }

  ngOnInit(): void {
    this.getExams();    
   }

   getExams() {
    this.loading = true;
    this.adminService.getAllExams()
    .subscribe({
      next: resp => {
        this.exams = resp;
        console.log(this.exams[0]);
      }, 
      error: err => {
        this.loading = false;
        this.toast.error({detail:"ERROR",summary: err?.error.message, sticky:true});
        this.errors = err?.error.message;  
        console.log(this.errors);
      }
    });
  }

  examDelete(id: any) {
    this.loading = true;
    this.adminService.deleteExam(id)
    .subscribe({
        next: resp => {
          // if (resp) {
            console.log(resp)
              this.loading = false;
              this.toast.success({detail:"SUCCESS",summary:'Exam Deleted Successfully', duration:3000});
              this.getExams();
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
