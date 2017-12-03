import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ActivityPointRequestService } from '../../../shared/service/request/activity-point-request.service';
import { ActivityPointService } from '../../service/activity-point.service';
import { UtilService } from '../../../shared/service/util.service';
import { ActivityRequestService } from '../../../shared/service/request/activity-request.service';
import { Activity } from '../../../activities/model/activity';

@Component({
  selector: 'app-add-update-activity-point',
  templateUrl: './add-update-activity-point.component.html',
  styleUrls: ['./add-update-activity-point.component.css']
})
export class AddUpdateActivityPointComponent implements OnInit {
  private id: number;
  private form: NgForm;
  private addUpdateActivityPointModal: ElementRef;
  private titleModal: string;
  private messageModal: string;
  private activities: Activity[] = [];

  constructor(private modalAddUpdateService: NgbModal, private activityPointRequestService: ActivityPointRequestService,
  private activityPointService: ActivityPointService, private util: UtilService,
  private activityRequestService: ActivityRequestService) { }

  ngOnInit() {
    this.getActivityFromRequest();
  }
  public onSubmit(form: NgForm) {
    this.form = form;
    if (this.id === -1) {
      this.addActivityPoint(this.form.value.activityPointData);
    }else {
      this.updateActivityPoint(this.form.value.activityPointData);
    }
    console.log(this.form.value.activityPointData);
  }

  public addUpdateEvenPhoneModal(id: number) {
    this.id = id;
    if (this.id === -1) {
      this.titleModal = 'Creating';
      this.messageModal = 'Create Activity Point'
    }else {
      this.titleModal = 'Updating';
      this.messageModal = 'Update Activity Point'
    }
    this.modalAddUpdateService.open(this.addUpdateActivityPointModal).result.then((result: boolean) => {
    }, (reason) => {
    });
}

  public getTitleModal(): string {
    return this.titleModal;
  }

  public getMessageModal(): string {
    return this.messageModal;
  }

  @ViewChild('addUpdateActivityPoint')
  public set setAddUpdateModalInitiative(addUpdateActivityPointModal: ElementRef) {
    this.addUpdateActivityPointModal = addUpdateActivityPointModal;
  }

  private updateActivityPoint(activityPointData) {
    this.activityPointRequestService.updateActivityPoint(this.id, activityPointData)
    .subscribe((activityPointResponse: any) => {
      this.reloadActivityPoints(activityPointResponse, 'You Updated an Event Phone!', 'ti-pencil-alt');
    });
  }


  private addActivityPoint(activityPointData) {
    this.activityPointRequestService.createActivityPoint(activityPointData)
    .subscribe((activityPointResponse: any) => {
      this.reloadActivityPoints(activityPointResponse, 'You Created a new Activity Point!!', 'ti-face-smile');
    });
  }

  private reloadActivityPoints(activityPointData, messageSuccess: string, icon: string) {
    if (activityPointData.success) {
      this.activityPointService.getReloadActivityPoints().emit(true);
      this.util.showNotification('success', messageSuccess, 'Success!', icon);
    }else {
      this.util.showNotification('danger', activityPointData.message, 'Error!', 'ti-face-sad');
    }
  }

  private getActivityFromRequest() {
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

  public getActivities(): Activity[] {
    return this.activities;
  }

}
