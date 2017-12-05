import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { UtilService } from '../../../shared/service/util.service';
import { ContactService } from '../../service/contact.service';
import { ContactRequestService } from '../../../shared/service/request/contact-request.service';

@Component({
  selector: 'app-contact-delete',
  templateUrl: './contact-delete.component.html',
  styleUrls: ['./contact-delete.component.css']
})
export class ContactDeleteComponent implements OnInit {
  private deleteModal: ElementRef;

  constructor(private modalDeleteService: NgbModal, private util: UtilService,
  private contactService: ContactService, private contactRequestService: ContactRequestService) { }

  ngOnInit() {
  }

  public deleteContactModal(idContact: number, index: number) {
    this.modalDeleteService.open(this.deleteModal).result.then((initiativeToDelete: boolean) => {
      if (initiativeToDelete) {
        this.deleteContact(idContact, index);
      }
    }, (error) => {
    });
  }

  @ViewChild('deleteContact')
  public set setDeleteModal(deleteModal: ElementRef) {
    this.deleteModal = deleteModal;
  }

  private deleteContact(idContact: number, index: number) {
    this.contactRequestService.deleteContact(idContact).subscribe((deleteContact: any) => {
      if (deleteContact.success) {
        this.contactService.getIndexContactDeleted().emit(index);
        this.util.showNotification('warning', 'You just deleted a Contact', 'Success!', 'ti-eraser');
      }else {
        this.util.showNotification('warning', deleteContact.message, 'Success!', 'ti-eraser');
      }
    });
  }

}
