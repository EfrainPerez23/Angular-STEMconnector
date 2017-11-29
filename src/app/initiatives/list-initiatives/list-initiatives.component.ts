import { Component, OnInit } from '@angular/core';
import { InitiativeModel } from '../model/initiative.model';
import { InitiativeService } from '../service/initiative.service';
import { InitiativeRequestService } from '../../shared/service/request/initiative-request.service';

@Component({
  selector: 'app-list-initiatives',
  templateUrl: './list-initiatives.component.html',
  styleUrls: ['./list-initiatives.component.css']
})
export class ListInitiativesComponent implements OnInit {
  private headerRow: string[] = ['Name', 'Image', 'Description' ];
  public rows: InitiativeModel[];
  private initiativeName = '';
  public preference = 0;

  constructor(private initiativeService: InitiativeService, private initiativeRequestService: InitiativeRequestService) {
    this.getFilterPreference();
    this.deleteInitiativeService();
    this.addOrUpdateReload();
  }

  ngOnInit() {
    this.reloadInitiativesRows();
  }


  private getFilterPreference() {
    this.initiativeService.getSearchInitiativePreference()
    .subscribe((activityPreference: {initiativeName: string, preference: number}) => {
      this.initiativeName = activityPreference.initiativeName;
      this.preference = activityPreference.preference;
    });
  }

  private addOrUpdateReload() {
    this.initiativeService.getInitiativeReload().subscribe((reload: boolean) => {
      if (reload) {
        this.reloadInitiativesRows();
      }
    });
  }

  private deleteInitiativeService() {
    this.initiativeService.getInitiativeDeletedIndex().subscribe((index: number) => {
      this.rows.splice(index, 1);
    });
  }

  private reloadInitiativesRows() {
    this.rows = [];
    this.getInitiativesFromRequest()
  }

  private getInitiativesFromRequest() {
    this.initiativeRequestService.getInitiatives().subscribe((initiatives: any) => {
      if (initiatives.success) {
        initiatives.data.forEach(initiative => {
          this.rows.push(new InitiativeModel(initiative.idInitiative, initiative.name, initiative.description, initiative.imageUrl));
        });
      }
    });
  }

  public getHeaderRow(): string[] {
    return this.headerRow;
  }

  public getInitiativeName(): string {
    return this.initiativeName;
  }

  public getPreference(): number {
    return this.preference;
  }

  public getRows(): InitiativeModel[] {
    return this.rows;
  }

}
