import { Pipe, PipeTransform } from '@angular/core';
import { EventModel } from '../../events/model/event.model';

@Pipe({
  name: 'eventsFilter'
})
export class EventsFilterPipe implements PipeTransform {

  transform(events: EventModel[], eventSpeaker: EventModel[]): EventModel[] {
    console.log(events);
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
