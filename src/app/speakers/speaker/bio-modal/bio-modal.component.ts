import { Component, OnInit, Input, ElementRef, ViewChild } from '@angular/core';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { UtilService } from '../../../shared/service/util.service';

@Component({
  selector: 'app-bio-modal',
  templateUrl: './bio-modal.component.html',
  styleUrls: ['./bio-modal.component.css']
})
export class BioModalComponent implements OnInit {

  private bioSpeaker = '';
  private bioModal: ElementRef;

  constructor(private modalBioService: NgbModal) { }

  ngOnInit() {
  }

  @Input('bio')
  public set setBioSpeaker(bioSpeaker: string) {
    this.bioSpeaker = bioSpeaker;
  }

  @ViewChild('bioSpeaker')
  public set setBioModal(bioModal: ElementRef) {
    this.bioModal = bioModal;
  }

  public getBioSpeaker(): string {
    return this.bioSpeaker;
  }

  public bioModalSpeaker() {
    this.modalBioService.open(this.bioModal).result.then((result: boolean) => {
    }, (reason) => {
    });
  }

}
