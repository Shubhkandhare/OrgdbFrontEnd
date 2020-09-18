import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http"
import { Subject } from 'rxjs';
import { GlobalVariable } from "../global";
@Injectable({
  providedIn: 'root'
})
export class ApiServiceService {

  private baseApiUrl = GlobalVariable.BASE_API_URL;

  private listEmployee = new Subject<any>();
  listSelected = this.listEmployee.asObservable();

   constructor(private http: HttpClient) { }
   
   headers = {
    // 'Authorization': 'Basic ' + btoa(username + ":" + password),
   'Access-Control-Allow-Origin': true,
   'Content-Type': 'application/json; charset=utf-8',
   "X-Requested-With": "XMLHttpRequest"
     }

    getAllEmployee() {
        return this.http.get(this.baseApiUrl+`employee`);
    }

    getAllDepartment() {
      return this.http.get(this.baseApiUrl+`department`);
    }

    getAllRoles() {
      return this.http.get(this.baseApiUrl+`role`);
    }
    GetAllReportsTo() {
      return this.http.get(this.baseApiUrl+`reportsto`);
    }
    postEmployee(employee) {
      this.http.post(this.baseApiUrl+`employee`, employee).subscribe(res => {
          console.log(res);
      }), this.headers;
    }

    getEmployeeByEmail(email) {
        const httpOptions = {
          headers: { 'Content-Type': 'application/json' },
          params: { 'email': email }
      };
      return this.http.get(this.baseApiUrl+`employee/GetEmployeeByEmail/`, httpOptions);
    }
/*
    putEmployee(employee) {
        this.http.put(this.baseApiUrl+`employee/${employee.id}`, employee).subscribe(res => {
            console.log(res);
        }), this.headers;
    }*/
}
