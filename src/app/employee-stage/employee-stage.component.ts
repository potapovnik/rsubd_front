import {Component, OnDestroy, OnInit} from '@angular/core';
import {EmployeeStage} from '../entity/EmployeeStage';
import {EmployeeStageService} from './EmployeeStageService';
import {Employee} from '../entity/Employee';
import {Stage} from '../entity/Stage';
import {EmployeeService} from '../employee/EmployeeService';
import {StageService} from '../stage/stageService';
import {NameStage} from '../entity/NameStage';
import {NameStageService} from '../name-stage/NameStageService';

@Component({
  selector: 'app-employee-stage',
  templateUrl: './employee-stage.component.html',
  styleUrls: ['./employee-stage.component.scss']
})
export class EmployeeStageComponent implements OnInit {

  allEmployeeStage: EmployeeStage[];
  selectedEmployeeStage: EmployeeStage;
  createdEmployeeStage: EmployeeStage;
  createCheckEmployee = true;
  createCheckStage = true;
  saveCheckEmployee = true;
  saveCheckStage = true;
  allEmployee: Employee[];
  allStage: Stage[];
  allNameOfStage: NameStage[];
  err: String;
  errUpdate: String;

  ngOnInit() {
    this.getAllEmployee();
    this.selectedEmployeeStage = new EmployeeStage();
    this.createdEmployeeStage = new EmployeeStage();
    this.err = null;
    this.errUpdate = null;

  }

  constructor(private service: EmployeeStageService, private emplService: EmployeeService,
              private stageService: StageService, private nameStageService: NameStageService) {
  }

  public fullName() {
    for (const emplStage of this.allEmployeeStage) {

      if (this.allEmployee !== undefined) {
        for (const empl of this.allEmployee) {
          if (emplStage.employee_id === empl.id) {
            emplStage.employee = empl.name + ' ' + empl.surname;
          }
        }
      }
      for (const stage of this.allStage) {
        if (emplStage.stage_id === stage.id) {
          for (const name of this.allNameOfStage) {
            if (name.id === stage.nameId) {
              emplStage.stage = name.name;
            }
          }
        }

      }
    }

  }

  public getAllEmployee() {
    this.service.getAllEmployeeStage().subscribe(resp => {
      this.allEmployeeStage = resp, this.emplService.getAllEmployee().subscribe(r => {
          this.allEmployee = r, this.nameStageService.getAllNameStage().subscribe(respo => {
            this.allNameOfStage = respo,
              this.stageService.getAllStage().subscribe(re => {
                this.allStage = re;
                this.fullName();
              });
          });
        }
      );

    });

  }

  public delete(division: EmployeeStage) {
    return this.service.delete(division.id).subscribe();
  }

  public save(division: EmployeeStage) {
    if (division.stage_id === null || division.employee_id === null ||
      division.stage_id === undefined || division.employee_id === undefined) {
      this.err = 'ошибка';
    } else {
      this.service.check(division.employee_id, division.stage_id).subscribe(resp => {
        this.createCheckEmployee = resp[0];
        this.createCheckStage = resp[1];
        if (resp[0] === true && resp[1] === true) {
          this.err = null;
          return this.service.create(division).subscribe(n => {
          });
        }
      });
    }
  }

  public update(division: EmployeeStage) {
    this.service.check(division.employee_id, division.stage_id).subscribe(resp => {
      this.saveCheckEmployee = resp[0];
      this.saveCheckStage = resp[1];
      if (resp[0] === null || resp[1] === null) {
        this.errUpdate = 'ошибка';
      }
      if (resp[0] === true && resp[1] === true) {
        return this.service.update(division).subscribe(
          n => {
          });
      }
    });
  }

  public selectEmployeeStage(division: EmployeeStage) {
    this.selectedEmployeeStage = division;
  }


}
