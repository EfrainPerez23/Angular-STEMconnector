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
  }

  ngOnInit() {
    this.reloadEventRows();
  }

  private getSearchPreference() {
    this.eventService.getSearchEventPreference().subscribe((search: {eventName: string, preference: number}) => {
      this.eventName = search.eventName,
      this.preference = search.preference
    });
  }

  private reloadEventRows() {
    this.rows = [];
    this.getEventsFromRequest()
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

}