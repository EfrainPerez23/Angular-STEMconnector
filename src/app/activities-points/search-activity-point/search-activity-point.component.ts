import { Component, OnInit } from '@angular/core';
import { Activity } from '../../activities/model/activity';
import { ActivityRequestService } from '../../shared/service/request/activity-request.service';
import { ActivityPointService } from '../service/activity-point.service';

@Component({
  selector: 'app-search-activity-point',
  templateUrl: './search-activity-point.component.html',
  styleUrls: ['./search-activity-point.component.css']
})
export class SearchActivityPointComponent implements OnInit {

  private preferences: string[] = ['Description'];
  private activities: Activity[] = [];
  private activitySelected: Activity  = new Activity(-1, -1, null, null, 'All Activities', '', '');
  private filterPreference = 0;
  private searchEventPhone = '';

  constructor(private activityRequestService: ActivityRequestService, private activityPointService: ActivityPointService) { }

  ngOnInit() {
    this.getActivityFromRequest();
  }

  public valueChange() {
    this.activityPointService.getSearchPreference().emit({
      search: this.searchEventPhone,
      preference: this.filterPreference
    });
  }

  public getActivities(): Activity[] {
    return this.activities;
  }

  public set setSearchActivityPoint(searchEventPhone: string) {
    this.searchEventPhone = searchEventPhone;
  }

  public chooseActivity(activitySelected: Activity) {
    this.activitySelected = activitySelected;
    this.activityPointService.getIdActivitySelected().emit(this.activitySelected.getIdActivity());
  }

  public getActivitySelected() {
    return this.activitySelected;
  }

  public getFilterPreference(): number {
    return this.filterPreference;
  }

  public getPreferences(): string[] {
    return this.preferences;
  }

  public setFilteredPreference(filterPreference: number) {
    this.filterPreference = filterPreference;
  }

  private getActivityFromRequest() {
    this.activities = [new Activity(-1, -1, null, null, 'All Activities', '', '')];
    this.activityRequestService.getActivities().subscribe(
      (activitiesResponse: {success: boolean, status: number, message: string, data: any}) => {
        if (activitiesResponse.success) {
          activitiesResponse.data.forEach(activity => {
            this.activities.push(new Activity(activity.idActivity, activity.Event_idEvent,
                          activity.startTime, activity.endTime,
                          activity.name, activity.description, activity.location));
          });
        }
    });
  }

}
