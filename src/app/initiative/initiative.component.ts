import { Component, OnInit, ViewChild } from '@angular/core';
import { EventModel } from 'app/event/model/event.model';
import { element } from 'protractor';
import { InitiativeModel } from '../shared/model/initiative.model';
import {
  NgbModal,
  ModalDismissReasons,
  NgbModalRef
} from '@ng-bootstrap/ng-bootstrap';
import { NgForm } from '@angular/forms';
import { InitiativeRequestService } from '../shared/service/request/initiative-request.service';
import { UtilService } from '../shared/service/util.service';


@Component({
    selector: 'dashboard-cmp',
    moduleId: module.id,
    templateUrl: 'initiative.component.html'
})

// Efrain Perez
// efrain.abperez23@gmail.com
// LinkedIn: https://www.linkedin.com/in/efra%C3%ADn-p%C3%A9rez-824bbb148/

export class InitiativeComponent implements OnInit {
  private headerRow: string[];
  public filteredStatus = '';
  public filterPreference = 0;
  public filter = 'Filter by';
  public filterInitiative = 'Initiatives';
  private rows: InitiativeModel[];
  private closeResult: string;
  private signUpForm: NgForm;
  private idForm: number;

        constructor(private requestService: InitiativeRequestService, private modalService: NgbModal,
                    private notifications: UtilService) {}

        ngOnInit() {
            this.headerRow =  ['Name',  'Description'];
            this.reloadInitiative();
        }

        public onSubmit(f: NgForm, updateProfile) {
            this.signUpForm = f;
            this.requestService.updateInitiative(this.idForm, {
                name: this.signUpForm.value.initiativeData.initiativeName,
                description: this.signUpForm.value.initiativeData.description,
                imageUrl: this.signUpForm.value.initiativeData.url
            }).subscribe((initiativeUpdated: any) => {
                this.reloadInitiative();
                this.notifications.showNotification('success', 'You update an Initiative!', 'Success', 'ti-pencil-alt');
            });
        }

         public openDeleteInitiative(content, id: number, index: number) {
            this.modalService.open(content).result.then((result: boolean) => {
                if (result) {
                    this.requestService.deleteInitiative(id).subscribe( (initiativeDeleted: any) => {
                        if (initiativeDeleted.success) {
                            this.rows.splice(index, 1);
                            this.notifications.showNotification('warning', 'You just deleted an Initiative', 'Success!', 'ti-eraser');
                        }else {
                            this.notifications.showNotification('danger', initiativeDeleted.message, 'Error!', 'ti-face-sad');
                        }
                    });
                }
            }, (reason) => {
              this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
            });
        }

        private getDismissReason(reason: any): string {
            if (reason === ModalDismissReasons.ESC) {
              return 'by pressing ESC';
            } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
              return 'by clicking on a backdrop';
            }
            return  `with: ${reason}`;
        }

        public openUpdateProfile(content, id: number, index: number) {
            this.idForm = id;
            this.modalService.open(content).result.then((result: boolean) => {
            }, (reason) => {
              this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
            });
        }

        public openCreateInitiative(addInitiative) {
            this.modalService.open(addInitiative).result.then((result: boolean) => {
            }, (reason) => {
              this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
            });
        }

        public onAddSubmit(addInitiative: NgForm, createProfile) {
            this.signUpForm = addInitiative;
            this.requestService.createInitiative({
                name: this.signUpForm.value.newInitiative.name,
                description: this.signUpForm.value.newInitiative.desc,
                imageUrl: this.signUpForm.value.newInitiative.newUrl
            }).subscribe((initiativeCreated: any) => {
                if (initiativeCreated.success) {
                    this.notifications.showNotification('success', 'You Created a new Initiative!', 'Success!', 'ti-face-smile');
                    this.reloadInitiative();
                }else {
                    this.notifications.showNotification('danger', initiativeCreated.message, 'Error!', 'ti-face-sad');
                }
            }, (error) => {
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

        private reloadInitiative() {
            this.rows = [];
            this.requestService.getInitiatives().subscribe((initiatives: any) => {
              initiatives.data.forEach(element => {
                this.rows.push(new InitiativeModel(element.idInitiative, element.name, element.description, element.imageUrl));
              }, (error) => {
              });
        });
        }

    }
