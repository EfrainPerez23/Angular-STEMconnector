import { EventEmitter } from '@angular/core';
import { EventModel } from '../../events/model/event.model';

export class SpeakerService {
  private statusDeleted = new EventEmitter<{id: number, status: boolean}>();
  private statusCreatedOrUpdated = new EventEmitter<boolean>();
  private speakersEvent = new EventEmitter<number>();
  private eventAddedToSpeaker = new EventEmitter<EventModel>();
  private deleteEventSpeaker = new EventEmitter<number>();
  private reloadSpeakers = new EventEmitter<boolean>();

  constructor() {}

  public getStatusDeleted(): EventEmitter<{id: number, status: boolean}> {
    return this.statusDeleted;
  }

  public getStatusCreatedOrUpdated(): EventEmitter<boolean> {
    return this.statusCreatedOrUpdated;
  }

  public getSpeakersEvent(): EventEmitter<number> {
    return this.speakersEvent;
  }

  public getEventAddedToSpeaker(): EventEmitter<EventModel> {
    return this.eventAddedToSpeaker;
  }

  public getDeleteEventSpeaker(): EventEmitter<number> {
    return this.deleteEventSpeaker;
  }

  public getReloadSpeakers(): EventEmitter<boolean> {
    return this.reloadSpeakers;
  }
}
