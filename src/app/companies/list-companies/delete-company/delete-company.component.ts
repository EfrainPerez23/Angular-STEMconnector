import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { UtilService } from '../../../shared/service/util.service';
import { CompanyService } from '../../service/company.service';
import { CompanyRequestService } from '../../../shared/service/request/company-request.service';

@Component({
  selector: 'app-delete-company',
  templateUrl: './delete-company.component.html',
  styleUrls: ['./delete-company.component.css']
})
export class DeleteCompanyComponent implements OnInit {

  private deleteModal: ElementRef;
  constructor(private modalDeleteService: NgbModal, private util: UtilService,
  private companyService: CompanyService, private companyRequestService: CompanyRequestService ) { }

  ngOnInit() {
  }

  public deleteCompanyModal(idCompany: number) {
    this.modalDeleteService.open(this.deleteModal).result.then((initiativeToDelete: boolean) => {
      if (initiativeToDelete) {
        this.deleteEventPhone(idCompany);
      }
    }, (error) => {
    });
  }

  @ViewChild('deleteCompany')
  public set setDeleteModal(deleteModal: ElementRef) {
    this.deleteModal = deleteModal;
  }

  private deleteEventPhone(idCompany: number) {
    this.companyRequestService.deleteCompany(idCompany).subscribe((deleteCompany: any) => {
      if (deleteCompany.success) {
        this.companyService.getReloadCompanies().emit(true);
        this.util.showNotification('warning', 'You just deleted a Company', 'Success!', 'ti-eraser');
      }else {
        this.util.showNotification('danger', deleteCompany.message, 'Success!', 'ti-eraser');
      }
    });
  }

}
