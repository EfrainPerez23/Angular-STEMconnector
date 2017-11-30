import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { UtilService } from '../../../shared/service/util.service';
import { InternRequestService } from '../../../shared/service/request/intern-request.service';
import { InternService } from '../../service/intern.service';
import { Intern } from '../../model/intern';

@Component({
  selector: 'app-intern-delete',
  templateUrl: './intern-delete.component.html',
  styleUrls: ['./intern-delete.component.css']
})
export class InternDeleteComponent implements OnInit {

  private deleteInternModal: ElementRef;

  constructor(private modalDeleteService: NgbModal, private notifications: UtilService,
              private internRequestService: InternRequestService, private internService: InternService) { }

  ngOnInit() {
  }

  @ViewChild('deleteIntern')
  public set setModal(deleteInternModal: ElementRef) {
    this.deleteInternModal = deleteInternModal;
  }


  public deleteModalIntern(intern: Intern, index: number) {
    this.modalDeleteService.open(this.deleteInternModal).result.then((deleteSpeaker: boolean) => {
      if (deleteSpeaker) {
        this.deleteIntern(intern);
        this.internService.getStatusDeleted().emit(index);
      }
    }, (error) => {
    });

  }

  private deleteIntern(intern: Intern) {
    this.internRequestService.deleteIntern(intern.getIdIntern()).subscribe((internDeleted: any) => {
      if (internDeleted.success) {
        this.notifications.showNotification('warning', 'You just deleted an Intern', 'Success!', 'ti-eraser');
      }else {
          this.notifications.showNotification('danger', internDeleted.message, 'Error!', 'ti-face-sad');
      }
    });
  }

}
