import { EventEmitter } from '@angular/core';
export class EventService {

  private searchEventPreference = new EventEmitter<{eventName: string, preference: number}>();
  private searchByInitiative = new EventEmitter<number>();

  constructor() { }

  public getSearchEventPreference(): EventEmitter<{eventName: string, preference: number}> {
    return this.searchEventPreference;
  }

  public getSearchByInitiative(): EventEmitter<number> {
    return this.searchByInitiative;
  }
}
