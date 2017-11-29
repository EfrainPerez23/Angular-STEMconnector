import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { InitiativeModel } from '../../model/initiative.model';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { InitiativeService } from '../../service/initiative.service';
import { InitiativeRequestService } from '../../../shared/service/request/initiative-request.service';
import { UtilService } from '../../../shared/service/util.service';

@Component({
  selector: 'app-initiative-delete',
  templateUrl: './initiative-delete.component.html',
  styleUrls: ['./initiative-delete.component.css']
})
export class InitiativeDeleteComponent implements OnInit {
  private deleteModal: ElementRef;

  constructor(private modalDeleteService: NgbModal, private initiativeService: InitiativeService,
    private initiativeRequestService: InitiativeRequestService, private util: UtilService) { }

  ngOnInit() {
  }

  public deleteModalInitiative(deleteInitiative: InitiativeModel, initiativeIndex: number) {
    this.modalDeleteService.open(this.deleteModal).result.then((initiativeToDelete: boolean) => {
      if (initiativeToDelete) {
        this.deleteInitiative(deleteInitiative, initiativeIndex);
      }
    }, (error) => {
    });
  }

  @ViewChild('deleteInitiative')
  public set setDeleteModal(deleteModal: ElementRef) {
    this.deleteModal = deleteModal;
  }
  private deleteInitiative(deleteInitiative: InitiativeModel, initiativeIndex: number) {
    this.initiativeRequestService.deleteInitiative(deleteInitiative.getIdInitiative()).subscribe((deleteResponse: any) => {
      console.log(deleteResponse);
      if (deleteResponse.success) {
        this.util.showNotification('warning', 'You just deleted an Activity', 'Success!', 'ti-eraser');
        this.initiativeService.getInitiativeDeletedIndex().emit(initiativeIndex);
      }else {
        this.util.showNotification('danger', deleteResponse.message, 'Error!', 'ti-face-sad');
      }
    });
  }



}
