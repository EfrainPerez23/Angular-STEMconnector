import { Component, OnInit, Input } from '@angular/core';
import { Activity } from '../../model/activity';

@Component({
  selector: 'app-activity',
  templateUrl: './activity.component.html',
  styleUrls: ['./activity.component.css']
})
export class ActivityComponent implements OnInit {
  private activityRow: Activity;

  constructor() { }

  ngOnInit() {
  }

  public getActivityRow(): Activity {
    return this.activityRow;
  }

  @Input('activity')
  public set setActivityRow(activityRow: Activity) {
    this.activityRow = activityRow;
  }

}
