import { EventEmitter } from '@angular/core';

export class SpeakerService {
  private statusDeleted = new EventEmitter<{id: number, status: boolean}>();
  private statusCreatedOrUpdated = new EventEmitter<boolean>();

  constructor() {}

  public getStatusDeleted(): EventEmitter<{id: number, status: boolean}> {
    return this.statusDeleted;
  }

  public getStatusCreatedOrUpdated(): EventEmitter<boolean> {
    return this.statusCreatedOrUpdated;
  }
}
