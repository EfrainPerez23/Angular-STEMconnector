import {HttpClient} from '@angular/common/http';
import { Http, Response, Headers } from '@angular/http';
import 'rxjs/Rx';
import { Observable } from 'rxjs/Observable';
import { Injectable } from '@angular/core';

@Injectable()
export class ActivityPointRequestService {

  constructor(private http: Http) { }

  public getActivityPoints() {
    return this.http.get('http://165.227.179.52:3000/activityPoint')
    .map( (response: Response) => {
        return response.json();
    }).catch( (error: Response) => {
      return Observable.throw(JSON.parse(error['_body']));
    });
  }

  public createActivityPoint (newActivityPoint) {
      const headers = new Headers({'Content-Type': 'application/json'});
      return this.http.post(`http://165.227.179.52:3000/activityPoint/`, newActivityPoint, {headers: headers})
      .map((response: Response) => {
      return response.json();
      });
    }

    public updateActivityPoint(id: number, activityPointToUpdate) {
      if (id >= 0 ) {
          const headers = new Headers({'Content-Type': 'application/json'});
          return this.http.put(`http://165.227.179.52:3000/activityPoint/${id.toString()}`, activityPointToUpdate, {headers: headers})
          .map((response: Response) => {
            return response.json();
          });
        }
    }

    public deleteActivityPoint(id: number) {
      return this.http.delete(`http://165.227.179.52:3000/activityPoint/${id.toString()}`).map((response: Response) => {
        return response.json();
      }).catch( (error: Response) => {
        return Observable.throw('Something went wrong!');
      });
}
public getPointsOfActivity(idActivity: number) {
  return this.http.get(`http://165.227.179.52:3000/activityPoint/activity/${idActivity.toString()}`)
  .map( (response: Response) => {
      return response.json();
  }).catch( (error: Response) => {
    return Observable.throw(JSON.parse(error['_body']));
  });
}

}
