import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { AdminService } from '../../admin.service'
import { NgToastService } from 'ng-angular-popup';
import { PasswordValidator } from '../../../helpers/validators/password.validator';
import { confirmPasswordValidator } from '../../../helpers/validators/confirm-password.validator';

@Component({
  selector: 'app-add-faculty',
  templateUrl: './add-faculty.component.html',
  styleUrls: ['./add-faculty.component.scss']
})
export class AddFacultyComponent implements OnInit {

  public facultyForm: FormGroup = this.formBuilder.group({

    firstName: ["", [Validators.required]],
    lastName: ["", [Validators.required]],
    email: ["", [Validators.email, Validators.required]],
    password: ["" ,[Validators.required, PasswordValidator.strong]],
    confirmPassword: ["" ,[Validators.required]]
  },
 { validators: confirmPasswordValidator }
  );
  
  public isInitialized = false;
  public submitted = false;
  public loading = false;
  public errors: any;
  userObj:any ;
  
  get formControl() {
    return this.facultyForm.controls;
  }


  constructor(
    private formBuilder: FormBuilder,
     private router: Router,
     private adminService: AdminService,
     private toast: NgToastService
     ) {
  }

  ngOnInit(): void {
    this.isInitialized = true;
  }

  onSubmit(): void {
    this.submitted = true;
    if (this.facultyForm.valid) {
      this.loading = true;
      this.adminService.addUser(this.facultyForm.value.firstName, this.facultyForm.value.lastName, this.facultyForm.value.email, this.facultyForm.value.password, 'faculty')
      .subscribe({
          next: resp => {
            if (resp) {
                this.loading = false;
                this.toast.success({detail:"SUCCESS",summary:'Faculty Added Successfully', duration:3000});
                this.router.navigate(['/admin/faculty/']);
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
