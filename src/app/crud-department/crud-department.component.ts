import { Component, OnInit } from '@angular/core';
import { DeptServiceService } from "../department/dept-service.service";
import { FormControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Router } from "@angular/router";
import { debounceTime, tap, switchMap, finalize } from 'rxjs/operators';
import { GlobalVariable } from "../global";

@Component({
  selector: 'app-main',
  templateUrl: './crud-department.component.html',
  styleUrls: ['./crud-department.component.css']
})
export class CrudDepartmentComponent implements OnInit {
  private baseApiUrl = GlobalVariable.BASE_API_URL;
  departmentList: string[];  
  department: any = {}
  deptForm: FormGroup;
  constructor(private api: DeptServiceService, private fb: FormBuilder, private http: HttpClient, private router: Router) { }

  searchHOD = new FormControl();
  searchSecondLineApp = new FormControl();
  filteredreportsTo: any;
  isLoading = false;
  errorMsg: string;

  ngOnInit() {
    this.createForm();
    this.getDepartmentType();
    //Autocomplet for HOD
    this.searchHOD.valueChanges
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
    //Autocomplete for SecondLineApprover
    this.searchSecondLineApp.valueChanges
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
    this.deptForm = this.fb.group({
       deptName: ['', Validators.required ],
       dept: new FormControl('',[
                Validators.required
              ]),
       //hod:[],
       isUnavailable:[]//,
       //secondlineApprover:[]
    });
  }  
  getDepartmentType(){
    let resp = this.api.getDepartmentType();
    resp.subscribe(
      data => {
        this.departmentList = data as string [];	
      }
    );
  }
  postdepartment(depatment)//Save department if already exists then update otherwise insert
  { 
    console.log(depatment);
    this.api.postDepartment(depatment).subscribe(result => console.log(result),
    (error) => { alert('Record not saved successfully!'); }, () => { alert('Record saved successfully'); })
  }
  resetdepartment(){
    if (this.deptForm.valid) {
      this.deptForm.reset();
    }
  }
}
