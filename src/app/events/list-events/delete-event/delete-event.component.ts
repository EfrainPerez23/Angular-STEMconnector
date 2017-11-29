import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { EventModel } from 'app/events/model/event.model';
import { UtilService } from '../../../shared/service/util.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { EventService } from '../../service/event.service';
import { EventRequestService } from '../../../shared/service/request/event-request.service';

@Component({
  selector: 'app-delete-event',
  templateUrl: './delete-event.component.html',
  styleUrls: ['./delete-event.component.css']
})
export class DeleteEventComponent implements OnInit {
  private deleteModal: ElementRef;

  constructor(private modalDeleteService: NgbModal, private eventService: EventService,
    private eventRequestService: EventRequestService, private util: UtilService) { }

  ngOnInit() {
  }

  public deleteModalEvent(deleteEvent: EventModel, eventIndex: number) {
    this.modalDeleteService.open(this.deleteModal).result.then((initiativeToDelete: boolean) => {
      if (initiativeToDelete) {
        this.deleteEvent(deleteEvent, eventIndex);
      }
    }, (error) => {
    });
  }

  private deleteEvent(event: EventModel, index: number) {
    this.eventRequestService.deleteEvent(event.getIdEvent()).subscribe((deleteResponse: any) => {
      if (deleteResponse.success) {
        this.util.showNotification('warning', 'You just deleted an Event', 'Success!', 'ti-eraser');
        this.eventService.getDeleteEvent().emit(index);
      }else {
        this.util.showNotification('danger', deleteResponse.message, 'Error!', 'ti-face-sad');
      }
    });
  }

  @ViewChild('deleteEvent')
  public set setDeleteModal(deleteModal: ElementRef) {
    this.deleteModal = deleteModal;
  }

}
