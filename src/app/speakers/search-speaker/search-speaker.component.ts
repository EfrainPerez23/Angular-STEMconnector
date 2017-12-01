import { SpeakerService } from '../service/speaker.service';
import { EventRequestService } from '../../shared/service/request/event-request.service';
import { EventModel } from 'app/events/model/event.model';
import {
  Component,
  OnInit,
  Output,
  EventEmitter,
  SimpleChanges
} from '@angular/core';


@Component({
  selector: 'app-search-speaker',
  templateUrl: './search-speaker.component.html',
  styleUrls: ['./search-speaker.component.css']
})
export class SearchSpeakerComponent implements OnInit {

  private searchSpeaker = '';
  private outputSpeaker = new EventEmitter<string>();
  private outputPreference = new EventEmitter<number>();
  private filterPreference = 0;
  private preference: string[] = ['Name', 'Title', 'Bio'];
  private events: EventModel[];
  private eventSelected: EventModel;
  private showNameEvent = 'All Events';

  constructor(private statusCreated: SpeakerService, private eventService: EventRequestService) { }

  ngOnInit() {
    this.loadEvents();

  }

  public valueChange() {
    this.outputSpeaker.emit(this.searchSpeaker);
    this.outputPreference.emit(this.filterPreference);
  }

  private loadEvents() {
    this.events = [new EventModel(-1, null, 'All Events', '', null, null, '', '' , null, '')];
    this.eventService.getEvents().subscribe((eventsResponse: any) => {
      if (eventsResponse.status) {
        eventsResponse.data.forEach(event => {
          this.events.push(new EventModel(event.idEvent, event.status, event.name, event.description, event.startDate,
                          event.endDate, event.location, event.email, event.Initiative_idInitiative, event.imageUrl));
        });
      }
    });
  }

  public getShowNameEvent(): string {
    return this.showNameEvent;
  }

  public chooseEvent(eventSelected: EventModel) {
    this.eventSelected = eventSelected;
    this.showNameEvent = this.eventSelected.getName();
    this.statusCreated.getSpeakersEvent().emit(this.eventSelected.getIdEvent());
  }


  public getEvents(): EventModel[] {
    return this.events;
  }

  public set setSearchSpeaker(searchSpeaker: string) {
    this.searchSpeaker = searchSpeaker;
  }

  public getSearchSpeaker(): string {
    return this.searchSpeaker;
  }

  public setFilterPreference(filterPreference: number) {
    this.filterPreference = filterPreference;
    this.valueChange();
  }

  public getFilterPreference(): number {
    return this.filterPreference;
  }

  public getPreference(): string[] {
    return this.preference;
  }

  @Output('searchElement')
  public get getSearchSpeakerFilter(): EventEmitter<string> {
    return this.outputSpeaker;
  }

  @Output('preferenceElement')
  public get getOutputPreference(): EventEmitter<number> {
    return this.outputPreference;
  }

}
