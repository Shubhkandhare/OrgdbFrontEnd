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
  employeeForm: FormGroup;
  
  constructor(private api: ApiServiceService, private http: HttpClient, private router: Router, private fb: FormBuilder) {}
   ngOnInit() { 
    this.createForm();
    this.getAllOrgDepartment();
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
  createForm() {
    this.employeeForm = this.fb.group({
       firstname: ['', Validators.required ],
       middlename: ['', Validators.nullValidator ],
       lastname: ['', Validators.required ],
       gender:[''],
       email: new FormControl('',[
        Validators.required,
        Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$")]),
       phone: ['', Validators.required ],
       emergencyemail: new FormControl('',[
        Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$")]),
       emergencyphone:[],
       employeeorgid:[],
       role:[],
       isactive:[],
       oncontract:[],
       dept: new FormControl('',[
         Validators.required
       ]),
       searchReportsToCtrl:[]
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
  getAllOrgDepartment()//Get All Departments to populate dropdown
  {
    let resp = this.api.getAllOrgDepartment();
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