import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http"
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class service {

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
        return this.http.get(`https://localhost:44307/api/questions`);
    }
}
