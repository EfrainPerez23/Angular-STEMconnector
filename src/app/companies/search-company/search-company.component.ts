import { Component, OnInit } from '@angular/core';
import { Company } from '../model/company';

@Component({
  selector: 'app-search-company',
  templateUrl: './search-company.component.html',
  styleUrls: ['./search-company.component.css']
})
export class SearchCompanyComponent implements OnInit {
  private preferences: string[] = ['Name', 'Phone', 'Email'];
  private filterPreference = 0;
  private searchCompany = '';

  constructor() { }

  ngOnInit() {
  }

  public valueChange() {
    console.log(this.searchCompany, this.filterPreference);
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
