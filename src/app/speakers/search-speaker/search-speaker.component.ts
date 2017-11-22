import {
  Component,
  OnInit,
  Output,
  EventEmitter,
  SimpleChanges
} from '@angular/core';

@Component({
  selector: 'app-search-speaker',
  templateUrl: './search-speaker.component.html',
  styleUrls: ['./search-speaker.component.css']
})
export class SearchSpeakerComponent implements OnInit {

  private searchSpeaker = '';
  private outputSpeaker = new EventEmitter<string>();
  private filterPreference = 0;
  private preference: string[] = ['Name', 'Title', 'Bio'];

  constructor() { }

  ngOnInit() {
  }

  public valueChange() {
    this.outputSpeaker.emit(this.searchSpeaker);
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

  @Output('searchElement')
  public get getSearchSpeakerFilter(): EventEmitter<string> {
    return this.outputSpeaker;
  }

}
