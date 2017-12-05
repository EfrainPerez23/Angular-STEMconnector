import { Component, OnInit } from '@angular/core';
import { Contact } from '../model/contact';
import { ContactRequestService } from '../../shared/service/request/contact-request.service';

@Component({
  selector: 'app-list-contacts',
  templateUrl: './list-contacts.component.html',
  styleUrls: ['./list-contacts.component.css']
})
export class ListContactsComponent implements OnInit {
  private headerRow: string[] = ['LinkedIn', 'Facebook', 'GoogleP', 'Website', 'Twitter' ];
  private rows: Contact[] = [];
  private contactSearched = '';
  private preference = 0;

  constructor(private contactRequestService: ContactRequestService) { }

  ngOnInit() {
    this.loadContacts();
  }

  public getContactSearched(): string {
    return this.contactSearched;
  }

  public getHeaderRow(): string[] {
    return this.headerRow;
  }

  public getPreference(): number {
    return this.preference;
  }

  public getRows(): Contact[] {
    return this.rows;
  }
  public redirectTo(url: string) {
    if (url && url !== '') {
      window.open(url, '_blank');
    }
  }

  private loadContacts() {
    this.rows = [];
    this.contactRequestService.getContacts().subscribe((contactsResponse: any) => {
      if (contactsResponse.success) {
        contactsResponse.data.forEach(contact => {
          this.rows.push(new Contact(contact.idContact, contact.linkedIn, contact.facebook, contact.googleP,
          contact.website, contact.Company_idCompany, contact.twitter));
        });
      }
    });
  }

}
