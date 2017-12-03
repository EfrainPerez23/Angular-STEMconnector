import {HttpClient} from '@angular/common/http';
import { Http, Response, Headers } from '@angular/http';
import 'rxjs/Rx';
import { Observable } from 'rxjs/Observable';
import { Injectable } from '@angular/core';

@Injectable()
export class EventPhonesRequestService {

  constructor(private http: Http) { }

  public getEventPhone() {
    return this.http.get('http://165.227.179.52:3000/eventPhones')
    .map( (response: Response) => {
        return response.json();
    }).catch( (error: Response) => {
      return Observable.throw(JSON.parse(error['_body']));
    });
  }
  public getEventsPhoneFromEvent(idEvent: number) {
    return this.http.get(`http://165.227.179.52:3000/eventPhones/events/${idEvent.toString()}`)
    .map( (response: Response) => {
        return response.json();
    }).catch( (error: Response) => {
      return Observable.throw(JSON.parse(error['_body']));
    });
  }

  public createEventPhone (newEventPhone) {
      const headers = new Headers({'Content-Type': 'application/json'});
      return this.http.post(`http://165.227.179.52:3000/eventPhones/`, newEventPhone, {headers: headers})
      .map((response: Response) => {
      return response.json();
      });
    }

    public updateEventPhone(id: number, eventPhoneToUpdate) {
      if (id >= 0 ) {
          const headers = new Headers({'Content-Type': 'application/json'});
          return this.http.put(`http://165.227.179.52:3000/eventPhones/${id.toString()}`, eventPhoneToUpdate, {headers: headers})
          .map((response: Response) => {
            return response.json();
          });
        }
    }

    public deleteEventPhone(idEventPhone: number) {
      return this.http.delete(`http://165.227.179.52:3000/eventPhones/${idEventPhone.toString()}`).map((response: Response) => {
        return response.json();
      }).catch( (error: Response) => {
        return Observable.throw('Something went wrong!');
      });
}

}
