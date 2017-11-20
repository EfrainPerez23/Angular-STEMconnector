import {HttpClient} from '@angular/common/http';
import { Http, Response, Headers } from '@angular/http';
import 'rxjs/Rx';
import { Observable } from 'rxjs/Observable';
import { Injectable } from '@angular/core';

@Injectable()
export class InitiativeRequestService {

  constructor(private http: Http) { }

  public createInitiative (newInitiative: {name: string, description: string, imageUrl: string}) {
        const headers = new Headers({'Content-Type': 'application/json'});
        return this.http.post(`http://165.227.179.52:3000/initiatives/`, newInitiative, {headers: headers})
        .map((response: Response) => {
          return response.json();
        });
    }
  public deleteInitiative(id: number) {
        return this.http.delete(`http://165.227.179.52:3000/initiatives/${id.toString()}`).map((response: Response) => {
          return response.json();
        }).catch( (error: Response) => {
          return Observable.throw('Something went wrong!');
        });
  }


  public getInitiatives() {
        return this.http.get('http://165.227.179.52:3000/initiatives')
        .map( (response: Response) => {
            return response.json();
        }).catch( (error: Response) => {
          return Observable.throw(JSON.parse(error['_body']));
        });
  }

  public updateInitiative(id: number, initiativeToUpdate: {name: string, description: string, imageUrl: string}) {
        if (id >= 0 ) {
            const headers = new Headers({'Content-Type': 'application/json'});
            return this.http.put(`http://165.227.179.52:3000/initiatives/${id.toString()}`, initiativeToUpdate, {headers: headers})
            .map((response: Response) => {
              return response.json();
            });
    }
  }

}
