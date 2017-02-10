import {Injectable} from '@angular/core';
import {Http, Response, Headers, RequestOptions } from '@angular/http';
import {Observable} from 'rxjs/Observable';
import {Router} from '@angular/router';
import {HttpService} from './http.service';
import {Cats} from '../../cats/cat';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()

export class CatService {

  private catUrl = 'http://localhost:8000/api/cats/';

  constructor(private http: HttpService){}

  getCats(): Observable<Cats[]>{
    let headers = new Headers({'Content-Type': 'application/json'});
    let options = new RequestOptions({headers: headers});
    return this.http.get(this.catUrl)
      .map(data => data.results)
      .catch(this.handleError);
  }




  private extractData(res: Response) {
    let body = res.json();
    console.log(body);
    return body || {};
  }

  private handleError (error: any) {
    let errMsg = (error.message) ? error.message :
      error.status ? '${error.status} - ${error.statusText}' : 'Server error';
    console.log(errMsg);
    return Observable.throw(errMsg);
  }

}
