import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { InitiativeModel } from '../../../initiatives/model/initiative.model';
import { InitiativeRequestService } from '../../../shared/service/request/initiative-request.service';
import { NgForm } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { EventService } from '../../service/event.service';
import { EventRequestService } from '../../../shared/service/request/event-request.service';
import { UtilService } from '../../../shared/service/util.service';

@Component({
  selector: 'app-add-update-event',
  templateUrl: './add-update-event.component.html',
  styleUrls: ['./add-update-event.component.css']
})
export class AddUpdateEventComponent implements OnInit {
  private initiatives: InitiativeModel[];
  private form: NgForm;
  private id: number;
  private titleModal = '';
  private messageModal = '';
  private addUpdateModalEvent: ElementRef;

  constructor(private initiativeRequestService: InitiativeRequestService, private modalAddUpdateService: NgbModal,
              private eventService: EventService, private eventRequestService: EventRequestService, private util: UtilService) { }

  ngOnInit() {
    this.loadInitiatives();
  }

  public onSubmit(form: NgForm) {
    this.form = form;
    if (this.id === -1) {
      this.addEvent(this.form.value.eventData);
    }else {
      this.updateEvent(this.form.value.eventData);
    }
    console.log(this.form.value.eventData);
  }

  public addUpdateEvent(id: number) {
      this.id = id;
      if (this.id === -1) {
        this.titleModal = 'Creating';
        this.messageModal = 'Create Event'
      }else {
        this.titleModal = 'Updating';
        this.messageModal = 'Update Event'
      }
      this.modalAddUpdateService.open(this.addUpdateModalEvent).result.then((result: boolean) => {
      }, (reason) => {
      });
  }

  @ViewChild('addUpdateModalEvent')
  public set setAddUpdateModalEvent(addUpdateModalEvent: ElementRef) {
    this.addUpdateModalEvent = addUpdateModalEvent;
  }

  private loadInitiatives() {
    this.initiatives = [];
    this.initiativeRequest();
  }

  private addEvent(event) {
    this.eventRequestService.createEvent(event).subscribe((eventResponse) => {
      if (eventResponse.success) {
        this.util.showNotification('success', 'You add a new Event!', 'Success!', 'ti-pencil-alt');
      }else {
        this.util.showNotification('danger', eventResponse.message, 'Error!', 'ti-face-sad');
      }
      this.eventService.getAddUpdateEvent().emit(eventResponse.success);
    });
  }


  private updateEvent(event) {
    this.eventRequestService.updateEvent(this.id, event).subscribe((eventResponse) => {
      if (eventResponse.success) {
        this.util.showNotification('success', 'You Updated an Event!', 'Success!', 'ti-pencil-alt');
      }else {
        this.util.showNotification('danger', eventResponse.message, 'Error!', 'ti-face-sad');
      }
      this.eventService.getAddUpdateEvent().emit(eventResponse.success);
    })
  }

  private initiativeRequest() {
    this.initiativeRequestService.getInitiatives().subscribe((initiativeResponse: any) => {
      if (initiativeResponse.success) {
        initiativeResponse.data.forEach(initiative => {
          this.initiatives.push(new InitiativeModel(initiative.idInitiative, initiative.name, initiative.description, initiative.imageUrl));
        });
      }
    });
  }

  public getInitiatives(): InitiativeModel[] {
    return this.initiatives;
  }

  public getTitleModal(): string {
    return this.titleModal;
  }

  public getMessageModal(): string {
    return this.messageModal;
  }

}
