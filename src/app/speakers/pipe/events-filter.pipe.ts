import { Pipe, PipeTransform } from '@angular/core';
import { EventModel } from '../../events/model/event.model';

@Pipe({
  name: 'eventsFilter',
  pure: false
})
export class EventsFilterPipe implements PipeTransform {

  transform(events: EventModel[], eventSpeaker: EventModel[]): EventModel[] {
    if (events.length === 0 ) {
      return events;
    }

    if (events.length === eventSpeaker.length) {
      return [];
    }

    const eventFiltered: EventModel[] = [];
    events.forEach((event: EventModel) => {
      eventSpeaker.forEach((element: EventModel) => {
        if (event.getName() !== element.getName()) {
          eventFiltered.push(event);
        }
      });
    });
    return eventFiltered;
  }

}
