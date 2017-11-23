import {
  Component,
  OnInit,
  Input,
  ViewChild,
  ElementRef,
  Output,
  EventEmitter
} from '@angular/core';
import { Speaker } from '../../model/speaker.model';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { UtilService } from '../../../shared/service/util.service';
import { SpeakerRequestService } from '../../../shared/service/request/speaker-request.service';
import { SpeakerService } from '../../service/speaker.service';

@Component({
  selector: 'app-delete-modal',
  templateUrl: './delete-modal.component.html',
  styleUrls: ['./delete-modal.component.css']
})
export class DeleteModalComponent implements OnInit {

  private speakerToDelete: number;
  private deleteSpeakerModal: ElementRef;
  private speakerToDeleteIndex: number;

  constructor(private modalDeleteService: NgbModal, private notifications: UtilService,
              private speakerService: SpeakerRequestService, private statusDeleted: SpeakerService) { }

  ngOnInit() {
  }

  public set setSpeakerToDelete(speakerToDelete: number) {
    this.speakerToDelete = speakerToDelete;
  }

  @ViewChild('deleteSpeaker')
  public set setModal(deleteSpeakerModal: ElementRef) {
    this.deleteSpeakerModal = deleteSpeakerModal;
  }

  @Input('indexSpeaker')
  public set indexSpeaker(speakerToDeleteIndex: number) {
    this.speakerToDeleteIndex = speakerToDeleteIndex;
  }

  @Input('idSpeaker')
  public set idSpeaker(id: number) {
    this.speakerToDelete = id;
  }


  public deleteModalSpeaker() {
    this.modalDeleteService.open(this.deleteSpeakerModal).result.then((deleteSpeaker: boolean) => {
      if (deleteSpeaker) {
        this.deleteSpeaker();
        console.log(1);

        this.statusDeleted.getStatusDeleted().emit({
          id: this.speakerToDeleteIndex,
          status: deleteSpeaker
        });
      }else {
        console.log(2);
        this.statusDeleted.getStatusDeleted().emit({
          id: this.speakerToDeleteIndex,
          status: deleteSpeaker
        });
      }
    }, (error) => {
      console.log(3);
      this.statusDeleted.getStatusDeleted().emit({
        id: this.speakerToDeleteIndex,
        status: false
      });
    });

  }

  private deleteSpeaker() {
    this.speakerService.deleteSpeaker(this.speakerToDelete).subscribe((speakerDelete: any) => {
      if (speakerDelete.success) {
        this.notifications.showNotification('warning', 'You just deleted an Initiative', 'Success!', 'ti-eraser');
      }else {
          this.notifications.showNotification('danger', speakerDelete.message, 'Error!', 'ti-face-sad');
      }
    });
  }



}
