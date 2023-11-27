import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators'
import { AppHttpService } from '../shared/service/app-http.service'
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  constructor(
    private http:HttpClient,
    private httpService: AppHttpService
  ) { }

  getAdminDashboard() {
    const url = this.httpService.getApiurl('admin-dashboard');
    return this.httpService.getService(url)
    .pipe(
      map(resp => {
        if (resp) {
           return resp;
        }
        throw new Error ('Invalid response');
      })
    );
  }

  getAllStudents() {
    const url = this.httpService.getApiurl('users');
    return this.httpService.getService(url)
    .pipe(
      map(resp => {
        if (resp) {
           return resp;
        }
        throw new Error ('Invalid response');
      })
    );
  }
  getAllFaculties() {
    const url = this.httpService.getApiurl('faculties');
    return this.httpService.getService(url)
    .pipe(
      map(resp => {
        if (resp) {
           return resp;
        }
        throw new Error ('Invalid response');
      })
    );
  }

  addUser(firstName:any, lastName:any,  email: any, password: any, role: any, courseId: any = null) {
    const url = this.httpService.getApiurl('add-faculty');
    const facultyData = {
      firstName,
      lastName,
      userName: firstName+ ' ' +lastName,
      password,
      role: role,
      token: "",
      deviceToken: "",
      email,
      courseId
    }

    return this.httpService.postService(url, facultyData).pipe(
      map(resp => {
        if (resp) {
          return resp;
        } 
        throw new Error ('Invalid response');
      })
    );
  }

  editUser(firstName:any, lastName:any,  email: any, password: any, role: any, id:any, courseId: any = null) {
    const url = this.httpService.getApiurl('edit-faculty', [id]);
    const facultyData = {
      firstName,
      lastName,
      userName: firstName+ ' ' +lastName,
      password,
      role: role,
      token: "",
      deviceToken: "",
      email,
      courseId
    }

    return this.httpService.putService(url, facultyData).pipe(
      map(resp => {
        if (resp) {
          return resp;
        } 
        throw new Error ('Invalid response');
      })
    );
  }

  deleteUser(id:any) {
    const url = this.httpService.getApiurl('delete-faculty', [id]);
    return this.httpService.deleteService(url);
  }

  getUser(id:any) {
    const url = this.httpService.getApiurl('show-faculty', [id]);
    return this.httpService.getService(url).pipe(
      map(resp => {
        if (resp) {
          return resp;
        } 
        throw new Error ('Invalid response');
      })
    );;
  }

  getAllCourses() {
    const url = this.httpService.getApiurl('courses');
    return this.httpService.getService(url)
    .pipe(
      map(resp => {
        if (resp) {
           return resp;
        }
        throw new Error ('Invalid response');
      })
    );
  }

  addCourse(courseName: any, description: any) {
    const url = this.httpService.getApiurl('add-course');
    const courseData = {
      courseName,
      description
    }

    return this.httpService.postService(url, courseData).pipe(
      map(resp => {
        if (resp) {
          return resp;
        } 
        throw new Error ('Invalid response');
      })
    );
  }

  editCourse(courseName: any, description: any, id:any) {
    const url = this.httpService.getApiurl('edit-course', [id]);
    const courseData = {
      courseName,
      description
    }

    return this.httpService.putService(url, courseData).pipe(
      map(resp => {
        if (resp) {
          return resp;
        } 
        throw new Error ('Invalid response');
      })
    );
  }

  getCourse(id:any) {
    const url = this.httpService.getApiurl('show-course', [id]);
    return this.httpService.getService(url).pipe(
      map(resp => {
        if (resp) {
          return resp;
        } 
        throw new Error ('Invalid response');
      })
    );;
  }

  deleteCourse(id:any) {
    const url = this.httpService.getApiurl('delete-course', [id]);
    return this.httpService.deleteService(url);
  }

  getAllExams() {
    const url = this.httpService.getApiurl('exams');
    return this.httpService.getService(url)
    .pipe(
      map(resp => {
        if (resp) {
           return resp;
        }
        throw new Error ('Invalid response');
      })
    );
  }

  addExam(userId: any, courseId: any, examName: any, durationMinutes:any) {
    const url = this.httpService.getApiurl('add-exam');
    const examData = {
      userId,
      courseId,
      examName,
      durationMinutes
    }

    return this.httpService.postService(url, examData).pipe(
      map(resp => {
        if (resp) {
          return resp;
        } 
        throw new Error ('Invalid response');
      })
    );
  }

  editExam(userId: any, courseId: any, examName: any, durationMinutes:any, id:any) {
    const url = this.httpService.getApiurl('edit-exam', [id]);
    const examData = {
      userId,
      courseId,
      examName,
      durationMinutes
    }

    return this.httpService.putService(url, examData).pipe(
      map(resp => {
        if (resp) {
          return resp;
        } 
        throw new Error ('Invalid response');
      })
    );
  }

  getExam(id:any) {
    const url = this.httpService.getApiurl('show-exam', [id]);
    return this.httpService.getService(url).pipe(
      map(resp => {
        if (resp) {
          return resp;
        } 
        throw new Error ('Invalid response');
      })
    );;
  }

  deleteExam(id:any) {
    const url = this.httpService.getApiurl('delete-exam', [id]);
    return this.httpService.deleteService(url);
  }

  addQuestion(questionData: any) {
    const url = this.httpService.getApiurl('add-question');
    return this.httpService.postService(url, questionData).pipe(
      map(resp => {
        if (resp) {
          return resp;
        } 
        throw new Error ('Invalid response');
      })
    );
  }

  getAllQuestions() {
    const url = this.httpService.getApiurl('questions');
    return this.httpService.getService(url)
    .pipe(
      map(resp => {
        if (resp) {
           return resp;
        }
        throw new Error ('Invalid response');
      })
    );
  }

  getQuestion(id:any) {
    const url = this.httpService.getApiurl('show-question', [id]);
    return this.httpService.getService(url).pipe(
      map(resp => {
        if (resp) {
          return resp;
        } 
        throw new Error ('Invalid response');
      })
    );;
  }

  editQuestion(questionData: any, id:any) {
    const url = this.httpService.getApiurl('edit-question', [id]);

    return this.httpService.putService(url, questionData).pipe(
      map(resp => {
        if (resp) {
          return resp;
        } 
        throw new Error ('Invalid response');
      })
    );
  }

  deleteQuestion(id:any) {
    const url = this.httpService.getApiurl('delete-question', [id]);
    return this.httpService.deleteService(url);
  }

}
