import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';

import { Observable } from 'rxjs/Observable';
import { ReplaySubject } from 'rxjs/ReplaySubject';
import 'rxjs/add/operator/mergeMap';

import { LocalStorageService } from './storage.service';
import { HttpService } from './http.service';
import { APIConfigService } from './config.service';
import { Data } from '../data';


interface ResponseToken {
  token: string;
  id: string;
};


@Injectable()
export class AuthService {
  private authTokenHeader = 'Authorization';
  private user: any = {};
  private userSubject$ = new ReplaySubject<any>();
  public user$ = this.userSubject$.asObservable();

  constructor(
    private storage: LocalStorageService,
    private http: HttpService,
    private apiConfig: APIConfigService,
    private data: Data, )
  {

    const storedUser: ResponseToken = storage.getObj('user');
    if (storedUser) {
      this.setAuthToken(storedUser.token);
      this.getUser(storedUser.id).subscribe();
    }
  }

  public login(username: string, password: string): Observable<any> {
    this.http.resetHeaders();
    const request = this.http.post(this.apiConfig.authTokenUrl, { username, password });

    return request.flatMap((response: ResponseToken) => {
      this.storage.setObj('user', response);
      this.setAuthToken(response.token);
      return this.getUser(response.id);
    });
  }

  public isLoggedIn(): boolean {
    const lUser = this.storage.getObj('user');
    return !!(this.user.id || lUser);
  }

  public logout(): void {
    this.http.clearToken(this.authTokenHeader);
    this.user = {};
    this.storage.removeItem('user');
    this.userSubject$.next(this.user);
  }

  public getUser(id: string): Observable<Object> {
    return this.data.User.read(id).do((user: any) => {
      this.user = user;
      this.userSubject$.next(this.user);
    });
  }

  public resetPassword (email: string): Observable<Object> {
    return this.http.post(`${this.apiConfig.resetPasswordUrl}/${email}`, {});
  }

  private setAuthToken(token: string): void {
    this.http.updateHeader(this.authTokenHeader, 'Token ' + token);
  }
}

@Injectable()
export class CanActivateViaAuthGuard implements CanActivate {
  constructor(private auth: AuthService, private router: Router) {}
  public canActivate() {
    let worthy = this.auth.isLoggedIn(); // protect the realms of AuthGuard
    if (!worthy) {
      this.router.navigate(['/login']);
    }
    return worthy;
  }
}
