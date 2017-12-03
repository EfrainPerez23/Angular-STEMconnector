import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { Http, Response, Headers } from '@angular/http';
import 'rxjs/Rx';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class CompanyRequestService {

  constructor(private http: Http) { }
  public getCompanies() {
    return this.http.get('http://165.227.179.52:3000/company')
    .map( (response: Response) => {
        return response.json();
    }).catch( (error: Response) => {
      return Observable.throw(JSON.parse(error['_body']));
    });
  }
  public getCompany(idCompany: number) {
    return this.http.get(`http://165.227.179.52:3000/company/${idCompany.toString()}`)
    .map( (response: Response) => {
        return response.json();
    }).catch( (error: Response) => {
      return Observable.throw(JSON.parse(error['_body']));
    });
  }

  public createCompany (newCompany) {
      const headers = new Headers({'Content-Type': 'application/json'});
      return this.http.post(`http://165.227.179.52:3000/company/`, newCompany, {headers: headers})
      .map((response: Response) => {
      return response.json();
      });
    }

    public updateCompany(idCompany: number, companyToUpdate) {
      if (idCompany >= 0 ) {
          const headers = new Headers({'Content-Type': 'application/json'});
          return this.http.put(`http://165.227.179.52:3000/company/${idCompany.toString()}`, companyToUpdate, {headers: headers})
          .map((response: Response) => {
            return response.json();
          });
        }
    }

    public deleteCompany(idCompany: number) {
      return this.http.delete(`http://165.227.179.52:3000/company/${idCompany.toString()}`).map((response: Response) => {
        return response.json();
      }).catch( (error: Response) => {
        return Observable.throw('Something went wrong!');
      });
}

}
