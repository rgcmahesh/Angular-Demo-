import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { AdminRoutingModule , routeComponents} from './admin-routing.module';
import { RouterModule } from '@angular/router';
import { CourseComponent } from './course/course/course.component';
import { AddCourseComponent } from './course/add-course/add-course.component';
import { EditCourseComponent } from './course/edit-course/edit-course.component';
import { ExamComponent } from './exam/exam/exam.component';
import { AddExamComponent } from './exam/add-exam/add-exam.component';
import { EditExamComponent } from './exam/edit-exam/edit-exam.component';
import { QuestionComponent } from './questions/question/question.component';
import { AddQuestionComponent } from './questions/add-question/add-question.component';
import { EditQuestionComponent } from './questions/edit-question/edit-question.component';

@NgModule({
  declarations: [
    [...routeComponents

  
    CourseComponent
  
    AddCourseComponent
  
    EditCourseComponent
  
    ExamComponent
  
    AddExamComponent
  
    EditExamComponent
  
    QuestionComponent
  
    AddQuestionComponent
  
    EditQuestionComponent
  ]
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    AdminRoutingModule,
    RouterModule
  ]
})
export class AdminModule { }
