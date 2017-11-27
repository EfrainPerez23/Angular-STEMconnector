import { Component, OnInit, ElementRef, ViewChild, Input } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Activity } from '../../model/activity';
import { ActivityService } from '../../service/activity.service';

@Component({
  selector: 'app-activity-description',
  templateUrl: './activity-description.component.html',
  styleUrls: ['./activity-description.component.css']
})
export class ActivityDescriptionComponent implements OnInit {

  private descriptionModal: ElementRef;
  private activity: Activity;

  constructor(private modalDescActivity: NgbModal) {
  }

  ngOnInit() {
  }


  public descriptionModalActivity(activity: Activity) {
      this.activity = activity;
      this.modalDescActivity.open(this.descriptionModal).result.then((result: boolean) => {
      }, (reason) => {});
    }

  public getActivity(): Activity {
    return this.activity;
  }

  @ViewChild('activityDescription')
  public set setDescriptionModal(descriptionModal: ElementRef) {
    this.descriptionModal = descriptionModal;
  }

}
