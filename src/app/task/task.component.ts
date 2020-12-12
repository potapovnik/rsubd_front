import {Component, OnInit} from '@angular/core';
import {Task} from '../entity/Task';
import {TaskService} from './taskService';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.scss']
})
export class TaskComponent implements OnInit {

  allTask: Task[];
  selectedTask: Task;
  createdTask: Task;
  errUpdate: String;
  errCreate: String;
  errName: String;
  errNameUpdate: String;
  errCreateDate: String;
  errUpdateDate: String;

  ngOnInit() {
    this.getAllTask();
    this.selectedTask = new Task();
    this.createdTask = new Task();
    this.errUpdate = null;
    this.errCreate = null;
  }

  constructor(private service: TaskService) {
  }

  public getAllTask() {
    return this.service.getAllTask().subscribe(resp => this.allTask = resp);
  }

  public delete(division: Task) {
    return this.service.delete(division.id).subscribe();
  }

  public save(division: Task) {
    division.name = division.name.trim();
    if (division.name === '' || division.name === null || division.name === undefined) {
      this.errCreate = 'Не может быть пустого имени задания';
    } else {
      if (division.dateEnd !== null && division.dateStart !== null && division.dateEnd < division.dateStart) {
        this.errCreateDate = 'Дата начала не может быть позже даты конца';
      } else {
        if (division.realDateEnd !== null && division.dateStart !== null && division.realDateEnd < division.dateStart) {
          this.errCreateDate = 'Дата начала не может быть позже планируемой даты конца';
        } else {
          this.errCreate = null;
          this.errCreateDate = null;
          return this.service.create(division).subscribe(
            error => {
            }, err => {
              this.errName = err.error.message;
            }
          );
        }
      }
    }
  }

  public update(division: Task) {
    division.name = division.name.trim();
    if (division.name === '' || division.name === null || division.name === undefined) {
      this.errUpdate = 'Не может быть пустого имени задания';
    } else {
      if (division.dateEnd !== null && division.dateStart !== null && division.dateEnd < division.dateStart) {
        this.errUpdateDate = 'Дата начала не может быть позже даты конца';
      } else {
        if (division.realDateEnd !== null && division.dateStart !== null && division.realDateEnd < division.dateStart) {
          this.errUpdateDate = 'Дата начала не может быть позже планируемой даты конца';
        } else {
          this.errUpdate = null;
          this.errUpdateDate = null;
          return this.service.update(division).subscribe(error => {
          }, err => {
            this.errNameUpdate = 'Такое имя уже существует';
          });
        }
      }
    }
  }

  public selectTask(division: Task) {
    this.selectedTask = JSON.parse(JSON.stringify(division));
  }
}
