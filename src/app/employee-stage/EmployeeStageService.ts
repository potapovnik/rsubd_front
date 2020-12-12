import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Employee} from '../entity/Employee';
import {EmployeeStage} from '../entity/EmployeeStage';

@Injectable({
  providedIn: 'root'
})
export class EmployeeStageService {
  private division = '/api/employeeStage';
  private head = new HttpHeaders().set('Content-Type', 'application/json');

  constructor(private http: HttpClient) {
  }

  getAllEmployeeStage(): Observable<EmployeeStage[]> {
    const url = this.division + '/all';
    console.log(url + '- get all');
    return this.http.get<EmployeeStage[]>(url, {headers: this.head});
  }

  create(division: EmployeeStage): Observable<EmployeeStage> {
    const url = this.division;
    console.log(url + '- add');
    return this.http.post<EmployeeStage>(url, division, {headers: this.head});
  }

  delete(id: number): Observable<EmployeeStage> {
    const url = this.division + '/' + id;
    console.log(url + 'delete');
    return this.http.delete<EmployeeStage>(url, {headers: this.head});
  }

  update(division: EmployeeStage): Observable<EmployeeStage[]> {
    const url = this.division;
    console.log(url + 'put');
    return this.http.put<EmployeeStage[]>(url, division, {headers: this.head});
  }
  check(id1: number, id2: number): Observable<boolean[]> {
    const url = '/api/check/employeeStage' + '?empl=' + id1 + '&stage=' + id2;
    console.log(url + 'put');
    return this.http.get<boolean[]>(url, {headers: this.head});
  }
}
