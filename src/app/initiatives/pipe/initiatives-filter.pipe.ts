import { Pipe, PipeTransform } from '@angular/core';
import { InitiativeModel } from '../model/initiative.model';

@Pipe({
  name: 'initiativesFilter',
  pure: false
})
export class InitiativesFilterPipe implements PipeTransform {

  transform(initiatives: InitiativeModel[], filterString: string, filterPreference: number): InitiativeModel[] {
    if (initiatives.length === 0 || filterString === '') {
      return initiatives;
    }
    const initiativesFiltered: InitiativeModel[] = [];
    switch (filterPreference) {
      case 0:
        for (const initiative of initiatives) {
          if (initiative.getName().toLowerCase().includes(filterString.toLowerCase())) {
            initiativesFiltered.push(initiative);
          }
        }
          break;
      default:
        for (const speaker of initiatives) {
          if (speaker.getDescription().toLowerCase().includes(filterString.toLowerCase())) {
            initiativesFiltered.push(speaker);
          }
        }
        break;
    }
    return initiativesFiltered;
  }

}
