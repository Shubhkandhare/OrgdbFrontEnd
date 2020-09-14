import {Component, ViewChild, OnInit} from '@angular/core';
import {ApiServiceService} from './api-service.service';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import { MatSort } from '@angular/material';
import { Router } from '@angular/router';

@Component({
  selector: 'app-main',
	styles: ['./component.css'],
	templateUrl: 'component.component.html'
})

export class ComponentComponent implements OnInit {
  ELEMENT_DATA : IEmployee[];
  displayedColumns: string[] = ['employeeId','employeeName','contact','department'];
  dataSource = new MatTableDataSource<IEmployee>(this.ELEMENT_DATA);

  constructor(private api: ApiServiceService, private router: Router){}
  @ViewChild(MatPaginator, {static: true}) paginator : MatPaginator;
  @ViewChild(MatSort, {static: true}) sort : MatSort;

  ngOnInit(){
    this.getAllEmployee();
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  public getAllEmployee(){
    let resp = this.api.getAllEmployee();
    resp.subscribe(res => this.dataSource.data = res as IEmployee[]);
  }

  public gotoList() {
    this.router.navigate(['/crudEmployee']);
  }
}

export interface IEmployee{
  employeeId: number;
  employeeName: string;
  contact: string;
  department: string;
  //reportsTo: string;
}