import { Component, OnInit } from '@angular/core';
import { FormControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiServiceService } from "../employee/api-service.service";
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Router } from "@angular/router";
import { debounceTime, tap, switchMap, finalize } from 'rxjs/operators';
import { GlobalVariable } from "../global";

@Component({
  selector: 'app-main',
  templateUrl: './crud-employee.component.html',
  styleUrls: ['./crud-employee.component.css']
})
export class CrudEmployeeComponent implements OnInit {
  private baseApiUrl = GlobalVariable.BASE_API_URL;

  searchReportsToCtrl = new FormControl();
  filteredreportsTo: any;
  isLoading = false;
  errorMsg: string;
  employee: any = {}
  gender: string[] = ['Male', 'Female', 'Other'];
  departmentList: string[];
  roleList: string[];
  employee_org_id;

  constructor(private api: ApiServiceService, private http: HttpClient, private router: Router) {}
   ngOnInit() { 
    this.getAllDepartment();
    this.getAllRole();
    //Autocomplete ReportsTo
    this.searchReportsToCtrl.valueChanges
    .pipe(
      debounceTime(500),
      tap(() => {
        this.errorMsg = "";
        this.filteredreportsTo = [];
        this.isLoading = true;
      }),
      switchMap(value => this.http.get(this.baseApiUrl+`employee/GetEmployeeName?val=` + value)
        .pipe(
          finalize(() => {
            this.isLoading = false
          }),
        )
      )
    )
    .subscribe(data => {
      this.filteredreportsTo = data as [];
    });
  }
  postemployee(employee)//Save employee if already exists then update otherwise insert
  {
    employee.employee_org_id = this.employee_org_id.toString();
    this.employee.employee_org_id.toString();
    console.log(employee);
    this.api.postEmployee(employee).subscribe(result => console.log(result),
    (error) => { alert('Record not saved successfully!'); }, () => { alert('Record saved successfully'); })
  }
  getAllDepartment()//Get All Departments to populate dropdown
  {
    let resp = this.api.getAllDepartment();
    resp.subscribe(
      data => {
        this.departmentList = data as string [];	
      }
    );
  }
  getAllRole()//Get All Roles to populate dropdown
  {
    let resp = this.api.getAllRoles();
    resp.subscribe(data => {this.roleList = data as string[];
    });
  }
  getEmployeeOrgIdByFLName()//Get EmployeeOrgId by First and Last Name
  {
    let resp = this.api.getEmployeeOrgIdByFLName(this.employee.first_name, this.employee.last_name);
    resp.subscribe(data => {
      this.employee_org_id = data as string[];      
    });
  }
  resetemployee()
  {
    location.reload();
  }
}