import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { InitiativeService } from '../../service/initiative.service';
import { InitiativeRequestService } from '../../../shared/service/request/initiative-request.service';
import { UtilService } from '../../../shared/service/util.service';

@Component({
  selector: 'app-initiative-add-update',
  templateUrl: './initiative-add-update.component.html',
  styleUrls: ['./initiative-add-update.component.css']
})
export class InitiativeAddUpdateComponent implements OnInit {
  private id: number;
  private addUpdateModalInitiative: ElementRef;
  private titleModal: string;
  private messageModal: string;
  private form: NgForm;

  constructor(private modalAddUpdateService: NgbModal, private initiativeService: InitiativeService,
              private initiativeRequestService: InitiativeRequestService, private util: UtilService) { }

  ngOnInit() {
  }

  public onSubmit(form: NgForm) {
    this.form = form;
    if (this.id === -1) {
      this.addInitiative(this.form.value.initiativeData);
    }else {
      this.updateInitiative(this.form.value.initiativeData);
    }
  }

  private updateInitiative(initiativeData) {
    this.initiativeRequestService.updateInitiative(this.id, initiativeData).subscribe((initiativeResponse: any) => {
      this.reloadInitiativeRows(initiativeResponse, 'You Updated an Initiative!', 'ti-pencil-alt');
    });
  }


  private addInitiative(initiativeData) {
    this.initiativeRequestService.createInitiative(initiativeData).subscribe((initiativeResponse: any) => {
      this.reloadInitiativeRows(initiativeResponse, 'You Created a new Initiative!', 'ti-face-smile');
    });

  }

  private reloadInitiativeRows(activityResponse, messageSuccess: string, icon: string) {
    if (activityResponse.status) {
      this.initiativeService.getInitiativeReload().emit(true);
      this.util.showNotification('success', messageSuccess, 'Success!', icon);
    }else {
      this.util.showNotification('danger', activityResponse.message, 'Error!', 'ti-face-sad');
    }
  }

  public addUpdateInitiative(id: number) {
    this.id = id;
    if (this.id === -1) {
      this.titleModal = 'Creating';
      this.messageModal = 'Create Activity'
    }else {
      this.titleModal = 'Updating';
      this.messageModal = 'Update Activity'
    }
    this.modalAddUpdateService.open(this.addUpdateModalInitiative).result.then((result: boolean) => {
    }, (reason) => {
    });
}

  public getTitleModal(): string {
    return this.titleModal;
  }

  public getMessageModal(): string {
    return this.messageModal;
  }

  @ViewChild('addUpdateInitiative')
  public set setAddUpdateModalInitiative(addUpdateModalInitiative: ElementRef) {
    this.addUpdateModalInitiative = addUpdateModalInitiative;
  }

}
