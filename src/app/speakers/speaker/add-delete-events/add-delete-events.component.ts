import { Component, OnInit, ViewChild, ElementRef, Input } from '@angular/core';
import { EventRequestService } from '../../../shared/service/request/event-request.service';
import { EventModel } from '../../../events/model/event.model';
import { SpeakerRequestService } from '../../../shared/service/request/speaker-request.service';
import { Speaker } from '../../model/speaker.model';
import { NgForm } from '@angular/forms';
import { SpeakerService } from '../../service/speaker.service';
import { UtilService } from '../../../shared/service/util.service';
import { element } from 'protractor';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-add-delete-events',
  templateUrl: './add-delete-events.component.html',
  styleUrls: ['./add-delete-events.component.css']
})
export class AddDeleteEventsComponent implements OnInit {

  private events: EventModel[] = [];
  private eventsSpeaker: EventModel[] = [];
  private eventToSelect: EventModel[] = [];
  private speaker: Speaker;
  private form: NgForm;
  private addUpdateEventInSpeaker: ElementRef;

  constructor(private eventRequestService: EventRequestService,
              private speakerRequestService: SpeakerRequestService, private addDeleteService: SpeakerRequestService,
              private util: UtilService, private addDeleteEvents: NgbModal) { }

  ngOnInit() {
    this.loadEvents();
    this.setEventsSpeaker();
  }


  public onSubmit(form: NgForm) {
    this.form = form;
    this.addEvent_has_Speaker(this.form.value.speakerEventData.event);
  }

  @ViewChild('addUpdateEventInSpeaker')
  public set setAddUpdateEventInSpeaker(addUpdateEventInSpeaker: ElementRef) {
    this.addUpdateEventInSpeaker = addUpdateEventInSpeaker;
  }

  public addOrDeleteEventsSpeaker() {
    this.addDeleteEvents.open(this.addUpdateEventInSpeaker).result.then((result: boolean) => {
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

  private addEvent_has_Speaker(idEvent: number) {
    console.log(idEvent);
    this.addDeleteService.getLasIdInserted()
    .subscribe((lastId: {success: number, status: number, message: string, data: {lastId: number}}) => {
      console.log(lastId);
      if (lastId.success) {
        this.addDeleteService.addEvent_has_Speaker({
          Event_idEvent: idEvent,
          Speaker_idSpeaker: this.speaker.getIdSpeaker()
        })
        .subscribe((response: any) => {
          if (response.success) {
            this.util.showNotification('success', `You add a new Event in ${this.speaker.getName()}` , 'Success!', 'ti-pencil-alt');
          }
        });
      }
    });
  }

  public getEventToSelect(): EventModel[] {
    return this.eventToSelect;
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
          event.startDate, event.endDate, event.location, event.email, event.Initiative_idInitiative ));
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
          event.startDate, event.endDate, event.location, event.email, event.Initiative_idInitiative ));
        });
      }
    });
  }


}
