import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable, of} from 'rxjs';
import {environment} from '../../../environments/environment.prod';
import {catchError, map} from 'rxjs/operators';
import {ClientInstance} from '../domain/client-instance/client-instance';

@Injectable({
  providedIn: 'root'
})
export class ClientInstanceService {

  private static errorHandler(error: Error | any): Observable<any> {
    console.log(error);
    return of(null);
  }

  constructor(private http: HttpClient) { }

  getAllInstances(appKey: string): Observable<string[]> {
    return this.http.get<ClientInstance[]>(`${environment.server}/ClientInstance?appKey=${appKey}`)
      .pipe(map((ci: ClientInstance[]) => ci.map(c => c.clientId)))
      .pipe(catchError(ClientInstanceService.errorHandler));
  }
}
