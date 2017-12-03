import { Component, OnInit } from '@angular/core';
import { Company } from '../model/company';
import { CompanyService } from '../service/company.service';

@Component({
  selector: 'app-search-company',
  templateUrl: './search-company.component.html',
  styleUrls: ['./search-company.component.css']
})
export class SearchCompanyComponent implements OnInit {
  private preferences: string[] = ['Name', 'Phone', 'Email'];
  private filterPreference = 0;
  private searchCompany = '';

  constructor(private companyService: CompanyService) { }

  ngOnInit() {
  }

  public valueChange() {
    this.companyService.getSearchCompanyPreference().emit({
      search: this.searchCompany,
      preference: this.filterPreference
    });
  }

  public set setSearchCompany(searchCompany: string) {
    this.searchCompany = searchCompany;
  }

  public getPreferences(): string[] {
    return this.preferences;
  }

  public getFilterPreference(): number {
    return this.filterPreference;
  }

  public setFilteredPreference(filterPreference: number) {
    this.filterPreference = filterPreference;
    this.valueChange();
  }

}
