import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router, ActivatedRoute } from "@angular/router";
import { AdminService } from '../../admin.service'
import { NgToastService } from 'ng-angular-popup';
import { PasswordValidator } from '../../../helpers/validators/password.validator';
import { confirmPasswordValidator } from '../../../helpers/validators/confirm-password.validator';

@Component({
  selector: 'app-edit-student',
  templateUrl: './edit-student.component.html',
  styleUrls: ['./edit-student.component.scss']
})
export class EditStudentComponent implements OnInit {

  public studentForm: FormGroup = this.formBuilder.group({

    firstName: ["", [Validators.required]],
    lastName: ["", [Validators.required]],
    email: ["", [Validators.email, Validators.required]],
    courseId: [""],
    password: ["" ,[Validators.required, PasswordValidator.strong]],
    confirmPassword: ["" ,[Validators.required]]
  },
 { validators: confirmPasswordValidator }
  );
  
  public isInitialized = false;
  public submitted = false;
  public loading = false;
  public errors: any;
  courses: any;
  userObj:any ;
  user: any;
  id: any;
  
  get formControl() {
    return this.studentForm.controls;
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
    this.id = this.route.snapshot.paramMap.get('id');
    this.getAllCourses();
    this.getStudent();
    this.isInitialized = true;
  }

  getAllCourses() {
    this.loading = true;
    this.adminService.getAllCourses()
    .subscribe({
      next: resp => {
        this.courses = resp;
        console.log(this.courses);
      }, 
      error: err => {
        this.loading = false;
        this.toast.error({detail:"ERROR",summary: err?.error.message, sticky:true});
        this.errors = err?.error.message;  
        console.log(this.errors);
      }
    });
  }

  toReactiveForm(user: any) {
    this.formControl.email.setValue(user.email);
    this.formControl.firstName.setValue(user.firstName);
    this.formControl.lastName.setValue(user.lastName);
  }

   getStudent() {
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
    if (this.studentForm.valid) {
      this.loading = true;
      this.adminService.editUser(this.studentForm.value.firstName, this.studentForm.value.lastName, this.studentForm.value.email, this.studentForm.value.password, 'learner', this.id, this.studentForm.value.courseId)
      .subscribe({
          next: resp => {
            if (resp) {
                this.loading = false;
                this.toast.success({detail:"SUCCESS",summary:'Student Updated Successfully', duration:3000});
                this.router.navigate(['/admin/student/']);
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
