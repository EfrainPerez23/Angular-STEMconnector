import {HttpClient} from '@angular/common/http';
import { Http, Response, Headers } from '@angular/http';
import 'rxjs/Rx';
import { Observable } from 'rxjs/Observable';
import { Injectable } from '@angular/core';
@Injectable()
export class RequestService {

  constructor(private http: Http) { }

    public getEvents() {
      return this.http.get('http://165.227.179.52:3000/events')
        .map( (response: Response) => {
            return response.json();
        }).catch( (error: Response) => {
          return Observable.throw('Something went wrong!');
        });
    }

    public deleteEvent(id: number) {
      return this.http.delete(`http://165.227.179.52:3000/events/${id.toString()}`).map((response: Response) => {
        return response.json();
      }).catch( (error: Response) => {
        return Observable.throw('Something went wrong!');
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
