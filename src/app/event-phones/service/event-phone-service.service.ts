import { Injectable, EventEmitter } from '@angular/core';

@Injectable()
export class EventPhoneServiceService {

  private searchEventPhonePreference = new EventEmitter<{search: string, preference: number}>();
  private eventPreference = new EventEmitter<number>()

  constructor() { }

  public getSearchEventPhonePreference(): EventEmitter<{search: string, preference: number}> {
    return this.searchEventPhonePreference;
  }

  public getEventPreference(): EventEmitter<number> {
    return this.eventPreference;
  }

}
