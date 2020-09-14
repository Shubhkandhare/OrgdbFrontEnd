import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http"
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiServiceService {

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
        return this.http.get(`https://localhost:44360/employee`);
    }

    getAllDepartment() {
      return this.http.get(`https://localhost:44360/department`);
    }

    getAllRoles() {
      return this.http.get(`https://localhost:44360/role`);
    }
    GetAllReportsTo() {
      return this.http.get(`https://localhost:44360/reportsto`);
    }
    postEmployee(employee) {
      this.http.post(`https://localhost:44360/employee`, employee).subscribe(res => {
          console.log(res);
      }), this.headers;
    }

    getEmployeeByEmail(email) {
        const httpOptions = {
          headers: { 'Content-Type': 'application/json' },
          params: { 'email': email }
      };
      return this.http.get(`https://localhost:44360/employee/GetEmployeeByEmail/`, httpOptions);
    }
/*
    putEmployee(employee) {
        this.http.put(`https://localhost:44360/employee/${employee.id}`, employee).subscribe(res => {
            console.log(res);
        }), this.headers;
    }*/
}
