import { Pipe, PipeTransform } from '@angular/core';
import { Intern } from '../model/intern';

@Pipe({
  name: 'internFilter',
  pure: false
})
export class InternFilterPipe implements PipeTransform {

  transform(interns: Intern[], filterString: string, filterPreference: number): Intern[] {
    if (interns.length === 0 || filterString === '') {
      return interns;
    }
    const internsFiltered: Intern[] = [];
    switch (filterPreference) {
      case 0:
        for (const intern of interns) {
          if (intern.getName().toLowerCase().includes(filterString.toLowerCase())) {
            internsFiltered.push(intern);
          }
        }
          break;
      case 1:
        for (const intern of interns) {
          if (intern.getCountry().toLowerCase().includes(filterString.toLowerCase())) {
            internsFiltered.push(intern);
          }
        }
        break;
      case 2:
        for (const intern of interns) {
          if (intern.getDescription().toLowerCase().includes(filterString.toLowerCase())) {
            internsFiltered.push(intern);
          }
        }
        break;
      default:
        for (const intern of interns) {
          if (intern.getRol().toLowerCase().includes(filterString.toLowerCase())) {
            internsFiltered.push(intern);
          }
        }
        break;
    }
    return internsFiltered;
  }

}
