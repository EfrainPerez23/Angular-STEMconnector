import { Injectable, EventEmitter } from '@angular/core';

@Injectable()
export class ActivityPointService {
  private searchPreference = new EventEmitter<{search: string, preference: number}>();
  private idActivitySelected = new EventEmitter<number>();
  private reloadActivityPoints = new EventEmitter<boolean>();

  constructor() { }

  public getSearchPreference(): EventEmitter<{search: string, preference}> {
    return this.searchPreference;
  }

  public getIdActivitySelected(): EventEmitter<number> {
    return this.idActivitySelected;
  }

  public getReloadActivityPoints(): EventEmitter<boolean> {
    return this.reloadActivityPoints;
  }
}
