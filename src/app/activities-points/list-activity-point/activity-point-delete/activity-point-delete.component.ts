import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { UtilService } from '../../../shared/service/util.service';
import { ActivityRequestService } from '../../../shared/service/request/activity-request.service';
import { ActivityPointRequestService } from '../../../shared/service/request/activity-point-request.service';
import { ActivityPointService } from '../../service/activity-point.service';

@Component({
  selector: 'app-activity-point-delete',
  templateUrl: './activity-point-delete.component.html',
  styleUrls: ['./activity-point-delete.component.css']
})
export class ActivityPointDeleteComponent implements OnInit {
  private deleteModal: ElementRef;

  constructor(private modalDeleteService: NgbModal, private util: UtilService,
     private activityPointService: ActivityPointService, private activityPointRequestService: ActivityPointRequestService) { }

  ngOnInit() {
  }

  @ViewChild('deleteActivityPoint')
  public set setDeleteModal(deleteModal: ElementRef) {
    this.deleteModal = deleteModal;
  }


  public deleteEventPhoneModal(idEventPhone: number) {
    this.modalDeleteService.open(this.deleteModal).result.then((initiativeToDelete: boolean) => {
      if (initiativeToDelete) {
        this.deleteEventPhone(idEventPhone);
      }
    }, (error) => {
    });
  }

  private deleteEventPhone(idActivityPoint: number) {
    this.activityPointRequestService.deleteActivityPoint(idActivityPoint).subscribe((activityPointDeleted: any) => {
      if (activityPointDeleted.success) {
        this.util.showNotification('warning', 'You just deleted an Activity Point', 'Success!', 'ti-eraser');
        this.activityPointService.getReloadActivityPoints().emit(true);
      }else {
        this.util.showNotification('warning', activityPointDeleted.message, 'Success!', 'ti-eraser');
      }
    });
  }

}
