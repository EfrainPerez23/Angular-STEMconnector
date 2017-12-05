import { Component, OnInit } from '@angular/core';
import { Contact } from '../model/contact';
import { ContactRequestService } from '../../shared/service/request/contact-request.service';
import { ContactService } from '../service/contact.service';

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

  constructor(private contactRequestService: ContactRequestService, private contactService: ContactService) { 
    this.getCompanyPreference();
    this.reloadContactService();
    this.deleteContactService();
    this.getFilterContactPreference();
  }

  ngOnInit() {
    this.loadContacts();
  }

  private getFilterContactPreference() {
    this.contactService.getSearchContactPreference().subscribe((searched: {search: string, preference: number}) => {
      this.contactSearched = searched.search,
      this.preference = searched.preference
    });
  }

  private getCompanyPreference() {
    this.contactService.getCompanyPreferences().subscribe((idCompany: number) => {
      if (idCompany !== -1) {
        this.loadContactsFromCompany(idCompany);
      }else {
        this.loadContacts();
      }
    })
  }

  private deleteContactService() {
    this.contactService.getIndexContactDeleted().subscribe((index: number) => {
      this.rows.splice(index, 1);
    });
  }

  private reloadContactService() {
    this.contactService.getReloadContacts().subscribe((reload: boolean) => {
      if (reload) {
        this.loadContacts();
      }
    })
  }

  private loadContactsFromCompany(idCompany: number) {
    this.rows = [];
    this.contactRequestService.getCompanyContact(idCompany).subscribe((contactsResponse: any) => {
      if (contactsResponse.success) {
        contactsResponse.data.forEach(contact => {
          this.rows.push(new Contact(contact.idContact, contact.linkedIn, contact.facebook, contact.googleP,
            contact.website, contact.Company_idCompany, contact.twitter));
        });
      }
    });
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
