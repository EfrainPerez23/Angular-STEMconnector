import {HttpClient} from '@angular/common/http';
import { Http, Response, Headers } from '@angular/http';
import 'rxjs/Rx';
import { Observable } from 'rxjs/Observable';
import { Injectable } from '@angular/core';

@Injectable()
export class SpeakerRequestService {

  constructor(private http: Http) { }

  public createSpeaker (newSpeaker: {name: string, title: string, bio: string, imageUrl: string}) {
    const headers = new Headers({'Content-Type': 'application/json'});
    return this.http.post(`http://165.227.179.52:3000/speakers`, newSpeaker, {headers: headers})
    .map((response: Response) => {
      return response.json();
    });
}
public deleteSpeaker(id: number) {
    return this.http.delete(`http://165.227.179.52:3000/speakers/${id.toString()}`).map((response: Response) => {
      return response.json();
    }).catch( (error: Response) => {
      return Observable.throw('Something went wrong!');
    });
}


public getSpeakers() {
    return this.http.get('http://165.227.179.52:3000/speakers')
    .map( (response: Response) => {
        return response.json();
    }).catch( (error: Response) => {
      return Observable.throw(JSON.parse(error['_body']));
    });
}

public updateSpeaker(id: number, speakerToUpdate: {name: string, title: string, bio: string, imageUrl: string}) {
    if (id >= 0 ) {
        const headers = new Headers({'Content-Type': 'application/json'});
        return this.http.put(`http://165.227.179.52:3000/speakers/${id.toString()}`, speakerToUpdate, {headers: headers})
        .map((response: Response) => {
          return response.json();
        });
    }
  }

  public getLasIdInserted() {
    return this.http.get(`http://165.227.179.52:3000/speakers/lastId`).map((response: Response) => {
      return response.json();
    }).catch( (error: Response) => {
      return Observable.throw('Something went wrong!');
    });
  }

  public addEvent_has_Speaker(eventSpeakerIds: {Event_idEvent: number, Speaker_idSpeaker: number}) {
    const headers = new Headers({'Content-Type': 'application/json'});
    return this.http.post(`http://165.227.179.52:3000/speakers/eventHasSpeaker`, eventSpeakerIds, {headers: headers})
    .map((response: Response) => {
      return response.json();
    });
  }

  public deleteEvent_has_Speaker(id: number) {
    return this.http.delete(`http://165.227.179.52:3000/speakers/eventHasSpeaker/${id.toString()}`).map((response: Response) => {
      return response.json();
    }).catch( (error: Response) => {
      return Observable.throw('Something went wrong!');
    });
  }

  public getEventsSpeaker(id: number) {
    return this.http.get(`http://165.227.179.52:3000/speakers/eventsSpeaker/${id.toString()}`)
    .map( (response: Response) => {
        return response.json();
    }).catch( (error: Response) => {
      return Observable.throw(JSON.parse(error['_body']));
    });
  }

  public deleteEventsSpeaker(idEvent: number, idSpeaker) {
    return this.http.delete(`http://165.227.179.52:3000/speakers/eventHasSpeaker/${idEvent.toString()}/${idSpeaker.toString()}`)
    .map((response: Response) => {
      return response.json();
    }).catch( (error: Response) => {
      return Observable.throw('Something went wrong!');
    });
  }

}
