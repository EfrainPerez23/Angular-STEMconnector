import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { EventPhonesRequestService } from '../../../shared/service/request/event-phones-request.service';
import { EventPhoneServiceService } from '../../service/event-phone-service.service';
import { UtilService } from '../../../shared/service/util.service';
import { NgForm } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { EventRequestService } from '../../../shared/service/request/event-request.service';
import { EventModel } from 'app/events/model/event.model';

@Component({
  selector: 'app-add-update-event-phone',
  templateUrl: './add-update-event-phone.component.html',
  styleUrls: ['./add-update-event-phone.component.css']
})
export class AddUpdateEventPhoneComponent implements OnInit {
  private id: number;
  private form: NgForm;
  private addUpdateModalInitiative: ElementRef;
  private titleModal: string;
  private messageModal: string;
  private events: EventModel[] = [];
  mask: any[] = [ '+', /\d/ , ' ', '(', /[1-9]/, /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/];

  constructor(private eventPhonesRequestService: EventPhonesRequestService, private eventPhoneService: EventPhoneServiceService,
  private util: UtilService, private modalAddUpdateService: NgbModal, private eventRequestService: EventRequestService) { }

  ngOnInit() {
    this.loadEvents();
  }

  public onSubmit(form: NgForm) {
    this.form = form;
    if (this.id === -1) {
      this.addEventPhone(this.form.value.eventPhoneData);
    }else {
      this.updateEventPhone(this.form.value.eventPhoneData);
    }
    console.log(this.form.value.eventPhoneData);
  }

  private updateEventPhone(eventPhoneData) {
    this.eventPhonesRequestService.updateEventPhone(this.id, eventPhoneData).subscribe((eventPhoneResponse: any) => {
      this.reloadInitiativeRows(eventPhoneResponse, 'You Updated an Event Phone!', 'ti-pencil-alt');
    });
  }


  private addEventPhone(eventPhoneData) {
    this.eventPhonesRequestService.createEventPhone(eventPhoneData).subscribe((eventPhoneResponse: any) => {
      this.reloadInitiativeRows(eventPhoneResponse, 'You Created a new Event Phone!!', 'ti-face-smile');
    });

  }

  private reloadInitiativeRows(eventPhoneResponse, messageSuccess: string, icon: string) {
    if (eventPhoneResponse.status) {
      this.eventPhoneService.getReloadEventPhone().emit(true);
      this.util.showNotification('success', messageSuccess, 'Success!', icon);
    }else {
      this.util.showNotification('danger', eventPhoneResponse.message, 'Error!', 'ti-face-sad');
    }
  }
  public addUpdateEvenPhoneModal(id: number) {
    this.id = id;
    if (this.id === -1) {
      this.titleModal = 'Creating';
      this.messageModal = 'Create Event Phone'
    }else {
      this.titleModal = 'Updating';
      this.messageModal = 'Update Event Phone'
    }
    this.modalAddUpdateService.open(this.addUpdateModalInitiative).result.then((result: boolean) => {
    }, (reason) => {
    });
}

  public getTitleModal(): string {
    return this.titleModal;
  }

  public getMessageModal(): string {
    return this.messageModal;
  }

  @ViewChild('addUpdateEventPhone')
  public set setAddUpdateModalInitiative(addUpdateModalInitiative: ElementRef) {
    this.addUpdateModalInitiative = addUpdateModalInitiative;
  }

  private loadEvents() {
    this.eventRequestService.getEvents().subscribe((eventsResponse: any) => {
      if (eventsResponse.status) {
        eventsResponse.data.forEach(event => {
          this.events.push(new EventModel(event.idEvent, event.status, event.name, event.description, event.startDate,
                          event.endDate, event.location, event.email, event.Initiative_idInitiative, event.imageUrl));
        });
      }
    });
  }

  public getEvents(): EventModel[] {
    return this.events;
  }

}
