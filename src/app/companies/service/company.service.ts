import { Injectable, EventEmitter } from '@angular/core';

@Injectable()
export class CompanyService {
  private searchCompanyPreference = new EventEmitter<{search: string, preference: number}>();
  private reloadCompanies = new EventEmitter<boolean>();

  constructor() { }

  public getSearchCompanyPreference(): EventEmitter<{search: string, preference: number}> {
    return this.searchCompanyPreference;
  }

  public getReloadCompanies(): EventEmitter<boolean> {
    return this.reloadCompanies;
  }

}
