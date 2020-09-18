import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CrudAreaComponent } from './crud-area.component';

describe('CrudAreaComponent', () => {
  let component: CrudAreaComponent;
  let fixture: ComponentFixture<CrudAreaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CrudAreaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CrudAreaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
