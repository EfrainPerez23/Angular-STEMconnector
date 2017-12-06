import { Injectable, EventEmitter } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { Http, Response, Headers } from '@angular/http';
import 'rxjs/Rx';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class AuthService {
  private loggedIn = false;
  private logStatus = new EventEmitter<boolean>();

  constructor(private http: Http) { }

  public isAuthenticated(): boolean {
    return this.loggedIn;
  }

  public checkAdmin (userData) {
    const headers = new Headers({'Content-Type': 'application/json'});
    return this.http.post(`http://165.227.179.52:3000/admin/check`, userData, {headers: headers})
    .map((response) => {
        return response.json().data[0].exist;
    });
  }


  public logIn() {
    this.loggedIn = true;
  }

  public logOut() {
    this.loggedIn = false;
  }

  public getLogStatus(): EventEmitter<boolean> {
    return this.logStatus;
  }

}
