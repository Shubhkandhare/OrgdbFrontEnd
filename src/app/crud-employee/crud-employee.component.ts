import { Component, OnInit } from '@angular/core';
import { FormControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiServiceService } from "../employee/api-service.service";
import { Observable } from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

@Component({
  selector: 'app-main',
  templateUrl: './crud-employee.component.html',
  styleUrls: ['./crud-employee.component.css']
})
export class CrudEmployeeComponent implements OnInit {
  form: any = {}
  employee: any = {}
  gender: string[] = ['Male', 'Female', 'Other'];

  departmentList: string[];
  roleList: string[];
  autoCompleteControl = new FormControl();
  options: User[] = [
    {name: 'Tarun Seth'},
    {name: 'Meera Saha'},
    {name: 'Rita Mathur'}
  ];
  filteredOptions: Observable<User[]>;

  myBooks: string [];
  selected = null;

  constructor(private api: ApiServiceService, private http: HttpClient) {}
   ngOnInit() { 
    this.getAllDepartment();
    this.getAllRole();
     this.filteredOptions = this.autoCompleteControl.valueChanges
      .pipe(
        startWith(''),
        map(value => typeof value === 'string' ? value : value.name),
        map(name => name ? this._filter(name) : this.options.slice())
      )
  }
  postemployee(employee){
    console.log(employee);
    this.api.postEmployee(employee)
  }
  getAllDepartment(){
    let resp = this.api.getAllDepartment();
    resp.subscribe(
      data => {
        this.departmentList = data as string [];	
      }
    );
  }
  getAllRole(){
    let resp = this.api.getAllRoles();
    resp.subscribe(data => {this.roleList = data as string[];
    });
  }
  GetAllReportsTo(){
    let resp = this.api.GetAllReportsTo();
    resp.subscribe(data => {this.roleList = data as string[];
    });
  }
  displayFn(user?: User): string | undefined {
    return user ? user.name : undefined;
  }
  public selectedValue;
  selectedOption(event) {
    this.selectedValue = event.option.value;
    //this.employee.reports_to = this.selectedValue.name; //Set Reports To Value
    //console.log(this.selectedValue.name);
 }

  private _filter(name: string): User[] {
    const filterValue = name.toLowerCase();

    return this.options.filter(option => option.name.toLowerCase().indexOf(filterValue) === 0);
  }

  getEmployeeIdByEmail()
  {
    let resp = this.api.getEmployeeByEmail(this.employee.email);
    resp.subscribe(data => {this.employee.employee_id = data as string[] });
    //console.log(this.employee.email);
  }
}
export interface User {
  //id:number,
  name: string;
}