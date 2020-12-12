import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {NameStage} from '../entity/NameStage';

@Injectable({
  providedIn: 'root'
})
export class NameStageService {
  private nameStage = 'api/nameStage';
  private head = new HttpHeaders().set('Content-Type', 'application/json');

  constructor(private http: HttpClient) {
  }

  getAllNameStage(): Observable<NameStage[]> {
    const url = this.nameStage + '/all';
    console.log(url + '- get all');
    return this.http.get<NameStage[]>(url, {headers: this.head});
  }

  create(division: NameStage): Observable<NameStage> {
    const url = this.nameStage;
    console.log(url + '- add');
    return this.http.post<NameStage>(url, division, {headers: this.head});
  }

  delete(id: number): Observable<NameStage> {
    const url = this.nameStage + '/' + id;
    console.log(url + 'delete');
    return this.http.delete<NameStage>(url, {headers: this.head});
  }

  update(division: NameStage): Observable<NameStage[]> {
    const url = this.nameStage;
    console.log(url + 'put');
    return this.http.put<NameStage[]>(url, division, {headers: this.head});
  }
}
