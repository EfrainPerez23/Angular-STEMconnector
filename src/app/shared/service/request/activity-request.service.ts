import {HttpClient} from '@angular/common/http';
import { Http, Response, Headers } from '@angular/http';
import 'rxjs/Rx';
import { Observable } from 'rxjs/Observable';
import { Injectable } from '@angular/core';

@Injectable()
export class ActivityRequestService {

  constructor(private http: Http ) { }

  public getActivities() {
    return this.http.get('http://165.227.179.52:3000/activity')
    .map( (response: Response) => {
        return response.json();
    }).catch( (error: Response) => {
      return Observable.throw(JSON.parse(error['_body']));
    });
  }

  public deleteActivity(id: number) {
    console.log(id);
    return this.http.delete(`http://165.227.179.52:3000/activity/${id.toString()}`).map((response: Response) => {
      return response.json();
    }).catch( (error: Response) => {
      return Observable.throw('Something went wrong!');
    });
  }

  public createActivity (newActivity: {Event_idEvent: number, startTime: string, endTime: string, name: string, description: string}) {
    const headers = new Headers({'Content-Type': 'application/json'});
    return this.http.post(`http://165.227.179.52:3000/activity`, newActivity, {headers: headers})
    .map((response: Response) => {
      return response.json();
    });
  }

  public updateSpeaker(id: number,
                activityToUpdate: {Event_idEvent: number, startTime: string, endTime: string, name: string, description: string}) {
    if (id >= 0 ) {
        const headers = new Headers({'Content-Type': 'application/json'});
        return this.http.put(`http://165.227.179.52:3000/activity/${id.toString()}`, activityToUpdate, {headers: headers})
        .map((response: Response) => {
          return response.json();
        });
    }
  }

}
