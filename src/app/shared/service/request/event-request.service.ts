import {HttpClient} from '@angular/common/http';
import { Http, Response, Headers } from '@angular/http';
import 'rxjs/Rx';
import { Observable } from 'rxjs/Observable';
import { Injectable } from '@angular/core';
@Injectable()
export class EventRequestService {

  constructor(private http: Http) { }

    public getEvents() {
      return this.http.get('http://165.227.179.52:3000/events')
        .map( (response: Response) => {
            return response.json();
        }).catch( (error: Response) => {
          return Observable.throw('Something went wrong!');
        });
    }

    public createEvent (newEvent: {name: string, description: string, status: boolean, startDate: string,
             endDate: string, Initiative_idInitiative: number, location: string, email: string, imageUrl: string}) {
      const headers = new Headers({'Content-Type': 'application/json'});
      return this.http.post(`http://165.227.179.52:3000/events/`, newEvent, {headers: headers})
      .map((response: Response) => {
        return response.json();
      });
  }

    public deleteEvent(id: number) {
      return this.http.delete(`http://165.227.179.52:3000/events/${id.toString()}`).map((response: Response) => {
        return response.json();
      }).catch( (error: Response) => {
        return Observable.throw('Something went wrong!');
      });
    }

    public getEventsFromInitiative(id: number) {
      return this.http.get(`http://165.227.179.52:3000/initiatives/${id.toString()}/events`)
      .map( (response: Response) => {
          return response.json();
      }).catch( (error: Response) => {
        return Observable.throw('Something went wrong!');
      });
    }
}
