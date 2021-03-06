import { Injectable, EventEmitter } from '@angular/core';

@Injectable()
export class ContactService {
  private searchContactPreference = new EventEmitter<{search: string, preference: number}>();
  private companyPreference = new EventEmitter<number>();
  private reloadContacts = new  EventEmitter<boolean>();
  private indexContactDeleted = new EventEmitter<number>();

  constructor() { }

  public getSearchContactPreference(): EventEmitter<{search: string, preference: number}> {
    return this.searchContactPreference
  }

  public getCompanyPreferences(): EventEmitter<number> {
    return this.companyPreference;
  }

  public getReloadContacts(): EventEmitter<boolean> {
    return this.reloadContacts;
  }

  public getIndexContactDeleted(): EventEmitter<number> {
    return this.indexContactDeleted;
  }

}
