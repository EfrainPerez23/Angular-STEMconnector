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
import { InitiativeRequestService } from '../shared/service/request/initiative-request.service';

declare var $: any;
@Component({
    selector: 'dashboard-cmp',
    moduleId: module.id,
    templateUrl: 'dashboard.component.html'
})

// Efrain Perez
// efrain.abperez23@gmail.com
// LinkedIn: https://www.linkedin.com/in/efra%C3%ADn-p%C3%A9rez-824bbb148/

export class DashboardComponent implements OnInit {
  private headerRow: string[];
  public filteredStatus = '';
  public filterPreference = 0;
  public filter = 'Filter by';
  public filterInitiative = 'Initiatives';
  private rows: InitiativeModel[];
  private closeResult: string;
  private signUpForm: NgForm;
  private idForm: number;

        constructor(private requestService: InitiativeRequestService, private modalService: NgbModal) {}
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
            });
        }

         public open(content, id: number, index: number) {
            this.modalService.open(content).result.then((result: boolean) => {
                if (result === true) {
                    this.requestService.deleteInitiative(id).subscribe( (initiativeDeleted: any) => {
                        this.rows.splice(index, 1);
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
            } else {
              return  `with: ${reason}`;
            }
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
                this.showNotification('success', 'You Created a new Initiative!', 'Success!');
                this.reloadInitiative();
            }, (error) => {
                console.log('error en el server');
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
            });
        });
        }

        private showNotification(type: string, message: string, title: string) {
            const color = Math.floor((Math.random() * 4) + 1);
            $.notify({
                icon: "ti-face-smile",
                message: `<b>${title}</b> <br> ${message}.`
            }, {
                type: type,
                timer: 1000,
                placement: {
                    from: 'top',
                    align: 'right'
                }
            });
        }
    }

