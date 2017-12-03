import { Component, OnInit } from '@angular/core';
import { EventPhoneServiceService } from './service/event-phone-service.service';

@Component({
  selector: 'app-event-phones',
  templateUrl: './event-phones.component.html',
  styleUrls: ['./event-phones.component.css'],
  providers: [EventPhoneServiceService]
})
export class EventPhonesComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
