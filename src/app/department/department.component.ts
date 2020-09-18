import { Component, OnInit, ViewChild } from '@angular/core';
import { DeptServiceService } from "./dept-service.service";
import { MatPaginator } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";
import { MatTableDataSource } from '@angular/material';
import { Router } from "@angular/router";
@Component({
  selector: 'app-main',
  templateUrl: './department.component.html',
  styleUrls: ['./department.component.css']
})
export class DepartmentComponent implements OnInit {
  
  ELEMENT_DATA: IDepartment[];
  displayedColumns: string[] = ['deptName','hod','isAvailable','secondlineApprover'];  
  dataSource

  constructor(private api: DeptServiceService, private router: Router) { }
  @ViewChild(MatPaginator, {static: true}) paginator : MatPaginator;
  @ViewChild(MatSort, {static: true}) sort : MatSort;

  ngOnInit() {
     this.populateDeptGrid();
     this.dataSource = new MatTableDataSource<IDepartment>(this.ELEMENT_DATA);
    
     this.dataSource.paginator = this.paginator;
     this.dataSource.sort = this.sort;
  }

  public populateDeptGrid()
  {
    let resp = this.api.getAllDepartmentGrid();
    resp.subscribe(res => this.dataSource.data = res as IDepartment[]);
    console.log(resp);
  }

  public gotoList()
  {
    this.router.navigate(['/crudDepartment']);
  }
}

export interface IDepartment
{
  deptName: string,
  hod: string,
  isAvailable: boolean,
  secondlineApprover: string
}