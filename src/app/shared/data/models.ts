import { Injectable } from '@angular/core';
import { HttpService } from '../services';
import { Store, Record } from './store';


@Injectable()
export class Data {

  public User = new Store(
    this.http,
    class User extends Record { private _meta = {endpoint: 'users'}; },
  );

  constructor (private http: HttpService) {}
}
