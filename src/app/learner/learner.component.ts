import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { NgToastService } from 'ng-angular-popup';
import { LearnerService } from './learner.service'

@Component({
  selector: 'app-learner',
  templateUrl: './learner.component.html',
  styleUrls: ['./learner.component.scss']
})
export class LearnerComponent implements OnInit {

  public loading = false;
  public errors: any;
  public exams: any;

  constructor(
    private formBuilder: FormBuilder,
     private router: Router,
     private toast: NgToastService,
     private learnerService:LearnerService
     ) {
  }

  ngOnInit(): void {
   this.getExams();
  }

getExams() {
    this.loading = true;
    this.learnerService.getAllExams()
    .subscribe({
      next: resp => {
        this.exams = resp;
        console.log(this.exams);
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
