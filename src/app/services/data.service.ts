import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Entity } from '../data.types';
import { UiService } from '../common/ui.service';
import { catchError } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private http: HttpClient) { }

  save(entity: Entity, link: string): Observable<any> {

    if (!link) {
      return this.post(entity);
    } else {
      return this.update(entity, link);
    }
  }

  post(entity: Entity): Observable<any> {
    const url = environment.baseUrl + '/' + entity.getEntityName();
    return this.http.post(url, entity);
  }

  update(entity: Entity, link: string): Observable<any> {
    return this.http.put(link, entity);
  }

  list(entity: Entity, param: IHttpParameters): Observable<any> {
    const url = environment.baseUrl + '/' + entity.getEntityName();

    let params = new HttpParams().set('page', param.page.toString())
      .set('size', param.size.toString());

    param.filters?.filter(f => f).map(v => params = params.set(v.fieldName, v.value));
    param.sorts?.map(v => params = params.set('sort', `${v.fieldName},${v.direction}`));

    return this.http.get(url, {
      params
    });
  }

  get(link: string): Observable<any> {
    return this.http.get(link);
  }

  delete(link: string) {
    this.http.delete(link);
  }

}


export interface IHttpParameters {
  page: number;
  size: number;
  sorts?: ISort[];
  filters?: IFilter[];
}

export interface ISort {
  fieldName: string;
  direction: string | Direction.ASC;
}

export interface IFilter {
  fieldName: string;
  value: string;
}

export enum Direction {
  DESC = 'desc',
  ASC = 'asc'
}
