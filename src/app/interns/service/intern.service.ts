import { EventEmitter } from '@angular/core';
export class InternService {
  private searchInternPreference = new EventEmitter<{searchIntern: string, filterPreference: number}>();

  constructor() { }

  public getSearchInternPreference(): EventEmitter<{searchIntern: string, filterPreference: number}> {
    return this.searchInternPreference;
  }

}
