import { Component, OnInit, ElementRef, ViewChild, Input } from '@angular/core';
import { NgForm } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { UtilService } from '../../../shared/service/util.service';
import { SpeakerService } from '../../service/speaker.service';
import { SpeakerRequestService } from '../../../shared/service/request/speaker-request.service';

@Component({
  selector: 'app-update-add-model',
  templateUrl: './update-add-model.component.html',
  styleUrls: ['./update-add-model.component.css']
})
export class UpdateAddModelComponent implements OnInit {
  private id: number;
  private addUpdateModal: ElementRef;
  private titleModal: string;
  private messageModal: string;
  private form: NgForm;

  constructor(private modalAddUpdateService: NgbModal, private notifications: UtilService,
              private addOrUpdateService: SpeakerRequestService, private addOrUpdate: SpeakerService) {
   }

  ngOnInit() {
    if (this.id === -1) {
      this.titleModal = 'Create';
      this.messageModal = 'Creating Speaker';
    }else {
      this.titleModal = 'Update';
      this.messageModal = 'Updating Speaker';
    }
  }

  public onSubmit(form: NgForm) {
    this.form = form;
    if (this.id === -1) {
      this.addSpeaker(this.form.value.speakerData);
    }else {
      this.updateSpeaker(this.form.value.speakerData);
    }
  }

  @ViewChild('modal')
  public set setAddUpdateModal(addUpdateModal: ElementRef) {
    this.addUpdateModal = addUpdateModal;
  }

  public updateModalSpeaker() {
    this.modalAddUpdateService.open(this.addUpdateModal).result.then((result: boolean) => {
    }, (reason) => {
    });
  }

  @Input('idSpeaker')
  public set setId(id: number) {
    this.id = id;
  }

  public getTitleModal(): string {
    return this.titleModal;
  }

  public getMessageModal(): string {
    return this.messageModal;
  }

  private addSpeaker(speakerData: {name: string, title: string, bio: string, imageUrl: string}) {
    this.addOrUpdateService.createSpeaker(speakerData).subscribe((speakerCreated: any) => {
      if (speakerCreated.success) {
        this.notifications.showNotification('success', 'You add a new Speaker!', 'Success!', 'ti-pencil-alt');
        this.addOrUpdate.getStatusCreatedOrUpdated().emit(speakerCreated.success);
      }else {
        this.notifications.showNotification('danger', speakerCreated.message, 'Error!', 'ti-face-sad');
      }
    });
  }

  private updateSpeaker(speakerData: {name: string, title: string, bio: string, imageUrl: string}) {
    console.log(speakerData);
    this.addOrUpdateService.updateSpeaker(this.id, speakerData).subscribe((speakerCreated: any) => {
      if (speakerCreated.status) {
        this.notifications.showNotification('success', 'You Update an Speaker!', 'Success!', 'ti-pencil-alt');
        this.addOrUpdate.getStatusCreatedOrUpdated().emit(speakerCreated.status);
      }else {
        this.notifications.showNotification('danger', speakerCreated.message, 'Error!', 'ti-face-sad');
      }
    });
  }

}
