import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
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

  save(entity: Entity): Observable<Object> {
    const url = environment.baseUrl + '/' + entity.getEntityName();
    return this.http.post(url, entity);
  }


}
