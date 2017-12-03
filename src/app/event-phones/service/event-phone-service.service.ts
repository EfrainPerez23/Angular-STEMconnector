import { Injectable, EventEmitter } from '@angular/core';

@Injectable()
export class EventPhoneServiceService {

  private searchEventPhonePreference = new EventEmitter<{search: string, preference: number}>();
  private eventPreference = new EventEmitter<number>();
  private reloadEventPhone = new  EventEmitter<boolean>();

  constructor() { }

  public getSearchEventPhonePreference(): EventEmitter<{search: string, preference: number}> {
    return this.searchEventPhonePreference;
  }

  public getEventPreference(): EventEmitter<number> {
    return this.eventPreference;
  }

  public getReloadEventPhone(): EventEmitter<boolean> {
    return this.reloadEventPhone;
  }

}
