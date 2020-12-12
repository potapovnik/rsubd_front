import {Component, OnInit} from '@angular/core';
import {NameStage} from '../entity/NameStage';
import {NameStageService} from './NameStageService';

@Component({
  selector: 'app-name-stage',
  templateUrl: './name-stage.component.html',
  styleUrls: ['./name-stage.component.scss']
})
export class NameStageComponent implements OnInit {


  allNameStage: NameStage[];
  selectedNameStage: NameStage;
  createdNameStage: NameStage;
  errCreate: String;
  errUpdate: String;
  errName: String;
  errNameUpdate: String;
  constructor(private serNameStage: NameStageService) {
  }

  ngOnInit() {

    this.getAllNameStage();
    this.selectedNameStage = new NameStage();
    this.createdNameStage = new NameStage();
  }

  public getAllNameStage() {
    return this.serNameStage.getAllNameStage().subscribe(resp => this.allNameStage = resp);
  }

  public delete(division: NameStage) {
    return this.serNameStage.delete(division.id).subscribe();
  }

  public save(division: NameStage) {
    division.name = division.name.trim();
    if (division.name === '' || division.name === null || division.name === undefined) {
      this.errCreate = 'Не может быть пустого имени этапа';
    } else {
      this.errCreate = null;
      return this.serNameStage.create(division).subscribe(error => {
      }, err => {
        this.errName = err.error.message;
      });
    }
  }

  public update(division: NameStage) {
    division.name = division.name.trim();
    if (division.name === '' || division.name === null || division.name === undefined) {
      this.errUpdate = 'Не может быть пустого имени этапа';
    } else {
      this.errUpdate = null;
      return this.serNameStage.update(division).subscribe(error => {
      }, err => {
        this.errNameUpdate = 'Такое имя уже существует';
      });
    }
  }

  public selectNameStage(division: NameStage) {
    this.selectedNameStage = JSON.parse(JSON.stringify(division));
  }

}
