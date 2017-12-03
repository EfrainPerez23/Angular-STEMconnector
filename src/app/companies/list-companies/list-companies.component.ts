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
  private companySearched = '';
  private preference = 0;

  constructor(private companyRequestService: CompanyRequestService, private companyService: CompanyService) {
    this.getSearchPreference();
  }

  ngOnInit() {
    this.loadCompanies();
  }

  private getSearchPreference() {
    this.companyService.getSearchCompanyPreference().subscribe((searchPreference: {search: string, preference: number}) => {
      this.companySearched = searchPreference.search,
      this.preference = searchPreference.preference
    });
  }

  public getRows(): Company[] {
    return this.rows;
  }

  public getCompanySearched(): string {
    return this.companySearched;
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
