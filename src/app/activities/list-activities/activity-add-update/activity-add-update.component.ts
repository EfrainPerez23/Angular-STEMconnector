import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { UtilService } from '../../../shared/service/util.service';
import { NgForm } from '@angular/forms';
import { EventRequestService } from '../../../shared/service/request/event-request.service';
import { ActivityRequestService } from '../../../shared/service/request/activity-request.service';
import { ActivityService } from '../../service/activity.service';
import { EventModel } from 'app/events/model/event.model';

@Component({
  selector: 'app-activity-add-update',
  templateUrl: './activity-add-update.component.html',
  styleUrls: ['./activity-add-update.component.css']
})
export class ActivityAddUpdateComponent implements OnInit {
  private id: number;
  private addUpdateModalActivity: ElementRef;
  private titleModal: string;
  private messageModal: string;
  private form: NgForm;
  private events: EventModel[] = [];

  constructor(private modalAddUpdateService: NgbModal,  private util: UtilService, private eventRequestService: EventRequestService,
              private activityRequestService: ActivityRequestService, private activityService: ActivityService) { }

  ngOnInit() {
    this.getEventsFromRequest();
  }

  public onSubmit(form: NgForm) {
    this.form = form;
    if (this.id === -1) {
      this.addActivity(this.form.value.activityData);
    }else {
      this.updateActivity(this.form.value.activityData);
    }
  }

  public addUpdateActivity(id: number) {
      this.id = id;
      if (this.id === -1) {
        this.titleModal = 'Creating';
        this.messageModal = 'Create Activity'
      }else {
        this.titleModal = 'Updating';
        this.messageModal = 'Update Activity'
      }
      this.modalAddUpdateService.open(this.addUpdateModalActivity).result.then((result: boolean) => {
      }, (reason) => {
      });
  }
  private getEventsFromRequest() {
    this.eventRequestService.getEvents().subscribe((eventsResponse: any) => {
      if (eventsResponse.status) {
        eventsResponse.data.forEach(event => {
          this.events.push(new EventModel(event.idEvent, event.status, event.name, event.description, event.startDate,
                          event.endDate, event.location, event.email, event.Initiative_idInitiative));
        });
      }
    });
  }

  @ViewChild('addUpdateActivity')
  public set setAddUpdateModal(addUpdateModalActivity: ElementRef) {
    this.addUpdateModalActivity = addUpdateModalActivity;
  }

  public getTitleModal(): string {
    return this.titleModal;
  }

  public getMessageModal(): string {
    return this.messageModal;
  }

  public getEvents() {
    return this.events;
  }

  private updateActivity(speakerData) {
    this.activityRequestService.updateSpeaker(this.id, speakerData).subscribe((activityResponse: any) => {
      this.reloadActivityRows(activityResponse, 'You Updated an Activity!');
    });
  }


  private addActivity(speakerData) {
    this.activityRequestService.createActivity(speakerData).subscribe((activityResponse: any) => {
      this.reloadActivityRows(activityResponse, 'You Created a new Activity!');
    });

  }

  private reloadActivityRows(activityResponse, messageSuccess: string) {
    if (activityResponse.status) {
      this.activityService.getActivityReload().emit(true);
      this.util.showNotification('success', messageSuccess, 'Success!', 'ti-face-smile');
    }else {
      this.util.showNotification('danger', activityResponse.message, 'Error!', 'ti-face-sad');
    }
  }

}
