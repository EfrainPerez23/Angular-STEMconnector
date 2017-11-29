import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { EventModel } from '../../model/event.model';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-description-event',
  templateUrl: './description-event.component.html',
  styleUrls: ['./description-event.component.css']
})
export class DescriptionEventComponent implements OnInit {
  private descriptionModal: ElementRef;
  private event: EventModel;

  constructor(private modalDescriptionEvent: NgbModal) { }

  ngOnInit() {
  }

  @ViewChild('eventDescription')
  public set setDescriptionModal(descriptionModal: ElementRef) {
    this.descriptionModal = descriptionModal;
  }

  public getEvent(): EventModel {
    return this.event;
  }

  public descriptionModalActivity(event: EventModel) {
    this.event = event;
    this.modalDescriptionEvent.open(this.descriptionModal).result.then((result: boolean) => {
    }, (reason) => {});
  }

}
