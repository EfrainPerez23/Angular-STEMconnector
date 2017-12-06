import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { Http, Response, Headers } from '@angular/http';
import 'rxjs/Rx';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class AdminRequestService {

  constructor(private http: Http) { }
  public getCheck() {
    return this.http.get('http://165.227.179.52:3000/admin/check')
    .map( (response: Response) => {
        return response.json();
    }).catch( (error: Response) => {
      return Observable.throw(JSON.parse(error['_body']));
    });
  }

}
