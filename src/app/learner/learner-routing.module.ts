import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DefaultComponent} from '../../app/layouts/default/default.component'
import { MainComponent } from '../layouts/main/main.component';
import { LearnerComponent } from '../learner/learner.component'
import { LearnerExamComponent } from '../learner/exams/learner-exam/learner-exam.component'


const routes: Routes = [
  {
    path: '',
    component: DefaultComponent,
    children: [
      {
        path: '',
        component: LearnerComponent,
      },
      {
        path: 'exam/:id',
        component: LearnerExamComponent
      }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LearnerRoutingModule { }
