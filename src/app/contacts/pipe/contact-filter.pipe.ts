import { Pipe, PipeTransform } from '@angular/core';
import { Contact } from '../model/contact';

@Pipe({
  name: 'contactFilter'
})
export class ContactFilterPipe implements PipeTransform {

  transform(contacts: Contact[], filterString: string, filterPreference: number): Contact[] {
    if (contacts.length === 0 || filterString === '') {
      return contacts;
    }

    const contactFiltered: Contact[] = [];

    switch (filterPreference) {
      case 0:
        for (const contact of contacts) {
          if (contact.getWebsite().toLowerCase().includes(filterString.toLowerCase())) {
            contactFiltered.push(contact);
          }
        }
        break;
      case 1:
          for (const contact of contacts) {
            if (contact.getFacebook().toLowerCase().includes(filterString.toLowerCase())) {
              contactFiltered.push(contact);
            }
          }
          break;
        case 2:
          for (const contact of contacts) {
            if (contact.getGoogleP().toLowerCase().includes(filterString.toLowerCase())) {
              contactFiltered.push(contact);
            }
          }
          break;
        case 3:
        for (const contact of contacts) {
          if (contact.getLinkedIn().toLowerCase().includes(filterString.toLowerCase())) {
            contactFiltered.push(contact);
          }
        }
          break;
      default:
        for (const contact of contacts) {
          if (contact.getTwitter().toLowerCase().includes(filterString.toLowerCase())) {
            contactFiltered.push(contact);
          }
        }
        break;
    }
    return contactFiltered;

  }
}
