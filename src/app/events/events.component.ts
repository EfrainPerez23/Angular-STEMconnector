import { Component, OnInit } from '@angular/core';
import { EventService } from './service/event.service';
@Component({
    selector: 'app-events',
    moduleId: module.id,
    templateUrl: './events.component.html',
    providers: [EventService]
})

export class EventsComponent implements OnInit {

    constructor() {}

    ngOnInit() {
    }
}
