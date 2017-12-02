import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'deleteEventsFilter'
})
export class DeleteEventsFilterPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    return null;
  }

}
