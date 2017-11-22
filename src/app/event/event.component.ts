import { Component, OnInit } from '@angular/core';

import { EventModel } from 'app/event/model/event.model';
import { element } from 'protractor';
import { InitiativeModel } from '../shared/model/initiative.model';
import { EventRequestService } from '../shared/service/request/event-request.service';
import { InitiativeRequestService } from '../shared/service/request/initiative-request.service';
import { NgForm } from '@angular/forms';
import { UtilService } from '../shared/service/util.service';
import {
  NgbModal,
  ModalDismissReasons,
  NgbModalRef
} from '@ng-bootstrap/ng-bootstrap';

@Component({
    // tslint:disable-next-line:component-selector
    selector: 'table-cmp',
    moduleId: module.id,
    templateUrl: './event.component.html'
})
export class EventComponent implements OnInit {
    private headerRow: string[];
    private rows: EventModel[];
    public filteredStatus = '';
    public filterPreference = 0;
    public filter = 'Filter by';
    public filterInitiative = 'Initiatives';
    private initiatives: InitiativeModel[];
    private signUpForm: NgForm;
    closeResult: string;
    public model;
    public titleModal;
    public messageModal;
    private id: number;

    constructor(private eventRequestService: EventRequestService, private modalService: NgbModal,
                private initiativeRequestService: InitiativeRequestService, private notification: UtilService) {}
    ngOnInit() {
            this.headerRow =  ['Name',  'Description', 'Start Date', 'End Date', 'Location', 'Active' ];
            this.reloadEvents();
            this.reloadInitiative();
    }


    public onSubmit(eventForm: NgForm, createProfile) {
        this.signUpForm = eventForm;
        const event = this.setEventJSON();

        if (this.titleModal === 'Adding') {
            this.eventRequestService.createEvent(event).subscribe((eventCreatedResponse: any) => {
                if (eventCreatedResponse.success) {
                    this.notification.showNotification('success', 'You Created a new Event!', 'Success!', 'ti-face-smile');
                    this.reloadEvents();
                }else {
                    this.notification.showNotification('danger', eventCreatedResponse.message, 'Error!', 'ti-face-sad');
                }
            });
        }else {
            this.eventRequestService.updateEvent(this.id, event).subscribe((eventUpdatedResponse: any) => {
                if (eventUpdatedResponse.success) {
                    this.notification.showNotification('success', 'You updated a new Event!', 'Success!', 'ti-pencil-alt');
                    this.reloadEvents();
                }else {
                    this.notification.showNotification('danger', eventUpdatedResponse.message, 'Error!', 'ti-face-sad');
                }
            });
        }
    }

    private setEventJSON() {
        const sDate = this.signUpForm.value.eventData.startDate.sDate.toString().split('-');
        const eDate = this.signUpForm.value.eventData.endDate.eDate.toString().split('-');
        const date1 = new Date(Number(sDate[2]), Number(sDate[1]), Number(sDate[0]),
                        Number(this.signUpForm.value.eventData.startDate.sHour),
                        Number(this.signUpForm.value.eventData.startDate.sMins));
        const date2 = new Date(Number(eDate[2]), Number(eDate[1]), Number(eDate[0]),
                        Number(this.signUpForm.value.eventData.endDate.eHour),
                        Number(this.signUpForm.value.eventData.endDate.eMins));

        const finalStartDate = sDate[2] + '-' + sDate[0] + '-' + sDate[1] + ' ' + date1.toTimeString().split(' ')[0];
        const finalEndDate = eDate[2] + '-' + eDate[0] + '-' + eDate[1] + ' ' + date2.toTimeString().split(' ')[0];

        const event = {
            'name': this.signUpForm.value.eventData.name.toString(),
            'description': this.signUpForm.value.eventData.description.toString(),
            'status': this.signUpForm.value.eventData.status.toString() === 'true' ? 1 : 0,
            'startDate': finalStartDate,
            'endDate': finalEndDate,
            'Initiative_idInitiative': this.signUpForm.value.eventData.idInitiative.toString(),
            'location': this.signUpForm.value.eventData.location.toString(),
            'email': this.signUpForm.value.eventData.email.toString(),
            'imageUrl': this.getInitiativeImage(this.signUpForm.value.eventData.idInitiative).toString()
        };
        console.log(event);
        return event;
    }

