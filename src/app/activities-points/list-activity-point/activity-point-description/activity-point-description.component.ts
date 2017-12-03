import { Component, OnInit, Input, ElementRef, ViewChild } from '@angular/core';
import { ActivityPoint } from '../../model/activity-point';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-activity-point-description',
  templateUrl: './activity-point-description.component.html',
  styleUrls: ['./activity-point-description.component.css']
})
export class ActivityPointDescriptionComponent implements OnInit {

  private activityPoint: ActivityPoint;
  private descriptionModal: ElementRef;

  constructor(private activityPointDescriptionModal: NgbModal) { }

  ngOnInit() {
  }


  @ViewChild('activityPointDescription')
  public set setBioModal(descriptionModal: ElementRef) {
    this.descriptionModal = descriptionModal;
  }

  public getActivityPoint(): ActivityPoint {
    return this.activityPoint;
  }

  public activityPointModal(activityPoint: ActivityPoint) {
    this.activityPoint = activityPoint;
    this.activityPointDescriptionModal.open(this.descriptionModal).result.then((result: boolean) => {
    }, (reason) => {
    });
  }

}
