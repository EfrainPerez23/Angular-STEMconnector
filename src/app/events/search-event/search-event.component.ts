import { Component, OnInit } from '@angular/core';
import { InitiativeModel } from '../../initiatives/model/initiative.model';
import { InitiativeRequestService } from '../../shared/service/request/initiative-request.service';
import { EventService } from '../service/event.service';

@Component({
  selector: 'app-search-event',
  templateUrl: './search-event.component.html',
  styleUrls: ['./search-event.component.css']
})
export class SearchEventComponent implements OnInit {
  private preference: string[] = ['Name', 'Start Date', 'End Date', 'Location', 'Active', 'Email',  'Description' ];
  private searchEvent = '';
  private filterPreference = 0;
  private initiatives: InitiativeModel[];
  private initiativeSelected: InitiativeModel = new InitiativeModel(-1, 'All Initiatives', null, null);


  constructor(private initiativeRequestService: InitiativeRequestService, private eventService: EventService) { }

  ngOnInit() {
    this.loadInitiatives();
  }

  private loadInitiatives() {
    this.initiatives = [new InitiativeModel(-1, 'All Initiatives', null, null)];
    this.initiativeRequest();
  }

  private initiativeRequest() {
    this.initiativeRequestService.getInitiatives().subscribe((initiativeResponse: any) => {
      if (initiativeResponse.success) {
        initiativeResponse.data.forEach(initiative => {
          this.initiatives.push(new InitiativeModel(initiative.idInitiative, initiative.name, initiative.description, initiative.imageUrl));
        });
      }
    });
  }

  public valueChange() {
    this.eventService.getSearchEventPreference().emit({
      eventName: this.searchEvent,
      preference: this.filterPreference
    });
  }

  public chooseInitiative(initiativeSelected: InitiativeModel) {
    this.initiativeSelected = initiativeSelected;
  }

  public getInitiativeSelected(): InitiativeModel {
    return this.initiativeSelected;
  }

  public getFilterPreference(): number {
    return this.filterPreference;
  }

  public getPreference(): string[] {
    return this.preference;
  }

  public setFilteredPreference(filterPreference: number) {
    this.filterPreference = filterPreference;
    this.valueChange();
  }

  public set setSearchEvent(searchEvent) {
    this.searchEvent = searchEvent;
  }

  public getInitiatives(): InitiativeModel[] {
    return this.initiatives;
  }

}
