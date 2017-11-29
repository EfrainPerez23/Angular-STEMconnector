import { Component, OnInit } from '@angular/core';
import { InitiativeModel } from '../model/initiative.model';
import { InitiativeService } from '../service/initiative.service';

@Component({
  selector: 'app-search-initiative',
  templateUrl: './search-initiative.component.html',
  styleUrls: ['./search-initiative.component.css']
})
export class SearchInitiativeComponent implements OnInit {

  private preference: string[] = ['Name', 'Description'];
  private filterPreference = 0;
  private searchInitiative = ''

  constructor(private initiativeService: InitiativeService) { }

  ngOnInit() {
  }

  public valueChange() {
    this.initiativeService.getSearchInitiativePreference().emit({
      initiativeName: this.searchInitiative,
      preference: this.filterPreference
    });
  }

  public getFilterPreference(): number {
    return this.filterPreference;
  }

  public setFilterPreference(filterPreference: number) {
    this.filterPreference = filterPreference;
    this.valueChange();
  }

  public getPreference(): string[] {
    return this.preference;
  }

  public getSearchInitiative(): string {
    return this.searchInitiative;
  }

  public set setSearchInitiative(searchInitiative: string) {
    this.searchInitiative = searchInitiative;
  }

}
