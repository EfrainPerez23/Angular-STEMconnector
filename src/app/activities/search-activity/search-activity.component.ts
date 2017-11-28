import { Component, OnInit } from '@angular/core';
import { EventModel } from 'app/event/model/event.model';
import { EventRequestService } from '../../shared/service/request/event-request.service';
import { ActivityService } from '../service/activity.service';

@Component({
  selector: 'app-search-activity',
  templateUrl: './search-activity.component.html',
  styleUrls: ['./search-activity.component.css']
})
export class SearchActivityComponent implements OnInit {

  private preference: string[] = ['Name', 'Start Time', 'End Time', 'Description'];
  private filterPreference = 0;
  private events: EventModel[];
  private eventSelected: EventModel;
  private showNameEvent = 'All Events';
  private searchActivity = ''




  constructor(private eventService: EventRequestService, private activityService: ActivityService) { }

  ngOnInit() {
    this.loadEvents();
  }

  private loadEvents() {
    this.events = [new EventModel(-1, null, 'All Events', '', null, null, '', '' , null)];
    this.eventService.getEvents().subscribe((eventsResponse: any) => {
      if (eventsResponse.status) {
        eventsResponse.data.forEach(event => {
          this.events.push(new EventModel(event.idEvent, event.status, event.name, event.description, event.startDate,
                          event.endDate, event.location, event.email, event.Initiative_idInitiative));
        });
      }
    });
  }

  public valueChange() {
    this.activityService.getSearchActivityPreference().emit({
      activityName: this.searchActivity,
      preference: this.filterPreference
    });
  }

  public chooseEvent(eventSelected: EventModel) {
    this.eventSelected = eventSelected;
    this.showNameEvent = this.eventSelected.getName();
    this.activityService.getActivitiesFromEvent().emit(eventSelected.getIdEvent());
  }

  public getShowNameEvent(): string {
    return this.showNameEvent;
  }

  public getEvents(): EventModel[] {
    return this.events;
  }

  public getFilterPreference(): number {
    return this.filterPreference;
  }

  public setFilterPreference(filterPreference: number) {
    this.filterPreference = filterPreference;
    this.valueChange();
  }

  public getPreference(): string[] {
    return this.preference;
  }

  public getSearchActivity(): string {
    return this.searchActivity;
  }

  public set setSearchActivity(searchActivity: string) {
    this.searchActivity = searchActivity;
  }

}
