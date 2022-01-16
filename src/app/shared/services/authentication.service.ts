import { Injectable } from '@angular/core';
import {OAuthService} from 'angular-oauth2-oidc';
import {BehaviorSubject, Observable, of, Subject} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../environments/environment.prod';
import {catchError} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  temp = new BehaviorSubject<boolean>(false);
  appKey = new BehaviorSubject<string>(null);

  constructor(private oauthService: OAuthService, private http: HttpClient) {
  }

  login(): boolean {
    this.oauthService.initCodeFlow();
    return true;
  }

  logout() {
    this.oauthService.logOut();
    location.reload();
  }

  isLoggedIn() {
    const res = this.oauthService.hasValidAccessToken() &&
      this.oauthService.hasValidIdToken();
    this.temp.next(res)
    return res;
  }

  checkAppKey(key: string): Observable<{ appKey: string }> {
    const res = this.http.get<{appKey: string}>(`${environment.server}/Client/${key}`)
      .pipe(catchError(e => {
        return of(null);
      }));
    res.subscribe(r => {
      if (r === null) {
        this.appKey.next(null);
      } else {
        this.appKey.next(r.appKey);
        sessionStorage.setItem('AaaS.appKey', r.appKey);
      }
    });
    return res;

  }
}
