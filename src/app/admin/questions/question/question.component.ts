import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { NgToastService } from 'ng-angular-popup';
import { AdminService } from '../../admin.service'
import { NgxSpinnerService } from "ngx-spinner";  

@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.scss']
})
export class QuestionComponent implements OnInit {

  public loading = false;
  public errors: any;
  public questions: any;

  constructor(
    private formBuilder: FormBuilder,
     private router: Router,
     private toast: NgToastService,
     private adminService:AdminService,
     private SpinnerService: NgxSpinnerService
     ) {
  }

  ngOnInit(): void {
    this.getAllQuestions();    
   }

  getAllQuestions() {
    this.loading = true;
    this.adminService.getAllQuestions()
    .subscribe({
      next: resp => {
        this.questions = resp;
        console.log(this.questions);
      }, 
      error: err => {
        this.loading = false;
        this.toast.error({detail:"ERROR",summary: err?.error.message, sticky:true});
        this.errors = err?.error.message;  
        console.log(this.errors);
      }
    });
  }

  questionDelete(id: any) {
    this.loading = true;
    this.adminService.deleteQuestion(id)
    .subscribe({
        next: resp => {
            this.loading = false;
            this.toast.success({detail:"SUCCESS",summary:'Question Deleted Successfully', duration:3000});
            this.getAllQuestions();
        }, 
        error: err => {
          this.loading = false;
          this.toast.error({detail:"ERROR",summary: err?.error.message, sticky:true});
          console.log(this.errors);
        }
    });
  }

}
