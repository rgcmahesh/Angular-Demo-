import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from '../../guest/home/home.component';
import { DefaultComponent } from '../../layouts/default/default.component';
import { RouterModule } from '@angular/router';
// import { SharedModule } from '../../shared/shared.module'

@NgModule({
  declarations: [
    HomeComponent,
    DefaultComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    // SharedModule
  ]
})
export class DefaultModule { }
