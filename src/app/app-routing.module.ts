import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MainComponent } from './main/main.component';
import { ComponentComponent } from './employee/component.component';
import { DepartmentComponent } from './department/department.component';
import { AreaComponent } from './area/area.component';
import { CrudEmployeeComponent } from './crud-employee/crud-employee.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'home' },
  { path: 'home', component: MainComponent },
  { path: 'employee', component: ComponentComponent },
  { path: 'department', component: DepartmentComponent},
  { path: 'area', component: AreaComponent},
  { path: 'crudEmployee', component: CrudEmployeeComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
