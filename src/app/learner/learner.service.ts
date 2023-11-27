import { Injectable } from '@angular/core';
import {Router} from '@angular/router'
import { map } from 'rxjs/operators'
import {HttpClient} from '@angular/common/http'
import { AppHttpService } from '../shared/service/app-http.service'

@Injectable({
  providedIn: 'root'
})
export class LearnerService {

  constructor(
    private httpService: AppHttpService,
    private http: HttpClient
  ) { }

  getQuestionJson(){
    return this.http.get<any>("assets/questions.json");
  }

  getAllUsers() {
    const url = this.httpService.getApiurl('users');
    return this.httpService.getService(url)
    .pipe(
      map(resp => {
      })
    );
  }

  getAllExams() {
    const url = this.httpService.getApiurl('exams');
    return this.httpService.getService(url)
    .pipe(
      map(resp => {
        if (resp) {
           return resp;
        }
        throw new Error ('Invalid response');
      })
    );
  }

  getExamQuestions(id: any) {
    const url = this.httpService.getApiurl('show-exam', [id]);
    return this.httpService.getService(url).pipe(
      map(resp => {
        if (resp) {
          const questions =  this.convertQuestions(resp.questions);
          const exam = resp;
          return {resp, questions};
        } 
        throw new Error ('Invalid response');
      })
    );;
  }

  convertQuestions(questions: any) {
    const questionsList = [];
      for (const question of questions) {
        const questionItem = {
          questionText: question.questionText,
          options: [
            { text: question.option1, correct: question.answer === 1},
            { text: question.option2, correct: question.answer === 2},
            { text: question.option3, correct: question.answer === 3},
            { text: question.option4, correct: question.answer === 4 }
          ]
        };
        questionsList.push(questionItem);
      }
      return questionsList;
  }

  addExamResult(examResult: any) {
    const url = this.httpService.getApiurl('exam-result');
    return this.httpService.postService(url, examResult).pipe(
      map(resp => {
        if (resp) {
          return resp;
        } 
        throw new Error ('Invalid response');
      })
    );
  }

  getResult(userId: any, examId:any) {
    const url = this.httpService.getApiurl('result', [userId, examId]);
    return this.httpService.getService(url).pipe(
      map(resp => {
          return resp;
      })
    );;
  }
}
