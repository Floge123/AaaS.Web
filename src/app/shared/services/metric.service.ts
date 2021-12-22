import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from 'environments/environment.prod';
import { Metric } from '../domain/metric';

@Injectable({
  providedIn: 'root'
})
export class MetricService {
  metrics: Metric[] = [];

  constructor(private http: HttpClient) { }

  private errorHandler(error: Error | any): Observable<any> {
    console.log(error);
    return of(null);
  } 

  getAll(appKey: string): Observable<Metric[]> {
    return this.http.get<Metric[]>(`${environment.server}/Metric?appKey=${appKey}`)
      .pipe(catchError(this.errorHandler));
  }

  getByFilter(appKey: string, name?: string, clientId?: string): Observable<Metric[]> {
    if (name === null) {
      if (clientId === null) {
        return this.http.get<Metric[]>(`${environment.server}/Metric?appKey=${appKey}`)
          .pipe(catchError(this.errorHandler));
      }
      //filter for clientId
      return this.http.get<Metric[]>(`${environment.server}/Metric?appKey=${appKey}&clientId=${clientId}`)
        .pipe(catchError(this.errorHandler));
    }
    if (clientId === null) {
      //filter for name
      return this.http.get<Metric[]>(`${environment.server}/Metric?appKey=${appKey}&metricName=${name}`)
        .pipe(catchError(this.errorHandler));
    }
    //filter for both
    return this.http.get<Metric[]>(`${environment.server}/Metric?appKey=${appKey}&metricName=${name}&clientId=${clientId}`)
      .pipe(catchError(this.errorHandler));
  }
}
