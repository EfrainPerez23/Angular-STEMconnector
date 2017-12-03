import { Pipe, PipeTransform } from '@angular/core';
import { Company } from '../model/company';

@Pipe({
  name: 'companyFilter',
  pure: false
})
export class CompanyFilterPipe implements PipeTransform {

  transform(companies: Company[], filterString: string, filterPreference: number): Company[] {
    if (companies.length === 0 || filterString === '') {
      return companies;
    }

    const companiesFiltered: Company[] = [];

    switch (filterPreference) {
      case 0:
      for (const company of companies) {
        if (company.getName().toLowerCase().includes(filterString.toLowerCase())) {
          companiesFiltered.push(company);
        }
      }
        break;

      case 1:
      for (const company of companies) {
        if (company.getPhone().toLowerCase().includes(filterString.toLowerCase())) {
          companiesFiltered.push(company);
        }
      }
      break;
      default:
      for (const company of companies) {
        if (company.getEmail().toLowerCase().includes(filterString.toLowerCase())) {
          companiesFiltered.push(company);
        }
      }
        break;
    }

    return companiesFiltered;

  }
}
