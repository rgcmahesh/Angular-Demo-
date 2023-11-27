import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainComponent } from '../layouts/main/main.component';
import { AdminComponent } from '../admin/admin.component';
import { StudentComponent } from './students/student/student.component';
import { AddStudentComponent } from './students/add-student/add-student.component';
import { FacultyComponent } from './faculties/faculty/faculty.component';
import { AddFacultyComponent } from './faculties/add-faculty/add-faculty.component';
import { EditFacultyComponent } from './faculties/edit-faculty/edit-faculty.component';
import { EditStudentComponent } from './students/edit-student/edit-student.component';
import { CourseComponent } from './course/course/course.component';
import { AddCourseComponent } from './course/add-course/add-course.component';
import { EditCourseComponent } from './course/edit-course/edit-course.component';
import { ExamComponent } from './exam/exam/exam.component';
import { AddExamComponent } from './exam/add-exam/add-exam.component';
import { EditExamComponent } from './exam/edit-exam/edit-exam.component';
import { QuestionComponent } from './questions/question/question.component';
import { AddQuestionComponent } from './questions/add-question/add-question.component';
import { EditQuestionComponent } from './questions/edit-question/edit-question.component';

const routes: Routes = [
  {
    path: '',
    component: MainComponent,
    children: [
      {
        path: '',
        component: AdminComponent,
      },
      {
        path: 'course',
        component: CourseComponent,
      },
      {
        path: 'course/create',
        component: AddCourseComponent,
      },
      {
        path: 'course/edit/:id',
        component: EditCourseComponent,
      },
      {
        path: 'student',
        component: StudentComponent,
      },
      {
        path: 'student/create',
        component: AddStudentComponent,
      },
      {
        path: 'student/edit/:id',
        component: EditStudentComponent,
      },
      {
        path: 'faculty',
        component: FacultyComponent,
      },
      {
        path: 'faculty/create',
        component: AddFacultyComponent,
      },
      {
        path: 'faculty/edit/:id',
        component: EditFacultyComponent,
      },
      {
        path: 'exam',
        component: ExamComponent,
      },
      {
        path: 'exam/create',
        component: AddExamComponent,
      },
      {
        path: 'exam/edit/:id',
        component: EditExamComponent,
      },
      {
        path: 'question',
        component: QuestionComponent,
      },
      {
        path: 'question/create',
        component: AddQuestionComponent,
      },
      {
        path: 'question/edit/:id',
        component: EditQuestionComponent,
      },
    ]
  },
];

export const routeComponents = [
  MainComponent,
  AdminComponent,
  StudentComponent,
  AddStudentComponent,
  FacultyComponent,
  AddFacultyComponent,
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
  EditQuestionComponent
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
