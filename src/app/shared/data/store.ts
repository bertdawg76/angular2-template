import { Observable } from 'rxjs/Observable';
import { ReplaySubject } from 'rxjs/ReplaySubject';
import 'rxjs/add/observable/combineLatest';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/startWith';
import 'rxjs/add/operator/pluck';
import 'rxjs/add/operator/scan';

import { HttpService, APIConfigService } from '../services';


const ADD_OR_UPDATE = 'ADD_OR_UPDATE';
const DESTROY = 'DESTROY';
const reducer = (state, action) => {
  switch (action.type) {
    case ADD_OR_UPDATE:
      return Object.assign({}, state, action.payload);
    case DESTROY:
      let newState = Object.assign({}, state);
      delete newState[action.payload.id];
      return newState;
    default:
      return state;
  }
};


export class Record {
  constructor (newRecord: any) { Object.assign(this, newRecord); }
}


interface RecordConstructor {
  new (any): Record;
}


interface ListResponse {
  results: Array<any>;
  count: number;
  previous: string;
  next: string;
}


export class Store {
  private http: HttpService;
  private recordClass: RecordConstructor;
  private name: string;
  private endpoint: string;
  private apiConfig = new APIConfigService();
  private action$ = new ReplaySubject();
  private store$ = this.action$.startWith({}).scan(reducer, {});
  private dispatch (action) { this.action$.next(action); }

  constructor (http: HttpService, recordClass) {
    this.http = http;
    this.recordClass = recordClass;
    this.name = recordClass.name;
    this.endpoint = (new recordClass())._meta.endpoint;
  }

  create (body) {
    return this.http.post(`${this.apiConfig.apiUrl}/${this.endpoint}`, body)
      .map(newItem => new this.recordClass(newItem))
      .do(newRecord => {
        this.dispatch({
          type: ADD_OR_UPDATE,
          payload: {[newRecord.id]: newRecord}
        });
      });
  }

  read (id: number|string, bypassCache = false) {
    return this.store$
      .pluck(`${id}`)
      .distinctUntilChanged()
      .flatMap(possibleRecord => {
        if (!possibleRecord || bypassCache) {
          this.http.get(`${this.apiConfig.apiUrl}/${this.endpoint}/${id}/`)
            .subscribe(response => {
              this.dispatch({
                type: ADD_OR_UPDATE,
                payload: {[response.id]: new this.recordClass(response)}
              });
            });
        }
        return Observable.of(possibleRecord);
      })
      .filter((record: any) => record);
  }

  readList (params = {}) {
    return this.http.get(`${this.apiConfig.apiUrl}/${this.endpoint}/`, params)
      .map((response: ListResponse) => {
        const results = Object.assign(response.results.map(item => new this.recordClass(item)), {
          count: response.count,
          next: response.next,
          previous: response.previous,
        });
        this.dispatch({
          type: ADD_OR_UPDATE,
          payload: results.reduce((acc, cur: any) => Object.assign({}, acc, {[cur.id]: new this.recordClass(cur)}), {})
        });
        return results;
      });
  }

  readListPaged (params = {}) {
    return this.http.get(`${this.apiConfig.apiUrl}/${this.endpoint}/`, params)
      .flatMap((firstPageResponse: ListResponse) => {
        const obsList: Array<Observable<any>> = [Observable.of(firstPageResponse.results)];
        if (firstPageResponse.next) {
          // construct each page url for each existing page, starting at 2
          for (let i = 2; i <= Math.ceil(firstPageResponse.count / firstPageResponse.results.length); i++) {
            const obs = this.http.get(`${this.apiConfig.apiUrl}/books/`, Object.assign(params, {page: i}))
              .map((nextPageObj: ListResponse) => nextPageObj.results);
            obsList.push(obs);
          }
        }
        return Observable.combineLatest(obsList)
          .map(nestedArr => nestedArr
            .reduce((acc, cur) => acc.concat(cur), [])
            .map(item => new this.recordClass(item)))
          .do(results => {
            this.dispatch({
              type: ADD_OR_UPDATE,
              payload: results.reduce((acc, cur) => Object.assign({}, acc, {[cur.id]: cur}), {})
            });
          });
      });
  }

  update (id: number|string, body, patch = true) {
    const method = patch ? 'patch' : 'put';
    return this.http[method](`${this.apiConfig.apiUrl}/${this.endpoint}/${id}/`, body)
      .map(updatedItem => new this.recordClass(updatedItem))
      .do(updatedRecord => {
        this.dispatch({
          type: ADD_OR_UPDATE,
          payload: {[updatedRecord.id]: updatedRecord}
        });
      });
  }

  destroy (idToDelete: number|string) {
    return this.http.delete(`${this.apiConfig.apiUrl}/${this.endpoint}/${idToDelete}/`)
      .map((deletedId: number|string) => {
        const id = deletedId || idToDelete;
        this.dispatch({
          type: DESTROY,
          payload: {id}
        });
        return id;
      });
  }
}
