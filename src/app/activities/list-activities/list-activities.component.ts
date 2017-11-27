import { Component, OnInit } from '@angular/core';
import { Activity } from '../model/activity';
import { ActivityRequestService } from '../../shared/service/request/activity-request.service';
import { ActivityService } from '../service/activity.service';

@Component({
  selector: 'app-list-activities',
  templateUrl: './list-activities.component.html',
  styleUrls: ['./list-activities.component.css']
})
export class ListActivitiesComponent implements OnInit {
  private headerRow: string[] = ['Name', 'Start Time', 'End Time', 'Description'];
  public rows: Activity[];

  constructor(private activityRequestService: ActivityRequestService, private activityService: ActivityService) { 
    this.deleteActivity();
  }

  ngOnInit() {
    this.reloadActivityRows();
  }


  private deleteActivity() {
    this.activityService.getActivityDeletedIndex().subscribe((index: number) => {
      this.rows.splice(index, 1);
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
