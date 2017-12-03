import { Component, OnInit } from '@angular/core';
import { ActivityPoint } from '../model/activity-point';
import { ActivityPointRequestService } from '../../shared/service/request/activity-point-request.service';
import { ActivityPointService } from '../service/activity-point.service';

@Component({
  selector: 'app-list-activity-point',
  templateUrl: './list-activity-point.component.html',
  styleUrls: ['./list-activity-point.component.css']
})
export class ListActivityPointComponent implements OnInit {
  private headerRow: string[] = ['Description' ];
  private rows: ActivityPoint[] = [];
  private phoneSearched = '';
  private preference = 0;

  constructor(private activityPointRequestService: ActivityPointRequestService, private activityPointService: ActivityPointService) { 
    this.reloadActivityPoints();
    this.activitySelected();
    this.searchPreference();
  }

  ngOnInit() {
    this.loadActivityPoints();
  }


  private searchPreference() {
    this.activityPointService.getSearchPreference().subscribe((searchPreference: {search: string, preference: number}) => {
      this.phoneSearched = searchPreference.search,
      this.preference = searchPreference.preference
    });
  }

  private loadActivityPoints() {
    this.rows = [];
    this.activityPointRequestService.getActivityPoints().subscribe((activityPointResponse: any) => {
      if (activityPointResponse.success) {
        activityPointResponse.data.forEach(activityPoint => {
          this.rows.push(new ActivityPoint(activityPoint.id, activityPoint.Activity_idActivity, activityPoint.description));
        });
      }
    });
  }

  private activitySelected() {
    this.activityPointService.getIdActivitySelected().subscribe((idActivity: number) => {
      if (idActivity === -1) {
        this.loadActivityPoints();
      }else {
        this.activityPointRequestService.getPointsOfActivity(idActivity).subscribe((pointsResponse: any) => {
          this.rows = [];
          this.loadActivities(pointsResponse);
        });
      }
    });
  }

  private loadActivities(pointsResponse) {
    if (pointsResponse.success) {
      pointsResponse.data.forEach(activityPoint => {
        this.rows.push(new ActivityPoint(activityPoint.id, activityPoint.Activity_idActivity, activityPoint.description));
      });
    }
  }

  private reloadActivityPoints() {
    this.activityPointService.getReloadActivityPoints().subscribe((reload: boolean) => {
      if (reload) {
        this.loadActivityPoints();
      }
    });
  }

  public getHeaderRow(): string[] {
    return this.headerRow;
  }

  public getPhoneSearched(): string {
    return this.phoneSearched;
  }

  public getPreference(): number {
    return this.preference;
  }

  public getRows(): ActivityPoint[] {
    return this.rows;
  }


}
