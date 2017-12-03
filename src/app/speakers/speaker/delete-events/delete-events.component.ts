import { Component, OnInit, ElementRef, ViewChild, Input } from '@angular/core';
import { EventModel } from '../../../events/model/event.model';
import { Speaker } from '../../model/speaker.model';
import { NgForm } from '@angular/forms';
import { EventRequestService } from '../../../shared/service/request/event-request.service';
import { SpeakerRequestService } from '../../../shared/service/request/speaker-request.service';
import { SpeakerService } from '../../service/speaker.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { UtilService } from '../../../shared/service/util.service';
import { EventsFilterPipe } from '../../pipe/events-filter.pipe';

@Component({
  selector: 'app-delete-events',
  templateUrl: './delete-events.component.html',
  styleUrls: ['./delete-events.component.css']
})
export class DeleteEventsComponent implements OnInit {

  private events: EventModel[] = [];
  private eventsSpeaker: EventModel[] = [];
  private speaker: Speaker;
  private form: NgForm;
  private deleteEventsSpeaker: ElementRef;
  private index: number;

  constructor(private eventRequestService: EventRequestService,
              private speakerRequestService: SpeakerRequestService, private addDeleteService: SpeakerRequestService,
              private util: UtilService, private addDeleteEvents: NgbModal, private speakerService: SpeakerService) { }

  ngOnInit() {
    this.loadEvents();
    this.setEventsSpeaker();
  }


  public onSubmit(form: NgForm) {
    this.form = form;
    this.deleteEvent_has_Speaker(this.form.value.speakerEventData.event);
  }

  @ViewChild('deleteEventsSpeaker')
  public set setAddUpdateEventInSpeaker(deleteEventsSpeaker: ElementRef) {
    this.deleteEventsSpeaker = deleteEventsSpeaker;
  }

  public deleteEventsSpeakerModal() {
    this.addDeleteEvents.open(this.deleteEventsSpeaker).result.then((result: boolean) => {
    }, (reason) => {
    });
  }

  private getEvents(): EventModel[] {
    return this.events;
  }


  @Input('speakerData')
  public set setInputSpeaker(speaker: Speaker) {
    this.speaker = speaker;
  }

  public getSpeaker(): Speaker {
    return this.speaker;
  }

  private deleteEvent_has_Speaker(idEvent: number) {
    this.speakerRequestService.deleteEventsSpeaker(idEvent, this.speaker.getIdSpeaker()).subscribe((deleteResponse: any) => {
      if (deleteResponse.success) {
        this.getIndexOfEvent(idEvent);
        this.util.showNotification('warning', `You delete an Event in ${this.speaker.getName()}` , 'Success!', 'ti-eraser');
        this.speakerService.getStatusCreatedOrUpdated().emit(true);
      }
    });
  }


  private getIndexOfEvent(idEvent: number) {

    for (let index = 0; index < this.eventsSpeaker.length; index++) {
      if (idEvent.toString() === this.eventsSpeaker[index].getIdEvent().toString()) {
        this.speakerService.getDeleteEventSpeaker().emit(index);
        this.eventsSpeaker.splice(index, 1);
      }
    }
  }

  private sendEventAddedToEventsModal(idEvent: number) {
    this.events.forEach((event: EventModel) => {
      if (event.getIdEvent().toString() === idEvent.toString()) {
        this.speakerService.getEventAddedToSpeaker().emit(event);
      }
    });
  }

  public callPipeFilter(): boolean {
    const event: EventsFilterPipe = new EventsFilterPipe();
    if (event.transform(this.events, this.eventsSpeaker).length === 0) {
      return true;
    }
    return false
  }


  @ViewChild('addUpdateEventInSpeaker')
  public set setSpeaker(speaker: Speaker) {
    this.speaker = speaker;
  }

  private loadEvents() {
    this.events = [];
    this.eventRequestService.getEvents().subscribe((eventsResponse: any) => {
      if (eventsResponse.success) {
        eventsResponse.data.forEach(event => {
          this.events.push(new EventModel(event.idEvent, event.status, event.name, event.description,
          event.startDate, event.endDate, event.location, event.email, event.Initiative_idInitiative, event.imageUrl ));
        });
      }
    });
  }

  public getEventsSpeaker(): EventModel[] {
    return this.eventsSpeaker;
  }

  private setEventsSpeaker() {
    this.speakerRequestService.getEventsSpeaker(this.speaker.getIdSpeaker()).subscribe((eventsSpeaker: any) => {
      if (eventsSpeaker.success) {
        eventsSpeaker.data.forEach(event => {
          this.eventsSpeaker.push(new EventModel(event.idEvent, event.status, event.name, event.description,
          event.startDate, event.endDate, event.location, event.email, event.Initiative_idInitiative, event.imageUrl  ));
        });
      }
    });
  }

}
