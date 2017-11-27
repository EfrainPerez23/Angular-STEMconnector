import { EventEmitter } from '@angular/core';
import { Activity } from '../model/activity';

export class ActivityService {
  private searchActivityPreference = new EventEmitter<{activityName: string, preference: number}>();
  private activitySelected = new EventEmitter<{activity: Activity, action: number}>();
  private activityDeletedIndex = new EventEmitter<number>();
  constructor() { }

  public getSearchActivityPreference(): EventEmitter<{activityName: string, preference: number}> {
    return this.searchActivityPreference;
  }

  public getActivitySelected(): EventEmitter<{activity: Activity, action: number}> {
    return this.activitySelected;
  }

  public getActivityDeletedIndex(): EventEmitter<number> {
    return this.activityDeletedIndex;
  }

}
