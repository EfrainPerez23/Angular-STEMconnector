import { Injectable, EventEmitter } from '@angular/core';

@Injectable()
export class CompanyService {
  private searchCompanyPreference = new EventEmitter<{search: string, preference: number}>();

  constructor() { }

  public getSearchCompanyPreference(): EventEmitter<{search: string, preference: number}> {
    return this.searchCompanyPreference;
  }

}
