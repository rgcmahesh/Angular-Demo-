import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
// import { SignInComponent } from './shared/components/sign-in/sign-in.component'
// import { SignUpComponent } from './shared/components/sign-up/sign-up.component'
import { AuthGuard } from './shared/guards/auth.guard'
import { hasRoleGuard } from './shared/guards/has-role.guard'
import { PagenotfoundComponent } from './shared/components/pagenotfound/pagenotfound.component';

const routes: Routes = [
  { 
    path: '', redirectTo: '', pathMatch: 'full' 
  },
  {
    path: '',
    // canActivate: [AuthGuard],
    loadChildren: () => import('./guest/guest-routing.module')
    .then(mod => mod.GuestRoutingModule)
  },
  {
    path: 'learner',
    canActivate: [AuthGuard],
    loadChildren: () => import('./learner/learner-routing.module')
    .then(mod => mod.LearnerRoutingModule)
  },
  {
    path: 'admin',
    canActivate: [AuthGuard, hasRoleGuard],
    data: {
      role: 'admin'

    },
    loadChildren: () => import('./admin/admin-routing.module')
    .then(mod => mod.AdminRoutingModule)
  },
  {
    path: 'page-not-found', component: PagenotfoundComponent
  },
  {
    path: '**', redirectTo: '/page-not-found'
  }

];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
