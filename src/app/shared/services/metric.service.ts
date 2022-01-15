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

  private static errorHandler(error: Error | any): Observable<any> {
    console.log(error);
    return of(null);
  }

  constructor(private http: HttpClient) { }

  getNames(appKey: string): Observable<string[]> {
    return this.http.get<string[]>(`${environment.server}/Metric/Names?appKey=${appKey}`)
      .pipe(catchError(MetricService.errorHandler));
  }

  getByFilter(appKey: string, name?: string, clientId?: string): Observable<Metric[]> {
    if (!name) {
      if (!clientId) {
        return this.http.get<Metric[]>(`${environment.server}/Metric?appKey=${appKey}`)
          .pipe(catchError(MetricService.errorHandler));
      }
      // filter for clientId
      return this.http.get<Metric[]>(`${environment.server}/Metric?appKey=${appKey}&clientId=${clientId}`)
        .pipe(catchError(MetricService.errorHandler));
    }
    if (!clientId) {
      // filter for name
      return this.http.get<Metric[]>(`${environment.server}/Metric?appKey=${appKey}&metricName=${name}`)
        .pipe(catchError(MetricService.errorHandler));
    }
    // filter for both
    return this.http.get<Metric[]>(`${environment.server}/Metric?appKey=${appKey}&metricName=${name}&clientId=${clientId}`)
      .pipe(catchError(MetricService.errorHandler));
  }
}
