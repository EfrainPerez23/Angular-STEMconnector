import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterSpeaker'
})
export class FilterSpeakerPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    return null;
  }

}
