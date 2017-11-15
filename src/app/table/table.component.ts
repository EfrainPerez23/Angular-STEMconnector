import { Component, OnInit } from '@angular/core';
import { RequestService } from 'app/shared/service/request.service';
import { EventModel } from 'app/table/model/event.model';
import { element } from 'protractor';
import { InitiativeModel } from '../shared/model/initiative.model';

@Component({
    selector: 'table-cmp',
    moduleId: module.id,
    templateUrl: 'table.component.html'
})
export class TableComponent implements OnInit {
    private headerRow: string[];
    private rows: EventModel[] = [];
    public filteredStatus = '';
    public filterPreference = 0;
    public filter = 'Filter by';
    public filterInitiative = 'Initiatives';
    private initiatives: InitiativeModel[] = [];

    constructor(private requestService: RequestService) {}
    ngOnInit() {
        this.headerRow =  ['Name',  'Description', 'Start Date', 'End Date', 'Location', 'Active' ];
        this.requestService.getEvents().subscribe((events: any) => {
            events.data.forEach(element => {
                // tslint:disable-next-line:max-line-length
                // tslint:disable-next-line:max-line-length
                this.rows.push(new EventModel(element.status, element.name, element.description, element.startDate, element.endDate, element.location, element.email));

            });
        });

        this.requestService.getInitiatives().subscribe( (initiatives: any) => {
            initiatives.data.forEach(element => {
                this.initiatives.push(new InitiativeModel(element.idInitiative, element.name, element.description, element.imageUrl));
            });
        })
    }

    public setInitiative(n: number) {
        console.log(n);
    }

    public getHeaderRow(): string[] {
        return this.headerRow;
    }

    public getRows(): EventModel[] {
        return this.rows;
    }

    public getInitiatives(): InitiativeModel[] {
        return this.initiatives;
    }

    public setFilteredPreference(filterPreference: number) {
        switch (filterPreference) {
            case 0:
                this.filter = 'Name';
                break;
            case 1:
                this.filter = 'Description';
                break;
            case 2:
                this.filter = 'Start Date';
                break;
            case 3:
                this.filter = 'End Date';
                break;
            case 4:
                this.filter = 'Location';
                break;
            default:
                this.filter = 'Status';
                break;
        }

        this.filterPreference = filterPreference;
    }
}
