import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable, of} from 'rxjs';
import {Detector} from '../domain/detector/detector';
import {environment} from '../../../environments/environment.prod';
import {catchError} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class DetectorService {

  constructor(private http: HttpClient) { }

  private errorHandler(error: Error | any): Observable<any> {
    console.log(error);
    return of(null);
  }

  update(detector: Detector): Observable<any> {
    const res = this.http.put<any>(`${environment.server}/Detector`, detector)
      .pipe(catchError(this.errorHandler));
    res.subscribe()
    return res;
  }

  get(appKey: string, name?: string): Observable<Detector[]> {
    if (name) {
      return this.http.get<Detector[]>(`${environment.server}/Detector?appkey=${appKey}&name=${name}`)
        .pipe(catchError(this.errorHandler));
    }
    return this.http.get<Detector[]>(`${environment.server}/Detector?appkey=${appKey}`)
      .pipe(catchError(this.errorHandler));
  }

  delete(appKey: string, id: number): Observable<any> {
    return this.http.delete(`${environment.server}/Detector/${id}?appkey=${appKey}`)
      .pipe(catchError(this.errorHandler));
  }

  post(detector: Detector): Observable<Detector> {
    return this.http.post(`${environment.server}/Detector`, detector)
      .pipe(catchError(this.errorHandler));
  }
}
