import { Component, OnInit } from '@angular/core';
import { Activity } from '../model/activity';
import { ActivityRequestService } from '../../shared/service/request/activity-request.service';
import { ActivityService } from '../service/activity.service';
import { EventRequestService } from '../../shared/service/request/event-request.service';

@Component({
  selector: 'app-list-activities',
  templateUrl: './list-activities.component.html',
  styleUrls: ['./list-activities.component.css']
})
export class ListActivitiesComponent implements OnInit {
  private headerRow: string[] = ['Name', 'Start Time', 'End Time', 'Description'];
  public rows: Activity[];
  public activityName = '';
  public preference = 0;

  constructor(private activityRequestService: ActivityRequestService, private activityService: ActivityService,
              private eventRequestService: EventRequestService) {
    this.deleteActivity();
    this.addNewActivity();
    this.activitiesFromEvent();
    this.setFilterElements();

  }

  ngOnInit() {
    this.reloadActivityRows();
  }

  private setFilterElements() {
    this.activityService.getSearchActivityPreference()
      .subscribe((filterElements: {activityName: string, preference: number}) => {
        this.activityName = filterElements.activityName;
        this.preference = filterElements.preference;
      });
  }


  private deleteActivity() {
    this.activityService.getActivityDeletedIndex().subscribe((index: number) => {
      this.rows.splice(index, 1);
    });
  }

  private activitiesFromEvent() {
    this.activityService.getActivitiesFromEvent().subscribe((idEvent: number) => {
        if (idEvent !== -1) {
          this.getActivitiesFromEvent(idEvent);
        }else {
          this.reloadActivityRows();
        }
    });
  }


private getActivitiesFromEvent(id: number) {
    this.rows = [];
    this.eventRequestService.getActivitiesFromEvent(id).subscribe((activitiesResponse: any) => {
      if (activitiesResponse.status) {
        activitiesResponse.data.forEach(activity => {
          this.rows.push(new Activity(activity.idActivity, activity.Event_idEvent,
            activity.startTime, activity.endTime,
            activity.name, activity.description));
        });
      }
    });
}


  private addNewActivity() {
    this.activityService.getActivityReload().subscribe((reload: boolean) => {
      if (reload) {
        this.reloadActivityRows();
      }
    });
  }

  public getHeaderRow(): string[] {
    return this.headerRow;
  }

  public getRows(): Activity[] {
    return this.rows;
  }

  private reloadActivityRows() {
    this.rows = [];
    this.getActivityFromRequest();
  }


  public setActivitySelected (activitySelected: Activity, action: number) {
    this.activityService.getActivitySelected().emit({activity: activitySelected, action: action});
  }

  private getActivityFromRequest() {
    this.activityRequestService.getActivities().subscribe(
      (activitiesResponse: {success: boolean, status: number, message: string, data: any}) => {
        if (activitiesResponse.success) {
          activitiesResponse.data.forEach(activity => {
            this.rows.push(new Activity(activity.idActivity, activity.Event_idEvent,
                          activity.startTime, activity.endTime,
                          activity.name, activity.description));
          });
        }
    });
  }

}
