import { Pipe, PipeTransform } from '@angular/core';
import { Activity } from '../model/activity';

@Pipe({
  name: 'activityFilter'
})
export class ActivityFilterPipe implements PipeTransform {

  transform(activities: Activity[], filterString: string, filterPreference: number): Activity[] {
    if (activities.length === 0 || filterString === '') {
      return activities;
    }
    const activitiesFiltered: Activity[] = [];
    switch (filterPreference) {
      case 0:
        for (const activity of activities) {
          if (activity.getName().toLowerCase().includes(filterString.toLowerCase())) {
            activitiesFiltered.push(activity);
          }
        }
          break;
      case 1:
        for (const activity of activities) {
          const stringDate = this.dateFormat(activity.getStartTime().toString());
          if (stringDate.toLowerCase().includes(filterString.toLowerCase())) {
            activitiesFiltered.push(activity);
          }
        }
        break;
      case 2:
        for (const activity of activities) {
          const stringDate = this.dateFormat(activity.getEndTime().toString());
          if (stringDate.toLowerCase().includes(filterString.toLowerCase())) {
            activitiesFiltered.push(activity);
          }
        }
        break;
      case 3:
        for (const activity of activities) {
          if (activity.getLocation().toLowerCase().includes(filterString.toLowerCase())) {
            activitiesFiltered.push(activity);
          }
        }
        break;
      default :
      for (const activity of activities) {
        if (activity.getDescription().toString().toLowerCase().includes(filterString.toLowerCase())) {
          activitiesFiltered.push(activity);
        }
      }
    }
    return activitiesFiltered;
  }
  private dateFormat(date: string): string {
    const splitDate =  date.split('T');
    const newDate = splitDate[0].split('-');
    const newString = newDate[1] + '/' + newDate[2] + '/' + newDate[0] + ' ' + splitDate[1].substr(0, 5);
    return newString
  }

}
