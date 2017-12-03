import { Pipe, PipeTransform } from '@angular/core';
import { ActivityPoint } from '../model/activity-point';

@Pipe({
  name: 'activityPointFilter'
})
export class ActivityPointFilterPipe implements PipeTransform {

  transform(activityPoints: ActivityPoint[], filterString: string, filterPreference: number): ActivityPoint[] {
    if (activityPoints.length === 0 || filterString === '') {
      return activityPoints;
    }

    const eventPhonesFiltered: ActivityPoint[] = [];

    for (const activityPoint of activityPoints) {
      if (activityPoint.getDescription().toLowerCase().includes(filterString.toLowerCase())) {
        eventPhonesFiltered.push(activityPoint);
      }
    }

    return eventPhonesFiltered;

}
}
