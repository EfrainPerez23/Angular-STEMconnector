import {EventEmitter } from '@angular/core';

export class InitiativeService {

  private searchInitiativePreference = new EventEmitter<{initiativeName: string, preference: number}>();
  private initiativeDeletedIndex = new EventEmitter<number>();
  private initiativeReload = new EventEmitter<boolean>();

  constructor() { }

  public getSearchInitiativePreference(): EventEmitter<{initiativeName: string, preference: number}> {
    return this.searchInitiativePreference;
  }

  public getInitiativeDeletedIndex(): EventEmitter<number> {
    return this.initiativeDeletedIndex;
  }

  public getInitiativeReload(): EventEmitter<boolean> {
    return this.initiativeReload;
  }

}
