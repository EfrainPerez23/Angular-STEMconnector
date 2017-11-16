import { Component, OnInit, ViewChild } from '@angular/core';
import { RequestService } from 'app/shared/service/request.service';
import { EventModel } from 'app/table/model/event.model';
import { element } from 'protractor';
import { InitiativeModel } from '../shared/model/initiative.model';
import {
  NgbModal,
  ModalDismissReasons,
  NgbModalRef
} from '@ng-bootstrap/ng-bootstrap';
import { NgForm } from '@angular/forms';

@Component({
    selector: 'dashboard-cmp',
    moduleId: module.id,
    templateUrl: 'dashboard.component.html'
})

export class DashboardComponent implements OnInit {
  private headerRow: string[];
  public filteredStatus = '';
  public filterPreference = 0;
  public filter = 'Filter by';
  public filterInitiative = 'Initiatives';
  private rows: InitiativeModel[] = [];
  private closeResult: string;
  private signUpForm: NgForm;

        constructor(private requestService: RequestService, private modalService: NgbModal) {}
        ngOnInit() {
            this.headerRow =  ['Name',  'Description'];
            this.requestService.getInitiatives().subscribe((initiatives: any) => {
              initiatives.data.forEach(element => {
                    this.rows.push(new InitiativeModel(element.idInitiative, element.name, element.description, element.imageUrl));
                });
            });
        }

        @ViewChild('f')
        public set setSignUpForm(signUpForm: NgForm) {
          this.signUpForm = signUpForm;
        }

         public open(content, id: number, index: number) {
            this.modalService.open(content).result.then((result: boolean) => {
                if (result === true) {
                    this.requestService.deleteInitiative(id).subscribe( (initiativeDeleted: any) => {
                    });
                    this.rows.splice(index, 1);
                }
            }, (reason) => {
              this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
            });
        }

        private getDismissReason(reason: any): string {
            if (reason === ModalDismissReasons.ESC) {
                console.log('esc!');
              return 'by pressing ESC';
            } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
                console.log('nose');
              return 'by clicking on a backdrop';
            } else {
              return  `with: ${reason}`;
            }
        }

        public openUpdateProfile(content, id: number, index: number) {
            this.modalService.open(content).result.then((result: boolean) => {
                console.log('entro al update profile: ', result, 'id: ' + id, 'index: ' + index, this.rows[index].getName());
            }, (reason) => {
              this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
            });
        }

        public getHeaderRow(): string[] {
            return this.headerRow;
        }

        public getRows(): InitiativeModel[] {
            return this.rows;
        }
        public setFilteredPreference(filterPreference: number) {
            switch (filterPreference) {
                case 0:
                    this.filter = 'Name';
                    break;
                case 1:
                    this.filter = 'Description';
                    break;
                default:
                    break;
            }
            this.filterPreference = filterPreference;
        }
    }

