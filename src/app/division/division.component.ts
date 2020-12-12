import {Component, OnInit} from '@angular/core';
import {Division} from '../entity/division';
import {Service} from './service';

@Component({
  selector: 'app-division',
  templateUrl: './division.component.html',
  styleUrls: ['./division.component.scss']
})
export class DivisionComponent implements OnInit {

  allDivision: Division[];
  selectedDivision: Division;
  createdDivision: Division;
  errCreate: String;
  errUpdate: String;
  errDivision: String;
  errDivisionUpdate: String;

  ngOnInit() {
    this.getAllDivision();
    this.selectedDivision = new Division();
    this.createdDivision = new Division();
  }

  constructor(private service: Service) {
  }

  public getAllDivision() {
    return this.service.getAllDivision().subscribe(resp => this.allDivision = resp);
  }

  public delete(division: Division) {
    return this.service.delete(division.id).subscribe();
  }

  public save(division: Division) {
    division.name = division.name.trim();
    if (division.name === '' || division.name === null || division.name === undefined) {
      this.errCreate = 'Не может быть пустого имени отдела';
    } else {
      return this.service.create(division).subscribe(error => {
      }, err => {
        this.errDivision = err.error.message;
      });
    }
  }

  public update(division: Division) {
    division.name = division.name.trim();
    if (division.name === '' || division.name === null || division.name === undefined) {
      this.errUpdate = 'Не может быть пустого имени отдела';
    } else {
      return this.service.update(division).subscribe(error => {
      }, err => {
        this.errDivisionUpdate = 'Такое имя уже существует';
      });
    }
  }

  public selectDivision(division: Division) {
    this.selectedDivision = JSON.parse(JSON.stringify(division));
  }

}
