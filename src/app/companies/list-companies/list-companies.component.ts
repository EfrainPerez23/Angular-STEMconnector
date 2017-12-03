import { Component, OnInit } from '@angular/core';
import { Company } from '../model/company';
import { CompanyService } from '../service/company.service';
import { CompanyRequestService } from '../../shared/service/request/company-request.service';

@Component({
  selector: 'app-list-companies',
  templateUrl: './list-companies.component.html',
  styleUrls: ['./list-companies.component.css']
})
export class ListCompaniesComponent implements OnInit {
  private headerRow: string[] = ['Name', 'Phone', 'Email' ];
  private rows: Company[] = [];
  private phoneSearched = '';
  private preference = 0;

  constructor(private companyRequestService: CompanyRequestService) { }

  ngOnInit() {
    this.loadCompanies();
  }

  public getRows(): Company[] {
    return this.rows;
  }

  public getPhoneSearched(): string {
    return this.phoneSearched;
  }

  public getPreference(): number {
    return this.preference;
  }

  public getHeaderRow(): string[] {
    return this.headerRow;
  }


  private loadCompanies() {
    this.rows = [];
    this.companyRequestService.getCompanies().subscribe((companyResponse) => {
      if (companyResponse.success) {
        companyResponse.data.forEach(company => {
          this.rows.push(new Company(company.idCompany, company.name, company.phone, company.email));
        });
      }
    });
  }

}
