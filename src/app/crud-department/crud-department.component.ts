import { Component, OnInit } from '@angular/core';
import { DeptServiceService } from "../department/dept-service.service";
@Component({
  selector: 'app-main',
  templateUrl: './crud-department.component.html',
  styleUrls: ['./crud-department.component.css']
})
export class CrudDepartmentComponent implements OnInit {
  departmentList: string[];  
  department: any = {}
  constructor(private api: DeptServiceService) { }

  ngOnInit() {
    this.getAllDepartment();
  }
  getAllDepartment(){
    let resp = this.api.getDepartmentType();
    resp.subscribe(
      data => {
        this.departmentList = data as string [];	
      }
    );
  }
}
