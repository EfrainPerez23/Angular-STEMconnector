import { Component, OnInit } from '@angular/core';

import { EventModel } from 'app/table/model/event.model';
import { element } from 'protractor';
import { InitiativeModel } from '../shared/model/initiative.model';
import { EventRequestService } from '../shared/service/request/event-request.service';
import { InitiativeRequestService } from '../shared/service/request/initiative-request.service';
import { NgForm } from '@angular/forms';
import {
  NgbModal,
  ModalDismissReasons,
  NgbModalRef
} from '@ng-bootstrap/ng-bootstrap';

@Component({
    // tslint:disable-next-line:component-selector
    selector: 'table-cmp',
    moduleId: module.id,
    templateUrl: 'table.component.html'
})
export class TableComponent implements OnInit {
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

    constructor(private eventRequestService: EventRequestService, private modalService: NgbModal,
                private initiativeRequestService: InitiativeRequestService) {}
    ngOnInit() {
            this.headerRow =  ['Name',  'Description', 'Start Date', 'End Date', 'Location', 'Active' ];
            this.reloadEvents();
            this.reloadInitiative();
    }

    public onAddSubmit(addInitiative: NgForm, createProfile) {
        this.signUpForm = addInitiative;
        console.log(this.signUpForm.value);
    }

    public onUpdateSubmit(f: NgForm, updateProfile) {
        this.signUpForm = f;
        // this.requestService.updateInitiative(this.idForm, {
        //     name: this.signUpForm.value.initiativeData.initiativeName,
        //     description: this.signUpForm.value.initiativeData.description,
        //     imageUrl: this.signUpForm.value.initiativeData.url
        // }).subscribe((initiativeUpdated: any) => {
        //     this.reloadInitiative();
        //     this.showNotification('success', 'You update an Initiative!', 'Success', 'ti-pencil-alt');
        // });
        console.log(this.signUpForm.value);
    }
   public openOnDeleteEvent(content, id: number, index: number) {
            this.modalService.open(content).result.then((result: boolean) => {
                if (result) {
                    this.eventRequestService.deleteEvent(id).subscribe( (eventDelete: any) => {
                        this.rows.splice(index, 1);
                    });
                }
            }, (reason) => {
              this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
            });
    }

    public openUpdateProfile(content, id: number, index: number) {
        this.modalService.open(content).result.then((result: boolean) => {
        }, (reason) => {
          this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
        });
    }

    public openAddEvent(content, id: number, index: number) {
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
}
