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
    postEmployee(employee) {
      return this.http.post(this.baseApiUrl+`employee`, employee)
      // .subscribe(res => {
      //     console.log(res);
      // }), this.headers;
    }
    getEmployeeOrgIdByFLName(first_name, last_name){
      const httpOptions = {
        headers: { 'Content-Type': 'application/json' },
        params: { 'first_name': first_name,  'last_name': last_name}
    };
    return this.http.get(this.baseApiUrl+`employee/GetEmployeeOrgIdByFLName`, httpOptions);
  }
}
