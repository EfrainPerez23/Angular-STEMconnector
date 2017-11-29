import { Component, OnInit } from '@angular/core';
import { EventService } from '../service/event.service';
import { EventModel } from '../model/event.model';
import { EventRequestService } from '../../shared/service/request/event-request.service';

@Component({
  selector: 'app-list-events',
  templateUrl: './list-events.component.html',
  styleUrls: ['./list-events.component.css']
})
export class ListEventsComponent implements OnInit {
  private headerRow: string[] = ['Name', 'Start Date', 'End Date', 'Location', 'Email',  'Description' ];
  private rows: EventModel[];
  private eventName = '';
  private preference = 0;

  constructor(private eventService: EventService, private eventRequestService: EventRequestService) {
    this.getSearchPreference();
    this.deleteEventService();
    this.getAddUpdateEvent();
  }

  ngOnInit() {
    this.reloadEventRows();
    this.getEventsByInitiative();
  }

  private getSearchPreference() {
    this.eventService.getSearchEventPreference().subscribe((search: {eventName: string, preference: number}) => {
      this.eventName = search.eventName,
      this.preference = search.preference
    });
  }

  private getAddUpdateEvent() {
    this.eventService.getAddUpdateEvent().subscribe((event: boolean) => {
      if (event) {
        this.reloadEventRows();
      }
    })
  }

  private reloadEventRows() {
    this.rows = [];
    this.getEventsFromRequest()
  }

  private getEventsByInitiative() {
    this.eventService.getSearchByInitiative().subscribe((id: number) => {
      if (id !== -1) {
        this.rows = [];
        this.eventRequestInitiative(id);
      }else {
        this.reloadEventRows();
      }
    });
  }

  private eventRequestInitiative(id: number) {
    this.eventRequestService.getEventsFromInitiative(id).subscribe((events: any) => {
      if (events.success) {
        events.data.forEach(event => {
          this.rows.push(new EventModel(event.idEvent, event.status, event.name, event.description, event.startDate,
            event.endDate, event.location, event.email, event.Initiative_idInitiative));
         });
      }
    });
  }

  private deleteEventService() {
    this.eventService.getDeleteEvent().subscribe((index: number) => {
      this.rows.splice(index, 1);
    });
  }

  public setActiveRowColor(event: EventModel): string {
    if (event.getStatus()) {
      return '#e6f3ec';
    }
    return '#f5e1e5';
  }

  private getEventsFromRequest() {
    this.eventRequestService.getEvents().subscribe((events: any) => {
      if (events.success) {
        events.data.forEach(event => {
          this.rows.push(new EventModel(event.idEvent, event.status, event.name, event.description, event.startDate,
            event.endDate, event.location, event.email, event.Initiative_idInitiative));
         });
      }
    });
  }

  public getRows(): EventModel[] {
    return this.rows;
  }

  public getHeaderRow(): string[] {
    return this.headerRow;
  }

  public getEventName(): string {
    return this.eventName;
  }

  public getPreference(): number {
    return this.preference;
  }

}
