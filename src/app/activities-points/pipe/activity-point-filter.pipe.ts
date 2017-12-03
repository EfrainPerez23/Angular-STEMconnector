import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'activityPointFilter'
})
export class ActivityPointFilterPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    return null;
  }

}
