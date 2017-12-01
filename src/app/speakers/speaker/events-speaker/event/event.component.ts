import { Component, OnInit, Input } from '@angular/core';
import { EventModel } from '../../../../events/model/event.model';

@Component({
  selector: 'app-event',
  templateUrl: './event.component.html',
  styleUrls: ['./event.component.css']
})
export class EventComponent implements OnInit {
  private event: EventModel;

  constructor() { }

  ngOnInit() {
  }
  public getEvent(): EventModel {
    return this.event;
  }

  @Input('eventElement')
  public set setEvent(event: EventModel) {
    this.event = event;
  }

}
