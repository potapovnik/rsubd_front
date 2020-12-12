import {Component, OnInit} from '@angular/core';
import {Employee} from '../entity/Employee';
import {EmployeeService} from '../employee/EmployeeService';
import {Stage} from '../entity/Stage';
import {StageService} from './stageService';
import {NameStage} from '../entity/NameStage';
import {NameStageService} from '../name-stage/NameStageService';
import {TaskService} from '../task/taskService';
import {Task} from '../entity/Task';

@Component({
  selector: 'app-stage',
  templateUrl: './stage.component.html',
  styleUrls: ['./stage.component.scss']
})
export class StageComponent implements OnInit {

  allStage: Stage[];
  selectedStage: Stage;
  createdStage: Stage;
  checkNSCreate = true;
  checkTaskCreate = true;
  checkEmployeeCreate = true;
  checkNSSave = true;
  checkTaskSave = true;
  checkEmployeeSave = true;
  allEmployee: Employee[];
  allNameOfStage: NameStage[];
  allTask: Task[];
  errReadnis1: String;
  errReadnis2: String;
  errImportant1: String;
  errImportant2: String;
  errCreate: String;
  errCreateDate: String;
  errUpdateDate: String;

  ngOnInit() {
    this.getAllEmployee();
    this.selectedStage = new Stage();
    this.createdStage = new Stage();
    this.errReadnis1 = null;
    this.errReadnis2 = null;
    this.errImportant1 = null;
    this.errImportant2 = null;
    this.errCreate = null;
  }

  constructor(private service: StageService,
              private emplService: EmployeeService, private nm: NameStageService, private taskService: TaskService) {
  }

  public getAllEmployee() {
    this.emplService.getAllEmployee().subscribe(r => {
      this.allEmployee = r;
      this.nm.getAllNameStage().subscribe(rr => {
        this.allNameOfStage = rr;
        return this.service.getAllStage().subscribe(resp => {
          this.allStage = resp;
          this.getFullName();
          this.taskService.getAllTask().subscribe(re => this.allTask = re);
        });
      });

    });

  }

  public delete(division: Stage) {
    return this.service.delete(division.id).subscribe();
  }

  public save(division: Stage) {
    if (division.responsibleId === undefined || division.taskId === undefined || division.nameId === undefined) {
      this.errCreate = 'Необходимо заполнить все три поля: название,задача,ответственный ';
    } else {
      this.service.checkStage(division.responsibleId, division.taskId, division.nameId).subscribe(resp => {
          this.checkEmployeeCreate = resp[0];
          this.checkTaskCreate = resp[1];
          this.checkNSCreate = resp[2];
          if (isNaN(Number(division.importance)) || Number(division.importance) < 0) {
            this.errImportant1 = 'Значение важности должно быть числом больше 0';
          } else {
            if (isNaN(Number(division.readinessDegree)) || Number(division.readinessDegree) < 0 ||
              Number(division.readinessDegree) > 100) {
              this.errReadnis1 = 'Значение готовности должно быть в пределах от 0 до 100';
            } else {
              if (division.dateEnd !== null && division.dateStart !== null && division.dateEnd < division.dateStart) {
                this.errCreateDate = 'Дата начала не может быть позже даты конца';
              } else {
                if (division.realDateEnd !== null && division.dateStart !== null && division.realDateEnd < division.dateStart) {
                  this.errCreateDate = 'Дата начала не может быть позже планируемой даты конца';
                } else {
                  this.errCreateDate = null;
                  this.errReadnis1 = null;
                  this.errImportant1 = null;
                  if (resp[0] === true && resp[1] === true && resp[2] === true) {
                    this.errCreate = null;
                    return this.service.create(division).subscribe();
                  }
                }
              }
            }
          }
        }
      );
    }
  }

  public update(division: Stage) {
    this.service.checkStage(division.responsibleId, division.taskId, division.nameId).subscribe(resp => {
        this.checkEmployeeSave = resp[0];
        this.checkTaskSave = resp[1];
        this.checkNSSave = resp[2];

        if (isNaN(Number(division.importance)) || Number(division.importance) < 0) {
          this.errImportant2 = 'Значение важности должно быть числом больше 0';
        } else {
          if (isNaN(Number(division.readinessDegree)) || Number(division.readinessDegree) < 0 ||
            Number(division.readinessDegree) > 100) {
            this.errReadnis2 = 'Значение готовности должно быть в пределах от 0 до 100';
          } else {
            if (division.dateEnd !== null && division.dateStart !== null && division.dateEnd < division.dateStart) {
              this.errUpdateDate = 'Дата начала не может быть позже даты конца';
            } else {
              if (division.realDateEnd !== null && division.dateStart !== null && division.realDateEnd < division.dateStart) {
                this.errUpdateDate = 'Дата начала не может быть позже планируемой даты конца';
              } else {
                this.errUpdateDate = null;
                this.errImportant2 = null;
                this.errReadnis2 = null;
                if (resp[0] === true && resp[1] === true && resp[2] === true) {
                  return this.service.update(division).subscribe();
                }
              }
            }
          }
        }
      }
    );
  }

  getFullName() {
    for (const stage of this.allStage) {
      for (const name of this.allNameOfStage) {
        if (stage.nameId === name.id) {
          stage.name = name.name;
        }
      }
    }
  }

  public selectStage(division: Stage) {
    this.selectedStage = division;
  }

}
