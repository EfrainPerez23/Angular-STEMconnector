import { Component, OnInit } from '@angular/core';
import { EventPhone } from '../model/event-phone';
import { EventPhonesRequestService } from '../../shared/service/request/event-phones-request.service';
import { EventPhoneServiceService } from '../service/event-phone-service.service';

@Component({
  selector: 'app-list-event-phones',
  templateUrl: './list-event-phones.component.html',
  styleUrls: ['./list-event-phones.component.css']
})
export class ListEventPhonesComponent implements OnInit {
  private headerRow: string[] = ['Number' ];
  private rows: EventPhone[] = [];
  private phoneSearched = '';
  private preference = 0;


  constructor(private eventPhonesRequestService: EventPhonesRequestService, private eventPhoneServiceService: EventPhoneServiceService) {
    this.getEventPhoneFromEvent();
    this.reloadUpdateAdd();
    this.searchPreference();
   }

  ngOnInit() {
    this.loadEventPhones();
  }

  public getHeaderRow(): string[] {
    return this.headerRow;
  }

  private reloadUpdateAdd() {
    this.eventPhoneServiceService.getReloadEventPhone().subscribe((reload: boolean) => {
      if (reload) {
        this.loadEventPhones();
      }
    })
  }

  private searchPreference() {
    this.eventPhoneServiceService.getSearchEventPhonePreference().subscribe((result: {search: string, preference: number}) => {
      this.phoneSearched = result.search,
      this.preference = result.preference
    });
  }

  public getPhoneSearched(): string {
    return this.phoneSearched;
  }

  public getPreference(): number {
    return this.preference;
  }

  private getEventPhoneFromEvent() {
    this.eventPhoneServiceService.getEventPreference().subscribe((idEvent: number) => {
      if (idEvent === -1) {
          this.loadEventPhones();
      }else {
        this.loadEventPhonesFromEvent(idEvent);
      }
    });
  }

  private loadEventPhonesFromEvent(idEvent) {
    this.rows = [];
    this.eventPhonesRequestService.getEventsPhoneFromEvent(idEvent).subscribe((eventResponse: any) => {
      if (eventResponse.success) {
        eventResponse.data.forEach(eventPhone => {
          this.rows.push(new EventPhone(eventPhone.idEventPhone, eventPhone.phone, eventPhone.Event_idEvent));
        });
      }
    });
  }


  private loadEventPhones() {
    this.rows = [];
    this.eventPhonesRequestService.getEventPhone().subscribe((eventPhones: any) => {
      if (eventPhones.success) {
        eventPhones.data.forEach(eventPhone => {
          this.rows.push(new EventPhone(eventPhone.idEventPhone, eventPhone.phone, eventPhone.Event_idEvent));
        });
      }
    });
  }

  public getRows(): EventPhone[] {
    return this.rows;
  }

}
