import { Component, OnInit } from '@angular/core';
import { ActivityService } from './service/activity.service';

@Component({
  selector: 'app-activities',
  templateUrl: './activities.component.html',
  styleUrls: ['./activities.component.css'],
  providers: [ActivityService]
})
export class ActivitiesComponent implements OnInit {

  constructor(private activityService: ActivityService) {
  }

  ngOnInit() {
  }

}
