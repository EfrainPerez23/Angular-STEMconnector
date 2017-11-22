import {
  Component,
  OnInit,
  Output,
  OnChanges,
  EventEmitter,
  SimpleChanges
} from '@angular/core';


@Component({
  selector: 'app-search-speaker',
  templateUrl: './search-speaker.component.html',
  styleUrls: ['./search-speaker.component.css']
})
export class SearchSpeakerComponent implements OnInit, OnChanges {

  private searchSpeaker = '';
  private outputSpeaker = new EventEmitter<string>();
  private outputPreference = new EventEmitter<number>();
  private filterPreference = 0;
  private preference: string[] = ['Name', 'Title', 'Bio'];

  constructor() { }

  ngOnInit() {
  }

  ngOnChanges(changes: SimpleChanges) {
    console.log(changes);
  }

  public bb(event) {
    console.log(event);
  }

  public valueChange() {
    this.outputSpeaker.emit(this.searchSpeaker);
    this.outputPreference.emit(this.filterPreference);
  }

  public set setSearchSpeaker(searchSpeaker: string) {
    this.searchSpeaker = searchSpeaker;
  }

  public getSearchSpeaker(): string {
    return this.searchSpeaker;
  }

  public setFilterPreference(filterPreference: number) {
    this.filterPreference = filterPreference;
    this.valueChange();
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

  @Output('preferenceElement')
  public get getOutputPreference(): EventEmitter<number> {
    return this.outputPreference;
  }

}
