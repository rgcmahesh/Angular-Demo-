import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs'
import { environment as ENV } from '../../../environments/environment'

@Injectable({
  providedIn: 'root'
})
export class AppHttpService {

 apiUrl:string = '';
 BASE_URL: string = '';
 params: any = [];

constructor(private https: HttpClient) {
    this.BASE_URL = ENV.BASE_URL;
}

   get apiUrls() {
        return {
            // login section
            login: `${this.BASE_URL}/user/login`,
            register: `https://localhost:7250/api/user/register`,

            //users
            users: `https://localhost:7250/api/user`,

            //admin dashboard
            'admin-dashboard': `https://localhost:7250/api/user/AdminDashboard`,

            //faculty
            faculties: `https://localhost:7250/api/user/GetAllFaculties`,
            'add-faculty': `https://localhost:7250/api/user/AddFaculty`,
            'show-faculty': `https://localhost:7250/api/user/ShowFaculty/${this.params[0]}`,
            'edit-faculty': `https://localhost:7250/api/user/EditFaculty/${this.params[0]}`,
            'delete-faculty': `https://localhost:7250/api/user/DeleteFaculty/${this.params[0]}`,

            //courses
            courses: `https://localhost:7250/api/Courses`,
            'add-course': `https://localhost:7250/api/Courses`,
            'show-course': `https://localhost:7250/api/Courses/${this.params[0]}`,
            'edit-course': `https://localhost:7250/api/Courses/${this.params[0]}`,
            'delete-course': `https://localhost:7250/api/Courses/${this.params[0]}`,

            //Exams
            exams: `https://localhost:7250/api/Exam`,
            'add-exam': `https://localhost:7250/api/Exam`,
            'show-exam': `https://localhost:7250/api/Exam/${this.params[0]}`,
            'edit-exam': `https://localhost:7250/api/Exam/${this.params[0]}`,
            'delete-exam': `https://localhost:7250/api/Exam/${this.params[0]}`,

            //Question
            questions: `https://localhost:7250/api/QuestionControll`,
            'add-question': `https://localhost:7250/api/QuestionControll`,
            'show-question': `https://localhost:7250/api/QuestionControll/${this.params[0]}`,
            'edit-question': `https://localhost:7250/api/QuestionControll/${this.params[0]}`,
            'delete-question': `https://localhost:7250/api/QuestionControll/${this.params[0]}`,

            //Exam result
            'exam-result': `https://localhost:7250/api/ExamResult`,
             result: `https://localhost:7250/api/ExamResult/${this.params[0]}/${this.params[1]}`,

        };
   }

   getApiurl(apiName: string, params: any = []) {
        this.params = params;
        if (apiName in this.apiUrls) {
            return this.apiUrls[apiName as keyof typeof this.apiUrls];
        }
        return null;
   }

   getService(URL: any):Observable<any> {
    return this.https.get(URL);

   }
   
   postService(URL: any, body: any):Observable<any> {
    return this.https.post(URL, body);
   }

   putService(URL: any, body: any):Observable<any> {
    return this.https.put(URL, body);
   }

   patchService(URL: string, body: any):Observable<any> {
    return this.https.patch(URL, body);
   }

   deleteService(URL: any):Observable<any> {
    return this.https.delete(URL);
   }

//    getApiUrl(name: string, params: any = []) {

//     this.params = params;
//     if (name in this.apiUrls) {
//         return this.apiUrls[name];

//     }

//    }
}
