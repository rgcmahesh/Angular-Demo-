import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FormArray } from '@angular/forms';
import { Router } from "@angular/router";
import { AdminService } from '../../admin.service'
import { NgToastService } from 'ng-angular-popup';


@Component({
  selector: 'app-add-question',
  templateUrl: './add-question.component.html',
  styleUrls: ['./add-question.component.scss']
})
export class AddQuestionComponent implements OnInit {
  questionForm: FormGroup;
  submitted = false;
  isInitialized = false;
  loading = false;
  exams: any;
  public errors: any;

  constructor(private fb: FormBuilder,    
    private formBuilder: FormBuilder,
    private router: Router,
    private adminService: AdminService,
    private toast: NgToastService
    ) {
    this.questionForm = this.fb.group({
      examId: ["",Validators.required],
      question: ['', Validators.required],
      options: this.fb.array(['', '', '', ''], Validators.required),
      answer: ['', Validators.required]
    });

  }

  ngOnInit(): void {
    this.getAllExamss();
    this.isInitialized = true;
    //this.user = localStorage.getItem('currentUser');
  }

  getAllExamss() {
    this.loading = true;
    this.adminService.getAllExams()
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

  isFormArray(control: any): control is FormArray {
    return control instanceof FormArray;
  }

  getOptionsControls(): any[] {
    const options = this.questionForm.get('options');
    return options instanceof FormArray ? options.controls : [];
  }
  submitQuestion() {
    this.submitted = true;
    if (this.questionForm.valid) {
      this.loading = true;
      const questionData:any  = this.questionForm.value;
      questionData['questionText'] = questionData.question;
      for (let i = 0 ; i < questionData.options.length ; i++) {
        questionData['option'+ (i+1)] = questionData.options[i];
      }
      console.log(questionData);
      this.adminService.addQuestion(questionData)
      .subscribe({
          next: resp => {
            if (resp) {
                this.loading = false;
                this.toast.success({detail:"SUCCESS",summary:'Question Added Successfully', duration:3000});
                this.router.navigate(['/admin/question/']);
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
