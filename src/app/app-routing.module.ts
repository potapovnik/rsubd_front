import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {NameStageComponent} from './name-stage/name-stage.component';
import {DivisionComponent} from './division/division.component';
import {EmployeeComponent} from './employee/employee.component';
import {EmployeeStageComponent} from './employee-stage/employee-stage.component';
import {TaskComponent} from './task/task.component';
import {StageComponent} from './stage/stage.component';

const routes: Routes = [
  {
    path: 'nameStage',
    component: NameStageComponent
  },
  {
    path: 'division',
    component: DivisionComponent
  },
  {
    path: 'employee',
    component: EmployeeComponent
  },
  {
    path: 'employeeStage',
    component: EmployeeStageComponent
  },
  {
    path: 'task',
    component: TaskComponent
  },
  {
    path: 'stage',
    component: StageComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
