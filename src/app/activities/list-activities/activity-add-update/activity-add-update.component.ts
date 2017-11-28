import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { UtilService } from '../../../shared/service/util.service';
import { NgForm } from '@angular/forms';
import { EventModel } from 'app/event/model/event.model';
import { EventRequestService } from '../../../shared/service/request/event-request.service';
import { ActivityRequestService } from '../../../shared/service/request/activity-request.service';

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

  constructor(private modalAddUpdateService: NgbModal,  private util: UtilService, private eventService: EventRequestService,
              private activityService: ActivityRequestService) { }

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
    this.eventService.getEvents().subscribe((eventsResponse: any) => {
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
    console.log('Updating');
    console.log(speakerData);
  }

  private addActivity(speakerData) {
    this.activityService.createActivity(speakerData).subscribe((activityResponse: any) => {
      if (activityResponse.status) {
        console.log('Created');
      }
    });

  }

}
