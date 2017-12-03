import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { UtilService } from '../../../shared/service/util.service';
import { EventPhonesRequestService } from '../../../shared/service/request/event-phones-request.service';
import { EventPhoneServiceService } from '../../service/event-phone-service.service';

@Component({
  selector: 'app-delete-event-phone',
  templateUrl: './delete-event-phone.component.html',
  styleUrls: ['./delete-event-phone.component.css']
})
export class DeleteEventPhoneComponent implements OnInit {
  private deleteModal: ElementRef;
  constructor(private modalDeleteService: NgbModal, private util: UtilService,
  private eventPhonesRequestService: EventPhonesRequestService, private eventPhoneService: EventPhoneServiceService ) { }

  ngOnInit() {
  }

  public deleteEventPhoneModal(idEventPhone: number) {
    this.modalDeleteService.open(this.deleteModal).result.then((initiativeToDelete: boolean) => {
      if (initiativeToDelete) {
        this.deleteEventPhone(idEventPhone);
      }
    }, (error) => {
    });
  }

  @ViewChild('deleteEventPhone')
  public set setDeleteModal(deleteModal: ElementRef) {
    this.deleteModal = deleteModal;
  }

  private deleteEventPhone(idEventPhone: number) {
    this.eventPhonesRequestService.deleteEventPhone(idEventPhone).subscribe((deleteEventPhone: any) => {
      if (deleteEventPhone.success) {
        this.eventPhoneService.getReloadEventPhone().emit(true);
        this.util.showNotification('warning', 'You just deleted an Activity', 'Success!', 'ti-eraser');
      }else {
        this.util.showNotification('warning', deleteEventPhone.message, 'Success!', 'ti-eraser');
      }
    });
  }

}
