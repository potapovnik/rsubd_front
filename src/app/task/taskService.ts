import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {NameStage} from '../entity/NameStage';
import {Task} from '../entity/Task';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  private task = 'api/task';
  private head = new HttpHeaders().set('Content-Type', 'application/json');

  constructor(private http: HttpClient) {
  }

  getAllTask(): Observable<Task[]> {
    const url = this.task + '/all';
    console.log(url + '- get all');
    return this.http.get<Task[]>(url, {headers: this.head});
  }

  create(division: Task): Observable<Task> {
    const url = this.task;
    console.log(url + '- add');
    return this.http.post<Task>(url, division, {headers: this.head});
  }

  delete(id: number): Observable<Task> {
    const url = this.task + '/' + id;
    console.log(url + 'delete');
    return this.http.delete<Task>(url, {headers: this.head});
  }

  update(division: Task): Observable<Task[]> {
    const url = this.task;
    console.log(url + 'put');
    return this.http.put<Task[]>(url, division, {headers: this.head});
  }
}
