import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DefaultComponent} from '../../app/layouts/default/default.component'
import { HomeComponent } from './home/home.component'
import { BarExamComponent } from './bar-exam/bar-exam.component'
import { LlmComponent } from './llm/llm.component'
import { MpreComponent } from './mpre/mpre.component'
import { LwaSchoolComponent } from './lwa-school/lwa-school.component'
import { PassRateComponent } from './pass-rate/pass-rate.component'
import { BlogComponent } from './blog/blog.component'
import { SignInComponent } from '../shared/components/sign-in/sign-in.component'
import { SignUpComponent } from '../shared/components/sign-up/sign-up.component'


const routes: Routes = [
  {
    path: '',
    component: DefaultComponent,
    children: [
      {
        path: '',
        component: HomeComponent,
      },
      {
        path: 'pass-the-bar-exam',
        component: BarExamComponent,
      },
      {
        path: 'llm-bar-review-course',
        component: LlmComponent,
      },
      {
        path: 'mpre',
        component: MpreComponent,
      },
      {
        path: 'law-school-essentials',
        component: LwaSchoolComponent,
      },
      {
        path: 'pass-rates',
        component: PassRateComponent,
      },
      {
        path: 'themis-blog',
        component: BlogComponent,
      },
      {
        path: 'sign_in',
        component: SignInComponent,
      },
      {
        path: 'sign_up',
        component: SignUpComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GuestRoutingModule { }
