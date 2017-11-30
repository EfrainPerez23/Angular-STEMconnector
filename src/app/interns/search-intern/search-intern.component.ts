import { Component, OnInit } from '@angular/core';
import { InternService } from '../service/intern.service';

@Component({
  selector: 'app-search-intern',
  templateUrl: './search-intern.component.html',
  styleUrls: ['./search-intern.component.css']
})
export class SearchInternComponent implements OnInit {

  private searchIntern = '';
  private filterPreference = 0;
  private preference: string[] = ['Name', 'Country', 'Description', 'Rol'];

  constructor(private internService: InternService) { }

  ngOnInit() {
  }

  public valueChange() {
    this.internService.getSearchInternPreference().emit({
      searchIntern: this.searchIntern,
      filterPreference: this.filterPreference
    });
  }

  public setFilterPreference(filterPreference: number) {
    this.filterPreference = filterPreference;
    this.valueChange();
  }

  public getSearchInter(): string {
    return this.searchIntern;
  }

  public getFilterPreference(): number {
    return this.filterPreference;
  }

  public getPreference(): string[] {
    return this.preference;
  }

  public set setSearchIntern(searchIntern: string) {
    this.searchIntern = searchIntern;
  }

}
