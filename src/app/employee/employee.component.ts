import {Component, OnInit} from '@angular/core';
import {Division} from '../entity/division';
import {Service} from '../division/service';
import {Employee} from '../entity/Employee';
import {EmployeeService} from './EmployeeService';
import {Boss} from './boss';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.scss']
})
export class EmployeeComponent implements OnInit {

  allEmployee: Employee[];
  allDivision: Division[];
  selectedEmployee: Employee;
  createdEmployee: Employee;
  checkOnSave = true;
  checkOnCreate = true;
  checkCreateIsBoss = true;
  checkSaveIsBoss = true;
  variableBoss: Boss[];
  err1: String;
  err11: String;
  err2: String;
  err22: String;

  ngOnInit() {
    const trueB = new Boss();
    trueB.bool = true;
    trueB.boss = 'Началник';
    const falseB = new Boss();
    falseB.bool = false;
    falseB.boss = 'Подчинённый';
    this.variableBoss = [trueB, falseB];
    this.getAllEmployee();
    this.getAll();
    this.selectedEmployee = new Employee();
    this.createdEmployee = new Employee();
    this.err1 = null;
    this.err2 = null;
    this.err11 = null;
    this.err22 = null;
  }

  constructor(private service: EmployeeService, private divisionService: Service) {

  }

  public getAllEmployee() {
    return this.service.getAllEmployee().subscribe(resp => this.allEmployee = resp);
  }

  public delete(division: Employee) {
    return this.service.delete(division.id).subscribe();
  }

  public getAll() {
    return this.divisionService.getAllDivision().subscribe(resp => this.allDivision = resp);
  }

  public save(division: Employee) {
    division.name = division.name.trim();
    division.surname = division.surname.trim();
    if (division.name === '' || division.name === null || division.name === undefined) {
      this.err1 = 'Не может быть пустого имени пользователя';
    } else {
      if (division.isBoss === undefined || division.isBoss === null) {
        division.isBoss = false;
      }
      if (division.divisionId === null || division.divisionId === undefined) {
        this.err22 = 'id отдела не может быть пустым';
      } else {
        this.err1 = null;
        this.err22 = null;
        return this.service.create(division).subscribe();
      }
    }
  }

  public update(division: Employee) {
    division.name = division.name.trim();
    division.surname = division.surname.trim();
    this.service.check(division.divisionId).subscribe(resp => {
      this.checkOnSave = resp;
      if (division.name === '' || division.name === null || division.name === undefined) {
        this.err2 = 'Не может быть пустого имени пользователя';
      } else {
        if (this.checkOnSave === true) {
          if (division.isBoss.toLocaleString() === 'true' || division.isBoss.toLocaleString() === 'false') {
            this.checkSaveIsBoss = true;
            this.err2 = null;
            return this.service.update(division).subscribe();
          } else {
            this.checkSaveIsBoss = false;
          }
        }
      }
    });
  }

  public selectEmployee(division: Employee) {
    this.selectedEmployee = division;
  }

}
