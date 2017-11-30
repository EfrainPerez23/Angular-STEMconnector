import { EventEmitter } from '@angular/core';
export class InternService {
  private searchInternPreference = new EventEmitter<{searchIntern: string, filterPreference: number}>();
  private statusDeleted = new EventEmitter<number>();
  private statusCreatedOrUpdate= new EventEmitter<boolean>();

  constructor() { }

  public getSearchInternPreference(): EventEmitter<{searchIntern: string, filterPreference: number}> {
    return this.searchInternPreference;
  }

  public getStatusDeleted(): EventEmitter<number> {
    return this.statusDeleted;
  }

  public getStatusCreatedOrUpdate(): EventEmitter<boolean> {
    return this.statusCreatedOrUpdate;
  }

}
