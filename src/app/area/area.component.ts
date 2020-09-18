import { Component, OnInit, ViewChild } from '@angular/core';
import { AreaServiceService } from "./area-service.service";
import { MatPaginator } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";
import { MatTableDataSource } from '@angular/material';
import { Router } from "@angular/router";

@Component({
  selector: 'app-main',
  templateUrl: './area.component.html',
  styleUrls: ['./area.component.css']
})
export class AreaComponent implements OnInit {

  ELEMENT_DATA: IArea[];
  displayedColumns: string[] = ['deptName', 'areaName', 'areaOwner'];  
  dataSource

  constructor(private api: AreaServiceService, private router: Router) { }
  @ViewChild(MatPaginator, {static: true}) paginator : MatPaginator;
  @ViewChild(MatSort, {static: true}) sort : MatSort;

  ngOnInit() {
    this.populateAreaGrid();
     this.dataSource = new MatTableDataSource<IArea>(this.ELEMENT_DATA);
    
     this.dataSource.paginator = this.paginator;
     this.dataSource.sort = this.sort;
  }
  
  public populateAreaGrid()
  {
    let resp = this.api.getAllAreaGrid();
    resp.subscribe(res => this.dataSource.data = res as IArea[]);
    console.log(resp);
  }

  public gotoList() {
    this.router.navigate(['/crudArea']);
  }
}

export interface IArea{
  deptName: string,
  areaName: string,
  areaOwner: string
}
