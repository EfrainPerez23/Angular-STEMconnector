import { Pipe, PipeTransform } from '@angular/core';
import { EventPhone } from '../model/event-phone';

@Pipe({
  name: 'eventPhoneFilter'
})
export class EventPhoneFilterPipe implements PipeTransform {

  transform(eventPhones: EventPhone[], filterString: string, filterPreference: number): EventPhone[] {
    if (eventPhones.length === 0 || filterString === '') {
      return eventPhones;
    }

    const eventPhonesFiltered: EventPhone[] = [];

    for (const eventPhone of eventPhones) {
      if (eventPhone.getPhone().toLowerCase().includes(filterString.toLowerCase())) {
        eventPhonesFiltered.push(eventPhone);
      }
    }

    return eventPhonesFiltered;
  }

}
