import { Component, OnInit } from '@angular/core';
import * as Chartist from 'chartist';
import { RequestService } from 'app/shared/service/request.service';
import { EventModel } from 'app/table/model/event.model';
import { element } from 'protractor';
import { InitiativeModel } from '../shared/model/initiative.model';
import {
  NgbModal,
  ModalDismissReasons,
  NgbModalRef
} from '@ng-bootstrap/ng-bootstrap';

declare var $:any;

@Component({
    selector: 'dashboard-cmp',
    moduleId: module.id,
    templateUrl: 'dashboard.component.html'
})

export class DashboardComponent implements OnInit {
  data = ['Capacity', 'Capacity', 'Capacity', 'Capacity', 'Capacity', 'Capacity', 'Capacity', 'Capacity', 'Capacity', 'Capacity'];
  private headerRow: string[];
  public filteredStatus = '';
  public filterPreference = 0;
  public filter = 'Filter by';
  public filterInitiative = 'Initiatives';
  private rows: InitiativeModel[] = [];
  closeResult: string;
  modal: NgbModalRef;
        constructor(private requestService: RequestService, private modalService: NgbModal) {}
        ngOnInit() {
            this.headerRow =  ['Name',  'Description'];
            this.requestService.getInitiatives().subscribe((initiatives: any) => {
              initiatives.data.forEach(element => {
                    this.rows.push(new InitiativeModel(element.idInitiative, element.name, element.description, element.imageUrl));
                });
            });
        }
        open(content) {
            this.modalService.open(content).result.then((result) => {
              this.closeResult = `Closed with: ${result}`;
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
            // if (id === 0) {
            //     this.rows = [];
            //     this.requestService.getEvents().subscribe((events: any) => {
            //         events.data.forEach(element => {
            //             // tslint:disable-next-line:max-line-length
            //             // tslint:disable-next-line:max-line-length
            //             this.rows.push(new EventModel(element.status, element.name, element.description, element.startDate, element.endDate, element.location, element.email));
            //         });
            //     });
            // }else {
            //     this.rows = [];
            //     this.requestService.getEventsFromInitiative(id).subscribe((events: any) => {
            //         events.data.forEach(element => {
            //             // tslint:disable-next-line:max-line-length
            //             this.rows.push(new EventModel(element.status, element.name, element.description, element.startDate, element.endDate, element.location, element.email));
            //         });
            //     });
            // }
            // this.filterInitiative = name;
        }
    
        public getHeaderRow(): string[] {
            return this.headerRow;
        }
    
        public getRows(): InitiativeModel[] {
            return this.rows;
        }
    
        // public getInitiatives(): InitiativeModel[] {
        //     // return this.initiatives;
        // }
    
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
    }

