import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-search-speaker',
  templateUrl: './search-speaker.component.html',
  styleUrls: ['./search-speaker.component.css']
})
export class SearchSpeakerComponent implements OnInit {

  private searchSpeaker = '';
  private filterPreference = 0;
  private preference: string[] = ['Name', 'Title', 'Bio'];

  constructor() { }

  ngOnInit() {
  }

  public set setSearchSpeaker(searchSpeaker: string) {
    this.searchSpeaker = searchSpeaker;
  }

  public getSearchSpeaker(): string {
    return this.searchSpeaker;
  }

  public setFilterPreference(filterPreference: number) {
    this.filterPreference = filterPreference;
  }

  public getFilterPreference(): number {
    return this.filterPreference;
  }

  public getPreference(): string[] {
    return this.preference;
  }

}
