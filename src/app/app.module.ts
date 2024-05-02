import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http'
import { NgToastModule } from 'ng-angular-popup'
import { NgxSpinnerModule } from "ngx-spinner";  

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DefaultComponent } from './layouts/default/default.component';
import { MainComponent } from './layouts/main/main.component';
import { HomeComponent } from './guest/home/home.component';
import { HeaderComponent } from './shared/components/header/header.component';
import { FooterComponent } from './shared/components/footer/footer.component';
import { SidebarComponent } from './shared/components/sidebar/sidebar.component';
import { BlogComponent } from './guest/blog/blog.component';
import { ThreeChoicePerFooterComponent } from './guest/three-choice-per-footer/three-choice-per-footer.component';
import { PassRateComponent } from './guest/pass-rate/pass-rate.component';
import { BarExamComponent } from './guest/bar-exam/bar-exam.component';
import { LlmComponent } from './guest/llm/llm.component';
import { MpreComponent } from './guest/mpre/mpre.component';
import { LwaSchoolComponent } from './guest/lwa-school/lwa-school.component';
import { SignInComponent } from './shared/components/sign-in/sign-in.component';
import { SignUpComponent } from './shared/components/sign-up/sign-up.component';
import { AppHttpService } from '../app/shared/service/app-http.service'
import { AuthService } from '../app/shared/service/auth.service';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { LearnerComponent } from './learner/learner.component';
import { AdminComponent } from './admin/admin.component'
import { StudentComponent } from './admin/students/student/student.component'
import { HttpInterceptorService } from './shared/service/http.interceptor';
import { FacultyComponent } from './admin/faculties/faculty/faculty.component';
import { AddFacultyComponent } from './admin/faculties/add-faculty/add-faculty.component';
import { AddStudentComponent } from './admin/students/add-student/add-student.component';
import { EditFacultyComponent } from './admin/faculties/edit-faculty/edit-faculty.component';
import { EditStudentComponent } from './admin/students/edit-student/edit-student.component';
import { CourseComponent } from './admin/course/course/course.component';
import { AddCourseComponent } from './admin/course/add-course/add-course.component';
import { EditCourseComponent } from './admin/course/edit-course/edit-course.component';
import { ExamComponent } from './admin/exam/exam/exam.component';
import { AddExamComponent } from './admin/exam/add-exam/add-exam.component';
import { EditExamComponent } from './admin/exam/edit-exam/edit-exam.component';
import { QuestionComponent } from './admin/questions/question/question.component';
import { AddQuestionComponent } from './admin/questions/add-question/add-question.component';
import { EditQuestionComponent } from './admin/questions/edit-question/edit-question.component';
import { LearnerExamComponent } from '../app/learner/exams/learner-exam/learner-exam.component';
import { PagenotfoundComponent } from './shared/components/pagenotfound/pagenotfound.component'

@NgModule({
  declarations: [
    AppComponent,
    DefaultComponent,
    MainComponent,
    HomeComponent,
    HeaderComponent,
    FooterComponent,
    SidebarComponent,
    BlogComponent,
    ThreeChoicePerFooterComponent,
    PassRateComponent,
    BarExamComponent,
    LlmComponent,
    MpreComponent,
    LwaSchoolComponent,
    SignInComponent,
    SignUpComponent,
    LearnerComponent,
    AdminComponent,
    StudentComponent,
    FacultyComponent,
    AddFacultyComponent,
    AddStudentComponent,
    EditFacultyComponent,
    EditStudentComponent,
    CourseComponent,
    AddCourseComponent,
    EditCourseComponent,
    ExamComponent,
    AddExamComponent,
    EditExamComponent,
    QuestionComponent,
    AddQuestionComponent,
    EditQuestionComponent,
    LearnerExamComponent,
    PagenotfoundComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    HttpClientModule,
    FormsModule,
    NgbModule,
    NgToastModule,
    NgxSpinnerModule,
    AppRoutingModule,
  ],
  providers: [
    AuthService,
    AppHttpService,
    {provide: HTTP_INTERCEPTORS, useClass: HttpInterceptorService, multi: true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
