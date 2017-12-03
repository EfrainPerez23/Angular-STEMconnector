import { Component, OnInit } from '@angular/core';
import { ActivityPointService } from './service/activity-point.service';

@Component({
  selector: 'app-activities-points',
  templateUrl: './activities-points.component.html',
  styleUrls: ['./activities-points.component.css'],
  providers: [ActivityPointService]
})
export class ActivitiesPointsComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
