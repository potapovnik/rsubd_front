import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Division} from '../entity/division';

@Injectable({
  providedIn: 'root'
})
export class Service {
  private division = '/api/division';
  private head = new HttpHeaders().set('Content-Type', 'application/json');

  constructor(private http: HttpClient) {
  }

  getAllDivision(): Observable<Division[]> {
    const url = this.division + '/all';
    console.log(url + '- get all');
    return this.http.get<Division[]>(url, {headers: this.head});
  }

  create(division: Division): Observable<Division> {
    const url = this.division;
    console.log(url + '- add');
    return this.http.post<Division>(url, division, {headers: this.head});
  }

  delete(id: number): Observable<Division> {
    const url = this.division + '/' + id;
    console.log(url + 'delete');
    return this.http.delete<Division>(url, {headers: this.head});
  }

  update(division: Division): Observable<Division[]> {
    const url = this.division;
    console.log(url + 'put');
    return this.http.put<Division[]>(url, division, {headers: this.head});
  }
}
