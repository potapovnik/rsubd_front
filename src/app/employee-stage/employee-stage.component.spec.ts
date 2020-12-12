import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeeStageComponent } from './employee-stage.component';

describe('EmployeeStageComponent', () => {
  let component: EmployeeStageComponent;
  let fixture: ComponentFixture<EmployeeStageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EmployeeStageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmployeeStageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
