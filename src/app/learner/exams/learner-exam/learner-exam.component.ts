import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from "@angular/router";
import { interval } from 'rxjs';
import { NgToastService } from 'ng-angular-popup';
import { LearnerService } from '../../learner.service'

@Component({
  selector: 'app-learner-exam',
  templateUrl: './learner-exam.component.html',
  styleUrls: ['./learner-exam.component.scss']
})
export class LearnerExamComponent implements OnInit {

  id: any;
  public name: string = "";
  public questionList: any = [];
  public currentQuestion: number = 0;
  public points: number = 0;
  counter = 60;
  correctAnswer: number = 0;
  inCorrectAnswer: number = 0;
  interval$: any;
  progress: string = "0";
  isQuizCompleted : boolean = false;
  exam: any;
  loading = true;
  isResultLoading = true;
  errors: any;
  userId: any;
  result: any;
  isExamCompleted =false;
  public score: number = 0;

  constructor(
    private learnerService: LearnerService,
    private router: Router,
    private route: ActivatedRoute,
    private toast: NgToastService) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id');
    const currentUser : any = localStorage.getItem('currentUser');
    const user = JSON.parse(currentUser);
    this.userId = user.data.userId;
    this.name = localStorage.getItem("name")!;
    this.getResult();
    this.startCounter();   
  }

  getAllQuestions() {
    this.learnerService.getExamQuestions(this.id)
      .subscribe(res => {
        console.log(res.questions)
        this.questionList = res.questions;
        this.exam = res.resp;
        this.counter = this.exam.durationMinutes;
      })
  }

  nextQuestion() {
    this.currentQuestion++;
  }

  previousQuestion() {
    this.currentQuestion--;
  }

  answer(currentQno: number, option: any) {
    this.loading = false;
    if(currentQno === this.questionList.length){
      this.isResultLoading = false;
      this.isQuizCompleted = true;
      this.stopCounter();
      setTimeout(() => { 
        this.score = this.correctAnswer > 0 ? (this.correctAnswer/this.questionList.length)* 100  : 0;
        this.saveResult();
        this.isResultLoading = true;
      }, 3000);
    }
    if (option.correct) {
      this.points += 10;
      this.correctAnswer++;
      setTimeout(() => {
        this.currentQuestion++;
        this.resetCounter();
        this.getProgressPercent();
        this.loading = true;
      }, 1000);


    } else {
      setTimeout(() => {
        this.currentQuestion++;
        this.inCorrectAnswer++;
        this.resetCounter();
        this.getProgressPercent();
        this.loading = true;
      }, 1000);

      this.points -= 10;
    }
  }

  startCounter() {
    // this.interval$ = interval(1000)
    //   .subscribe(val => {
    //     this.counter--;
    //     if (this.counter === 0) {
    //       this.currentQuestion++;
    //       this.counter = this.exam.durationMinutes;
    //       this.points -= 10;
    //     }
    //   });
    // setTimeout(() => {
    //   this.interval$.unsubscribe();
    // }, 600000);

    this.interval$ = interval(1000)
    .subscribe(val => {
      this.counter--;
      if (this.counter === 0) {
        // this.currentQuestion++;
        // this.counter = this.exam.durationMinutes;
        // this.points -= 10;
        this.stopCounter();
      }
    });
  // setTimeout(() => {
  //   this.interval$.unsubscribe();
  // }, 600000);
  }

  stopCounter() {
    this.interval$.unsubscribe();
    this.counter = 0;
  }

  resetCounter() {
    this.stopCounter();
    this.counter = this.exam.durationMinutes
    this.startCounter();
  }

  resetQuiz() {
    this.resetCounter();
    this.getAllQuestions();
    this.points = 0;
    this.counter = this.exam.durationMinutes
    this.currentQuestion = 0;
    this.progress = "0";

  }

  getProgressPercent() {
    this.progress = ((this.currentQuestion / this.questionList.length) * 100).toString();
    return this.progress;
  }

  getResult() {
    this.learnerService.getResult(this.userId, this.id)
    .subscribe(res => {
      if (res.length == 0) {
        this.getAllQuestions();
      } else {
        this.result = res[0];
        this.isExamCompleted = true;
      }
    })
  }

saveResult() {
    const examResult = {
      userId: this.userId,
      examId: this.exam.examId,
      score: this.score
    }

    this.learnerService.addExamResult(examResult)
    .subscribe({
        next: resp => {
          this.isResultLoading = true;
              this.toast.success({detail:"SUCCESS",summary:'Exam Submitted Successfully', duration:3000});
        }, 
        error: err => {
          this.isResultLoading = true;
          this.toast.error({detail:"ERROR",summary: err?.error.message, sticky:true});
          console.log(this.errors);
        }
    })
  }

}
