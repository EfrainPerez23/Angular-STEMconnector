import { Component, OnInit } from '@angular/core';
import { InternService } from './service/intern.service';
import { InternRequestService } from '../shared/service/request/intern-request.service';
import { Intern } from './model/intern';

@Component({
  selector: 'app-interns',
  templateUrl: './interns.component.html',
  styleUrls: ['./interns.component.css'],
  providers: [InternService]
})
export class InternsComponent implements OnInit {
  private searchIntern = '';
  private filterPreference = 0;
  private interns: Intern[];

  constructor(private internRequestService: InternRequestService, private internService: InternService) {
    this.getSearchPreferenceService();
  }

  ngOnInit() {
    this.reloadInterns();
    this.getDeleteInternService();
  }

  private reloadInterns() {
    this.interns = [];
    this.internRequestService.getSpeakers().subscribe((interns: any) => {
      if (interns.success) {
        interns.data.forEach(intern => {
          this.interns.push(new Intern(intern.idIntern, intern.name, intern.country, intern.photo,
          intern.flagImage, intern.description, intern.rol, intern.linkedIn));
        });
      }
    });
  }

  private getDeleteInternService() {
    this.internService.getStatusDeleted().subscribe((index: number) => {
      if (index) {
        this.interns.splice(index, 1);
      }
    })
  }

  private getSearchPreferenceService() {
    this.internService.getSearchInternPreference()
    .subscribe((internSearch: {searchIntern: string, filterPreference: number}) => {
      this.filterPreference = internSearch.filterPreference,
      this.searchIntern = internSearch.searchIntern
    });
  }

  public getInterns(): Intern[] {
    return this.interns;
  }

  public getSearchIntern(): string {
    return this.searchIntern;
  }

  public getFilterPreference(): number {
    return this.filterPreference;
  }


}
