import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeeTaskFormComponent } from './employee-task-form.component';

describe('EmployeeTaskFormComponent', () => {
  let component: EmployeeTaskFormComponent;
  let fixture: ComponentFixture<EmployeeTaskFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EmployeeTaskFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmployeeTaskFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
