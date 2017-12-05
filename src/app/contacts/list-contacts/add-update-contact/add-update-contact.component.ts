import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { CompanyRequestService } from '../../../shared/service/request/company-request.service';
import { Company } from '../../../companies/model/company';
import { NgForm } from '@angular/forms';
import { UtilService } from '../../../shared/service/util.service';
import { ContactService } from '../../service/contact.service';
import { ContactRequestService } from '../../../shared/service/request/contact-request.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-add-update-contact',
  templateUrl: './add-update-contact.component.html',
  styleUrls: ['./add-update-contact.component.css']
})
export class AddUpdateContactComponent implements OnInit {
  private id: number;
  private form: NgForm;
  private addUpdateContact: ElementRef;
  private titleModal: string;
  private messageModal: string;
  private companies: Company[] = [];

  constructor(private companyRequestService: CompanyRequestService, private contactService: ContactService, private util: UtilService,
  private contactRequestService: ContactRequestService, private modalAddUpdateService: NgbModal) { }

  ngOnInit() {
    this.loadCompaniesRequest();
  }

  public onSubmit(form: NgForm) {
    this.form = form;
    if (this.id === -1) {
      this.addEventPhone(this.form.value.contactData);
    }else {
      this.updateEventPhone(this.form.value.contactData);
    }
  }

  public addUpdateContactModal(id: number) {
    this.id = id;
    if (this.id === -1) {
      this.titleModal = 'Creating';
      this.messageModal = 'Create Contact'
    }else {
      this.titleModal = 'Updating';
      this.messageModal = 'Update Contact'
    }
    this.modalAddUpdateService.open(this.addUpdateContact).result.then((result: boolean) => {
    }, (reason) => {
    });
}

  private updateEventPhone(contactData) {
    this.contactRequestService.updateContact(this.id, contactData).subscribe((contactResponse: any) => {
      this.reloadContacts(contactResponse, 'You Updated an Event Phone!', 'ti-pencil-alt');
    });
  }


  private addEventPhone(contactData) {
    this.contactRequestService.createContact(contactData).subscribe((contactResponse: any) => {
      this.reloadContacts(contactResponse, 'You Created a new Event Phone!!', 'ti-face-smile');
    });

  }

  private reloadContacts(contactResponse, messageSuccess: string, icon: string) {
    if (contactResponse.status) {
      this.contactService.getReloadContacts().emit(contactResponse.status);
      this.util.showNotification('success', messageSuccess, 'Success!', icon);
    }else {
      this.util.showNotification('danger', contactResponse.message, 'Error!', 'ti-face-sad');
    }
  }

  private loadCompaniesRequest() {
    this.companyRequestService.getCompanies().subscribe((companiesResponse: any) => {
      if (companiesResponse.success) {
        companiesResponse.data.forEach(company => {
          this.companies.push(new Company(company.idCompany, company.name, company.phone, company.email));
        });
      }
    });
  }

  public getCompanies(): Company[] {
    return this.companies;
  }

  public getTitleModal(): string {
    return this.titleModal;
  }

  public getMessageModal(): string {
    return this.messageModal;
  }

  @ViewChild('addUpdateContact')
  public set setAddUpdateModalInitiative(addUpdateContact: ElementRef) {
    this.addUpdateContact = addUpdateContact;
  }

}
