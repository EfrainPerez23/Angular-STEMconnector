import { Component, OnInit } from '@angular/core';
import { EventModel } from '../../events/model/event.model';
import { EventRequestService } from '../../shared/service/request/event-request.service';
import { EventPhoneServiceService } from '../service/event-phone-service.service';

@Component({
  selector: 'app-search-event-phone',
  templateUrl: './search-event-phone.component.html',
  styleUrls: ['./search-event-phone.component.css']
})
export class SearchEventPhoneComponent implements OnInit {

  private preferences: string[] = ['Phone Number'];
  private events: EventModel[] = [];
  private filterPreference = 0;
  private searchEventPhone = '';
  private eventSelected: EventModel = new EventModel(-1, false, 'All Events', '', null, null, '', '', -1, '');

  constructor(private eventRequestService: EventRequestService, private eventPhoneService: EventPhoneServiceService) { }

  ngOnInit() {
    this.getEventsFromRequest();
  }

  public getEvents(): EventModel[] {
    return this.events;
  }

  public valueChange() {
    console.log(this.searchEventPhone, this.filterPreference);
    this.eventPhoneService.getSearchEventPhonePreference().emit({
      search: this.searchEventPhone,
      preference: this.filterPreference
    });
  }

  private getEventsFromRequest() {
    this.events = [new EventModel(-1, false, 'All Events', '', null, null, '', '', -1, '')];
    this.eventRequestService.getEvents().subscribe((events: any) => {
      if (events.success) {
        events.data.forEach(event => {
          this.events.push(new EventModel(event.idEvent, event.status, event.name, event.description, event.startDate,
            event.endDate, event.location, event.email, event.Initiative_idInitiative, event.imageUrl));
         });
      }
    });
  }

  public set setSearchEventPhone(searchEventPhone: string) {
    this.searchEventPhone = searchEventPhone;
  }

  public getPreferences(): string[] {
    return this.preferences;
  }

  public getFilterPreference(): number {
    return this.filterPreference;
  }

  public setFilteredPreference(filterPreference: number) {
    this.filterPreference = filterPreference;
    this.valueChange();
  }

  public chooseEvent(event: EventModel) {
    this.eventSelected = event;
    this.eventPhoneService.getEventPreference().emit(event.getIdEvent());

  }

  public getEventSelected(): EventModel {
    return this.eventSelected;
  }

}
