import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { UtilService } from '../../../shared/service/util.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CompanyRequestService } from '../../../shared/service/request/company-request.service';
import { CompanyService } from '../../service/company.service';

@Component({
  selector: 'app-add-update-company',
  templateUrl: './add-update-company.component.html',
  styleUrls: ['./add-update-company.component.css']
})
export class AddUpdateCompanyComponent implements OnInit {
  private id: number;
  private form: NgForm;
  private addUpdateModalCompany: ElementRef;
  private titleModal: string;
  private messageModal: string;
  mask: any[] = [ '+', /\d/ , ' ', '(', /[1-9]/, /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/];

  constructor(private companyRequestService: CompanyRequestService, private companyService: CompanyService,
  private util: UtilService, private modalAddUpdateService: NgbModal) { }

  ngOnInit() {
  }

  public onSubmit(form: NgForm) {
    this.form = form;
    if (this.id === -1) {
      this.addEventPhone(this.form.value.companyData);
    }else {
      this.updateEventPhone(this.form.value.companyData);
    }
  }

  private updateEventPhone(companyData) {
    this.companyRequestService.updateCompany(this.id, companyData).subscribe((companyResponse: any) => {
      this.reloadInitiativeRows(companyResponse, 'You Updated a Company!', 'ti-pencil-alt');
    });
  }


  private addEventPhone(companyData) {
    this.companyRequestService.createCompany(companyData).subscribe((companyResponse: any) => {
      this.reloadInitiativeRows(companyResponse, 'You Created a new Company!', 'ti-face-smile');
    });

  }

  private reloadInitiativeRows(eventPhoneResponse, messageSuccess: string, icon: string) {
    if (eventPhoneResponse.status) {
      this.companyService.getReloadCompanies().emit(true);
      this.util.showNotification('success', messageSuccess, 'Success!', icon);
    }else {
      this.util.showNotification('danger', eventPhoneResponse.message, 'Error!', 'ti-face-sad');
    }
  }
  public addUpdateCompanyModal(id: number) {
    this.id = id;
    if (this.id === -1) {
      this.titleModal = 'Creating';
      this.messageModal = 'Create Company'
    }else {
      this.titleModal = 'Updating';
      this.messageModal = 'Update Company'
    }
    this.modalAddUpdateService.open(this.addUpdateModalCompany).result.then((result: boolean) => {
    }, (reason) => {
    });
}

  public getTitleModal(): string {
    return this.titleModal;
  }

  public getMessageModal(): string {
    return this.messageModal;
  }

  @ViewChild('addUpdateCompany')
  public set setAddUpdateModalCompany(addUpdateModalCompany: ElementRef) {
    this.addUpdateModalCompany = addUpdateModalCompany;
  }


}
