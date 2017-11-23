import { EventEmitter } from '@angular/core';

export class SpeakerService {
  private statusDeleted = new EventEmitter<{id: number, status: boolean}>();
  private statusCreatedOrUpdated = new EventEmitter<boolean>();
  private speakersEvent = new EventEmitter<number>();

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
}
