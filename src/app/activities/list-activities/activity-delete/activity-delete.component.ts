import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { Activity } from '../../model/activity';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ActivityService } from '../../service/activity.service';
import { ActivityRequestService } from '../../../shared/service/request/activity-request.service';
import { UtilService } from '../../../shared/service/util.service';

@Component({
  selector: 'app-activity-delete',
  templateUrl: './activity-delete.component.html',
  styleUrls: ['./activity-delete.component.css']
})
export class ActivityDeleteComponent implements OnInit {

  private deleteModal: ElementRef;

  constructor(private modalDeleteService: NgbModal, private activityService: ActivityService,
              private activityRequestService: ActivityRequestService, private util: UtilService) { }

  ngOnInit() {
  }

  public deleteModalActivity(deleteActivity: Activity, activityIndex: number) {
    this.modalDeleteService.open(this.deleteModal).result.then((deleteSpeaker: boolean) => {
      if (deleteSpeaker) {
        this.deleteActivity(deleteActivity, activityIndex);
      }
    }, (error) => {
      console.log('error');
    });
  }

  private deleteActivity(activity: Activity, activityIndex: number) {
    this.activityRequestService.deleteActivity(activity.getIdActivity()).subscribe((deleteResponse: any) => {
      if (deleteResponse.success) {
        this.util.showNotification('warning', 'You just deleted an Activity', 'Success!', 'ti-eraser');
        this.activityService.getActivityDeletedIndex().emit(activityIndex);
      }else {
        this.util.showNotification('danger', deleteResponse.message, 'Error!', 'ti-face-sad');
      }
    });
  }

  @ViewChild('deleteActivity')
  public set setDeleteModal(deleteModal: ElementRef) {
    this.deleteModal = deleteModal;
  }



}
