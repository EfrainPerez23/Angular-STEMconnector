import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'dateFormat'
})
export class DateFormatPipe implements PipeTransform {

  transform(date: string): any {
    const splitDate =  date.split('T');
    const newDate = splitDate[0].split('-');
    const newString = newDate[1] + '/' + newDate[2] + '/' + newDate[0] + ' ' + splitDate[1].substr(0, 5);
    return newString
  }

}
