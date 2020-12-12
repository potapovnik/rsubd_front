import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {NameStage} from '../entity/NameStage';
import {Task} from '../entity/Task';
import {Stage} from '../entity/Stage';

@Injectable({
  providedIn: 'root'
})
export class StageService {
  private task = 'api/stage';
  private head = new HttpHeaders().set('Content-Type', 'application/json');

  constructor(private http: HttpClient) {
  }

  getAllStage(): Observable<Stage[]> {
    const url = this.task + '/all';
    console.log(url + '- get all');
    return this.http.get<Stage[]>(url, {headers: this.head});
  }

  create(division: Stage): Observable<Stage> {
    const url = this.task;
    console.log(url + '- add');
    return this.http.post<Stage>(url, division, {headers: this.head});
  }

  delete(id: number): Observable<Stage> {
    const url = this.task + '/' + id;
    console.log(url + 'delete');
    return this.http.delete<Stage>(url, {headers: this.head});
  }

  update(division: Stage): Observable<Stage[]> {
    const url = this.task;
    console.log(url + 'put');
    return this.http.put<Stage[]>(url, division, {headers: this.head});
  }

  checkStage(id1: number, id2: number, id3: number): Observable<boolean[]> {
    const url = '/api/check/stage' + '?empl=' + id1 + '&task=' + id2 + '&name=' + id3;
    console.log(url + 'get check');
    return this.http.get<boolean[]>(url, {headers: this.head});
  }
}
