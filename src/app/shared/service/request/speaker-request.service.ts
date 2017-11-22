import {HttpClient} from '@angular/common/http';
import { Http, Response, Headers } from '@angular/http';
import 'rxjs/Rx';
import { Observable } from 'rxjs/Observable';
import { Injectable } from '@angular/core';

@Injectable()
export class SpeakerRequestService {

  constructor(private http: Http) { }

  public createSpeaker (newSpeaker: {name: string, description: string, imageUrl: string}) {
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

public updateSpeaker(id: number, speakerToUpdate: {name: string, description: string, imageUrl: string}) {
    if (id >= 0 ) {
        const headers = new Headers({'Content-Type': 'application/json'});
        return this.http.put(`http://165.227.179.52:3000/speakers/${id.toString()}`, speakerToUpdate, {headers: headers})
        .map((response: Response) => {
          return response.json();
        });
}
}

}