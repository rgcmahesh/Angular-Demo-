import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { AuthService } from '../../service/auth.service'
import { PasswordValidator } from '../../../helpers/validators/password.validator';
import { confirmPasswordValidator } from '../../../helpers/validators/confirm-password.validator';
import { NgToastService } from 'ng-angular-popup';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit {

  public signUpForm = this.formBuilder.group({

    firstName: ["", [Validators.required]],
    lastName: ["", [Validators.required]],
    email: ["", [Validators.email, Validators.required]],
    password: ["" ,[Validators.required, PasswordValidator.strong]],
    confirmPassword: ["" ,[Validators.required]]
  },
  { validators: confirmPasswordValidator }
  );

  
  public submitted = false;
  public loading = false;
  public errors:any;

  constructor(
    private formBuilder: FormBuilder,
     private router: Router,
     private authService:AuthService,
     private toast: NgToastService
     ) {
  }

  ngOnInit(): void {
    if (this.authService.isLoggedIn()) {
      this.router.navigate(['']);
    }
  }

  get formControl() {
    return this.signUpForm.controls;
  }

  onSubmit(): void {
    this.submitted = true;
    if (this.signUpForm.valid) {
      this.loading = true;
      this.authService.register(this.signUpForm.value.firstName, this.signUpForm.value.lastName, this.signUpForm.value.email, this.signUpForm.value.password)
      .subscribe({
          next: resp => {
            if (resp) {
                this.loading = false;
                this.toast.success({detail:"SUCCESS",summary:'Registration Successfull', duration:3000});
                this.router.navigate(['/sign_in']);
            } 
          }, 
          error: err => {
            this.loading = false;
            this.toast.error({detail:"ERROR",summary: err?.error.message, sticky:true});
            console.log(this.errors);
          }
        });
    }
  }

}
