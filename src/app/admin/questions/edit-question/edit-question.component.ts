import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from "@angular/router";
import { FormArray } from '@angular/forms';
import { AdminService } from '../../admin.service'
import { NgToastService } from 'ng-angular-popup';

@Component({
  selector: 'app-edit-question',
  templateUrl: './edit-question.component.html',
  styleUrls: ['./edit-question.component.scss']
})
export class EditQuestionComponent implements OnInit {
  questionForm: FormGroup;
  submitted = false;
  isInitialized = false;
  loading = false;
  exams: any;
  errors: any;
  question: any;
  id: any;

  constructor(private fb: FormBuilder,    
    private formBuilder: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
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
    this.id = this.route.snapshot.paramMap.get('id');
    this.getAllExamss();
    this.isInitialized = true;
    this.getQuestion();
    //this.user = localStorage.getItem('currentUser');
  }

  get formControl() {
    return this.questionForm.controls;
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

  toReactiveForm(question: any) {
    // this.formControl.question.setValue(question.questionText);
    // this.formControl.examId.setValue(question.examId);
    // this.formControl.answer.setValue(question.answer);

    // this.questionForm.setValue({
    //   question: 'rtghrtgregt',
    // //  options: [...this.formControl.options],
    // });

    this.questionForm.patchValue({
      question: this.question.questionText,
      examId: this.question.examId,
      option1: this.question.option1,
      option2: this.question.option2,
      option3: this.question.option3,
      option4: this.question.option4,
      answer: this.question.answer
    });

      // Update options individually
    // Update options individually
    const optionsArray = this.questionForm.get('options') as FormArray;
    optionsArray.controls.forEach((control, index) => {
      const optionKey = `option${index + 1}`;
      control.patchValue(this.question[optionKey]);
    });
  }

  getQuestion() {
    this.loading = true;
    this.adminService.getQuestion(this.id)
    .subscribe({
      next: resp => {
        console.log(resp)
        this.question = resp;
        this.toReactiveForm(this.question);
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
      this.adminService.editQuestion(questionData, this.id)
      .subscribe({
          next: resp => {
            if (resp) {
                this.loading = false;
                this.toast.success({detail:"SUCCESS",summary:'Question Updated Successfully', duration:3000});
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