import { Component, OnInit } from '@angular/core';
import { RequestService } from 'app/shared/service/request.service';
import { EventModel } from 'app/table/model/event.model';
import { element } from 'protractor';

@Component({
    selector: 'table-cmp',
    moduleId: module.id,
    templateUrl: 'table.component.html'
})
export class TableComponent implements OnInit {
    private headerRow: string[];
    private rows: EventModel[] = [];
    public filteredStatus = '';

    constructor(private requestService: RequestService) {}
    ngOnInit() {
        this.headerRow =  ['Name',  'Description', 'Start Date', 'End Date', 'Location', 'Email' ];
        this.requestService.getEvents().subscribe((events: any) => {
            events.data.forEach(element => {
                // tslint:disable-next-line:max-line-length
                // tslint:disable-next-line:max-line-length
                this.rows.push(new EventModel(element.status, element.name, element.description, element.startDate, element.endDate, element.location, element.email));

            });
        });
        console.log(this.rows);
    }

    public getHeaderRow(): string[] {
        return this.headerRow;
    }

    public getRows(): EventModel[] {
        return this.rows;
    }
}
