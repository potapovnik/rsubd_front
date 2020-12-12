import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Employee} from '../entity/Employee';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  private division = '/api/employee';
  private head = new HttpHeaders().set('Content-Type', 'application/json');

  constructor(private http: HttpClient) {
  }

  getAllEmployee(): Observable<Employee[]> {
    const url = this.division + '/all';
    console.log(url + '- get all');
    return this.http.get<Employee[]>(url, {headers: this.head});
  }

  create(division: Employee): Observable<Employee> {
    const url = this.division;
    console.log(url + '- add');
    return this.http.post<Employee>(url, division, {headers: this.head});
  }

  delete(id: number): Observable<Employee> {
    const url = this.division + '/' + id;
    console.log(url + 'delete');
    return this.http.delete<Employee>(url, {headers: this.head});
  }

  update(division: Employee): Observable<Employee[]> {
    const url = this.division;
    console.log(url + 'put');
    return this.http.put<Employee[]>(url, division, {headers: this.head});
  }

  check(id: number): Observable<boolean> {
    const url = '/api/check/employee' + '?id=' + id;
    console.log(url + 'put');
    return this.http.get<boolean>(url, {headers: this.head});
  }

}
