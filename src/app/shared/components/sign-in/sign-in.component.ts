import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { AuthService } from '../../service/auth.service'
import { NgToastService } from 'ng-angular-popup';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent implements OnInit {
  // public loginForm: any;

  public loginForm: FormGroup = this.formBuilder.group({
    email: ["", [Validators.email, Validators.required]],
    password: ["" ,[Validators.required]]
  });
  
  public isInitialized = false;
  public submitted = false;
  public loading = false;
  public errors: any;
  
  get formControl() {
    return this.loginForm.controls;
  }


  constructor(
    private formBuilder: FormBuilder,
     private router: Router,
     private authService: AuthService,
     private toast: NgToastService
     ) {
  }

  ngOnInit(): void {
    if (this.authService.isLoggedIn()) {
      this.router.navigate([localStorage.getItem('dashboardUrl')]);
    }
    this.isInitialized = true;
  }

  onLogin(): void {
    this.submitted = true;
    if (this.loginForm.valid) {
      this.loading = true;
      this.authService.login(this.loginForm.value.email, this.loginForm.value.password)
      .subscribe({
        next: resp => {
          if (resp.status && resp.status == 'LoggedIn') {
            this.toast.success({detail:"SUCCESS",summary:'Login Successfull', duration:3000});
              this.loading = false;
              //this.errors = null;
             this.router.navigate([this.authService.redirectUrl]);
          } 
        }, 
        error: err => {
          this.loading = false;
          this.toast.error({detail:"ERROR",summary: 'Invalid email or password', sticky:true});
            this.errors = err?.error.message;
        }
      });
    }
  }

}
