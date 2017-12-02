import { Component, OnInit, ViewChild, ElementRef, Input } from '@angular/core';
import { Speaker } from '../../model/speaker.model';
import { EventModel } from '../../../events/model/event.model';
import { SpeakerRequestService } from '../../../shared/service/request/speaker-request.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { SpeakerService } from '../../service/speaker.service';

@Component({
  selector: 'app-events-speaker',
  templateUrl: './events-speaker.component.html',
  styleUrls: ['./events-speaker.component.css']
})
export class EventsSpeakerComponent implements OnInit {
  private speaker: Speaker;
  private eventsSpeaker: EventModel[] = [];
  private eventsModal: ElementRef;

  constructor(private speakerRequestService: SpeakerRequestService, private modalService: NgbModal,
  private speakerService: SpeakerService) {
    this.deleteEventSpeakerSelected();
  }

  ngOnInit() {
    this.setEventsSpeaker();
    this.addEventSelected();
  }

  public getEventsSpeaker(): EventModel[] {
    return this.eventsSpeaker;
  }

  @ViewChild('eventsSpeakerModal')
  public set setEventsModal(eventsModal: ElementRef) {
    this.eventsModal = eventsModal;
  }

  private deleteEventSpeakerSelected() {
    this.speakerService.getDeleteEventSpeaker().subscribe((index: number) => {
      this.eventsSpeaker.splice(index, 1);
    })
  }

  private addEventSelected() {
    this.speakerService.getEventAddedToSpeaker().subscribe((event: EventModel) => {
      this.eventsSpeaker.push(event);
    })
  }

  @Input('speakerSelected')
  public set setSpeaker(speaker: Speaker) {
    this.speaker = speaker;
  }

  private setEventsSpeaker() {
    this.speakerRequestService.getEventsSpeaker(this.speaker.getIdSpeaker()).subscribe((eventsSpeaker: any) => {
      if (eventsSpeaker.success) {
        eventsSpeaker.data.forEach(event => {
          this.eventsSpeaker.push(new EventModel(event.idEvent, event.status, event.name, event.description,
          event.startDate, event.endDate, event.location, event.email, event.Initiative_idInitiative, event.imageUrl));
        });
      }
    });
  }

  public eventsSpeakerModal() {
    this.modalService.open(this.eventsModal).result.then((result: boolean) => {
    }, (reason) => {
    });
  }

}
