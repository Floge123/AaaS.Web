import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable, of} from 'rxjs';
import {environment} from '../../../environments/environment.prod';
import {Log} from '../domain/log/log';
import {catchError} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class LogService {

  private static errorHandler(error: Error | any): Observable<any> {
    console.log(error);
    return of(null);
  }

  constructor(private http: HttpClient) { }

  getByFilter(appKey: string, searchTerm: string): Observable<Log[]> {
    return this.http.get<Log[]>(`${environment.server}/Log?appkey=${appKey}&searchTerm=${searchTerm}`)
      .pipe(catchError(LogService.errorHandler));
  }
}