   public openOnDeleteEvent(content, id: number, index: number) {
            this.modalService.open(content).result.then((result: boolean) => {
                if (result) {
                    this.eventRequestService.deleteEvent(id).subscribe( (eventDeleteResponse: any) => {
                        if (eventDeleteResponse.success) {
                            this.rows.splice(index, 1);
                            this.notification.showNotification('warning', 'You just deleted an Event', 'Success!', 'ti-eraser');
                        }else {
                            this.notification.showNotification('danger', eventDeleteResponse.message, 'Error!', 'ti-face-sad');
                        }
                    });
                }
            }, (reason) => {
              this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
            });
    }

    public openAddOrUpdateEvent(content, id: number) {
        if (id === -1) {
            this.titleModal = 'Adding';
            this.messageModal = 'Add Event';
        }else {
            this.id = id;
            this.titleModal = 'Updating';
            this.messageModal = 'Update Event'
        }
        this.modalService.open(content).result.then((result: boolean) => {
        }, (reason) => {
          this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
        });
    }
      private getDismissReason(reason: any): string {
            if (reason === ModalDismissReasons.ESC) {
              return 'by pressing ESC';
            } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
              return 'by clicking on a backdrop';
            } else {
              return  `with: ${reason}`;
            }
        }

    public setInitiativeForEvents(id: number, name: string) {
        if (id === 0) {
            this.reloadEvents();
        }else {
            this.eventRequestService.getEventsFromInitiative(id).subscribe((events: any) => {
                this.rows = [];
                events.data.forEach(element => {
                    this.rows.push(new EventModel(element.idEvent, element.status, element.name,
                         element.description, element.startDate, element.endDate, element.location, element.email,
                         element.Initiative_idInitiative));
                });
            });
        }
        this.filterInitiative = name;
    }

    public getHeaderRow(): string[] {
        return this.headerRow;
    }

    public getRows(): EventModel[] {
        return this.rows;
    }

    public getInitiatives(): InitiativeModel[] {
        return this.initiatives;
    }

    public setFilteredPreference(filterPreference: number) {
        switch (filterPreference) {
            case 0:
                this.filter = 'Name';
                break;
            case 1:
                this.filter = 'Description';
                break;
            case 2:
                this.filter = 'Start Date';
                break;
            case 3:
                this.filter = 'End Date';
                break;
            case 4:
                this.filter = 'Location';
                break;
            default:
                this.filter = 'Active';
                break;
        }

        this.filterPreference = filterPreference;
    }

    private reloadInitiative() {
        this.initiatives = [];
        this.initiativeRequestService.getInitiatives().subscribe((initiatives: any) => {
              initiatives.data.forEach(element => {
                this.initiatives.push(new InitiativeModel(element.idInitiative, element.name, element.description, element.imageUrl));
              }, (error) => {
              });
        });
    }

    private reloadEvents() {
        this.rows = [];
        this.eventRequestService.getEvents().subscribe((events: any) => {
            events.data.forEach(element => {
                this.rows.push(new EventModel(element.idEvent, element.status, element.name, element.description,
                     element.startDate, element.endDate, element.location, element.email, element.Initiative_idInitiative));
            });
        });
    }

    private getInitiativeImage(id: number): string {
        for (let i = 0; i < this.initiatives.length; i++) {
            if (this.initiatives[i].getIdInitiative().toString() === id.toString()) {
                return this.initiatives[i].getImageUrl();
            }
        }
        return '';
    }
}
