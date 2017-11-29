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

    public createEvent (newEvent: {name: any, description: any, status: any, startDate: any,
             endDate: any, Initiative_idInitiative: any, location: any, email: any, imageUrl: any}) {
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

    public updateEvent(id: number, eventToUpdate) {
      if (id >= 0 ) {
          const headers = new Headers({'Content-Type': 'application/json'});
          return this.http.put(`http://165.227.179.52:3000/events/${id.toString()}`, eventToUpdate, {headers: headers})
          .map((response: Response) => {
            return response.json();
          });
        }
  }

  public getSpeakersFromEvent(id: number) {
    return this.http.get(`http://165.227.179.52:3000/events/${id.toString()}/speakers`)
    .map( (response: Response) => {
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

    public getActivitiesFromEvent(id: number) {
      return this.http.get(`http://165.227.179.52:3000/events/${id.toString()}/activities`)
      .map( (response: Response) => {
          return response.json();
      }).catch( (error: Response) => {
        return Observable.throw('Something went wrong!');
      });
    }
}
