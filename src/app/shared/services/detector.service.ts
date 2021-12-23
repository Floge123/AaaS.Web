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
    console.log("detector")
    console.log(detector);
    return this.http.put<any>(`${environment.server}/Detector`, detector)
      .pipe(catchError(this.errorHandler));
  }

  get(appKey: string, name?: string): Observable<Detector[]> {
    if (name) {
      return this.http.get<Detector[]>(`${environment.server}/Detector?appkey=${appKey}&name=${name}`)
        .pipe(catchError(this.errorHandler));
    }
    return this.http.get<Detector[]>(`${environment.server}/Detector?appkey=${appKey}`)
      .pipe(catchError(this.errorHandler));
  }
}
