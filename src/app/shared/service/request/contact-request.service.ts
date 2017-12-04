import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { Http, Response, Headers } from '@angular/http';
import 'rxjs/Rx';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class ContactRequestService {

  constructor(private http: Http) { }
  public getContacts() {
    return this.http.get('http://165.227.179.52:3000/idContact')
    .map( (response: Response) => {
        return response.json();
    }).catch( (error: Response) => {
      return Observable.throw(JSON.parse(error['_body']));
    });
  }
  public getContact(idContact: number) {
    return this.http.get(`http://165.227.179.52:3000/contact/${idContact.toString()}`)
    .map( (response: Response) => {
        return response.json();
    }).catch( (error: Response) => {
      return Observable.throw(JSON.parse(error['_body']));
    });
  }

  public getCompanyContact(Company_idCompany: number) {
    return this.http.get(`http://165.227.179.52:3000/contact/company/${Company_idCompany.toString()}`)
    .map( (response: Response) => {
        return response.json();
    }).catch( (error: Response) => {
      return Observable.throw(JSON.parse(error['_body']));
    });
  }

  public createContact (newContact) {
      const headers = new Headers({'Content-Type': 'application/json'});
      return this.http.post(`http://165.227.179.52:3000/contact/`, newContact, {headers: headers})
      .map((response: Response) => {
      return response.json();
      });
    }

    public updateContact(idContact: number, contactToUpdate) {
      if (idContact >= 0 ) {
          const headers = new Headers({'Content-Type': 'application/json'});
          return this.http.put(`http://165.227.179.52:3000/contact/${idContact.toString()}`, contactToUpdate, {headers: headers})
          .map((response: Response) => {
            return response.json();
          });
        }
    }

    public deleteContact(idContact: number) {
      return this.http.delete(`http://165.227.179.52:3000/contact/${idContact.toString()}`).map((response: Response) => {
        return response.json();
      }).catch( (error: Response) => {
        return Observable.throw('Something went wrong!');
      });
    }

}
