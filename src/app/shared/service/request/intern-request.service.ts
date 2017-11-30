import {HttpClient} from '@angular/common/http';
import { Http, Response, Headers } from '@angular/http';
import 'rxjs/Rx';
import { Observable } from 'rxjs/Observable';
import { Injectable } from '@angular/core';

@Injectable()
export class InternRequestService {

  constructor(private http: Http) { }

  public getInterns() {
    return this.http.get('http://165.227.179.52:3000/interns')
    .map( (response: Response) => {
        return response.json();
    }).catch( (error: Response) => {
      return Observable.throw(JSON.parse(error['_body']));
    });
}

public deleteIntern(id: number) {
  return this.http.delete(`http://165.227.179.52:3000/interns/${id.toString()}`).map((response: Response) => {
    return response.json();
  }).catch( (error: Response) => {
    return Observable.throw('Something went wrong!');
  });
}

public createIntern (newIntern) {
  const headers = new Headers({'Content-Type': 'application/json'});
  console.log('en post: ' + newIntern)
  return this.http.post(`http://165.227.179.52:3000/interns`, newIntern, {headers: headers})
  .map((response: Response) => {
    return response.json();
  });
}

public updateIntern(id: number, internToUpdate) {
  if (id >= 0 ) {
      const headers = new Headers({'Content-Type': 'application/json'});
      return this.http.put(`http://165.227.179.52:3000/interns/${id.toString()}`, internToUpdate, {headers: headers})
      .map((response: Response) => {
        return response.json();
      });
  }
}

}
