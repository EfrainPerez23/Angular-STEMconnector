import { Component, OnInit } from '@angular/core';
import { Company } from '../../companies/model/company';
import { Contact } from '../model/contact';
import { CompanyRequestService } from '../../shared/service/request/company-request.service';
import { CompanyService } from '../../companies/service/company.service';
import { ContactService } from '../service/contact.service';

@Component({
  selector: 'app-search-contact',
  templateUrl: './search-contact.component.html',
  styleUrls: ['./search-contact.component.css']
})
export class SearchContactComponent implements OnInit {
  private preference: string[] = ['Website', 'Facebook', 'GoogleP', 'Location', 'LinkedIn', 'Twitter' ];
  private searchContact = '';
  private filterPreference = 0;
  private companies: Company[];
  private companySelected: Company = new Company(-1, 'All Companies', '', '');


  constructor(private companyRequestService: CompanyRequestService, private contactService: ContactService) { }

  ngOnInit() {
    this.loadCompanies();
  }

  private loadCompanies() {
    this.companies = [new Company(-1, 'All Companies', '', '')];
    this.loadCompaniesRequest();
  }

  private loadCompaniesRequest() {
    this.companyRequestService.getCompanies().subscribe((companiesResponse: any) => {
      if (companiesResponse.success) {
        companiesResponse.data.forEach(company => {
          this.companies.push(new Company(company.idCompany, company.name, company.phone, company.email));
        });
      }
    });
  }

  public valueChange() {
    this.contactService.getSearchContactPreference().emit({
      search: this.searchContact,
      preference: this.filterPreference
    });
  }

  public chooseCompany(companySelected: Company) {
    this.companySelected = companySelected;
    this.contactService.getCompanyPreferences().emit(companySelected.getIdCompany());
  }

  public getCompanySelected(): Company {
    return this.companySelected;
  }

  public getFilterPreference(): number {
    return this.filterPreference;
  }

  public getPreference(): string[] {
    return this.preference;
  }

  public setFilteredPreference(filterPreference: number) {
    this.filterPreference = filterPreference;
    this.valueChange();
  }

  public set setSearchCompany(searchContact: string) {
    this.searchContact = searchContact;
  }

  public getCompanies(): Company[] {
    return this.companies;
  }

}
