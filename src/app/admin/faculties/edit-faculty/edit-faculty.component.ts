import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router, ActivatedRoute } from "@angular/router";
import { NgToastService } from 'ng-angular-popup';
import { AdminService } from '../../admin.service'
import { NgxSpinnerService } from "ngx-spinner";  
import { PasswordValidator } from '../../../helpers/validators/password.validator';
import { confirmPasswordValidator } from '../../../helpers/validators/confirm-password.validator';

@Component({
  selector: 'app-edit-faculty',
  templateUrl: './edit-faculty.component.html',
  styleUrls: ['./edit-faculty.component.scss']
})
export class EditFacultyComponent implements OnInit {

  public isInitialized = false;
  public submitted = false;
  public loading = false;
  public errors: any;
  userObj:any ;
  user: any;
  id: any

  public facultyForm: FormGroup = this.formBuilder.group({

    firstName: ["", [Validators.required]],
    lastName: ["", [Validators.required]],
    email: ["", [Validators.email, Validators.required]],
    password: ["" ,[Validators.required, PasswordValidator.strong]],
    confirmPassword: ["" ,[Validators.required]]
  },
 { validators: confirmPasswordValidator }
  );
  
  get formControl() {
    return this.facultyForm.controls;
  }


  constructor(
    private formBuilder: FormBuilder,
     private router: Router,
     private route: ActivatedRoute,
     private adminService: AdminService,
     private toast: NgToastService
     ) {
  }

  ngOnInit(): void {
    this.isInitialized = true;
    this.id = this.route.snapshot.paramMap.get('id');
    this.getFaculty();
  }


  toReactiveForm(user: any) {
    this.formControl.email.setValue(user.email);
    this.formControl.firstName.setValue(user.firstName);
    this.formControl.lastName.setValue(user.lastName);
  }

   getFaculty() {
    this.loading = true;
    this.adminService.getUser(this.id)
    .subscribe({
      next: resp => {
        console.log(resp)
        this.user = resp;
        this.toReactiveForm(this.user);
      }, 
      error: err => {
        this.loading = false;
        this.toast.error({detail:"ERROR",summary: err?.error.message, sticky:true});
        this.errors = err?.error.message;  
        console.log(this.errors);
      }
    });
  }

  onSubmit(): void {
    this.submitted = true;
    if (this.facultyForm.valid) {
      this.loading = true;
      this.adminService.editUser(this.facultyForm.value.firstName, this.facultyForm.value.lastName, this.facultyForm.value.email, this.facultyForm.value.password, 'faculty', this.id)
        .subscribe({
          next: resp => {
            console.log(resp)
            if (resp) {
                this.loading = false;
                this.toast.success({detail:"SUCCESS",summary:'Faculty Updated Successfully', duration:3000});
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