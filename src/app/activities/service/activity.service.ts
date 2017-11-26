import { EventEmitter } from '@angular/core';

export class ActivityService {
  private searchActivityPreference = new EventEmitter<{activityName: string, preference: number}>();

  constructor() { }

  public getSearchActivityPreference(): EventEmitter<{activityName: string, preference: number}> {
    return this.searchActivityPreference;
  }

}
