import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CrudDepartmentComponent } from './crud-department.component';

describe('CrudDepartmentComponent', () => {
  let component: CrudDepartmentComponent;
  let fixture: ComponentFixture<CrudDepartmentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CrudDepartmentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CrudDepartmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
