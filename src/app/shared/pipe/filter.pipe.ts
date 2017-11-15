import { Pipe, PipeTransform } from '@angular/core';
import { EventModel } from 'app/table/model/event.model';

@Pipe({
  name: 'filter',
  pure: false
})
export class FilterPipe implements PipeTransform {

  transform(value: EventModel[], filterString: string, filterPreference: number): any {
    // FILTER BY ALL THE STATUS
    // if (value.length === 0 || filterString === '') {
    //   return value;
    // }
    // const resultArray = [];
    // for (const item of value) {
    //   if (item[propName] === filterString) {
    //       resultArray.push(item);
    //   }
    // }
    // return resultArray;

    // FILTER BY STATUS BUT LIKE
    // if (value.length === 0 || filterString === '') {
    //   return value;
    // }
    // const resultArray = [];
    // for (const item of value) {
    //   if (item.toLowerCase().includes(filterString.toLowerCase())) {
    //       resultArray.push(item);
    //   }
    // }
    // return resultArray;
    if (value.length === 0 || filterString === '') {
      return value;
    }

    const resultArray: EventModel[] = [];
    switch (filterPreference) {
      case 0:
        for (const event of value) {
          if (event.getName().toLowerCase().includes(filterString.toLowerCase())) {
            resultArray.push(event);
          }
        }
          break;
      case 1:
        for (const event of value) {
          if (event.getDescription().toLowerCase().includes(filterString.toLowerCase())) {
            resultArray.push(event);
          }
        }
        break;
      case 2:
        for (const event of value) {
          const stringDate = this.dateFormat(event.getEndDate().toString());
          if (stringDate.toLowerCase().includes(filterString.toLowerCase())) {
            resultArray.push(event);
          }
        }
        break;
      case 3:
        for (const event of value) {
          const stringDate = this.dateFormat(event.getEndDate().toString());
          if (stringDate.toLowerCase().includes(filterString.toLowerCase())) {
            resultArray.push(event);
          }
        }
        break;
      case 4:
        for (const event of value) {
          if (event.getLocation().toLowerCase().includes(filterString.toLowerCase())) {
            resultArray.push(event);
          }
        }
        break;
      default:
      for (const event of value) {
        const status = event.getStatus()  ? 'yes' : 'no';
        console.log(status);
        if (status.toLowerCase().includes(filterString.toLowerCase())) {
          resultArray.push(event);
        }
      }
      break;
  }
    return resultArray;
  }

   private dateFormat(date: string): string {
    const splitDate =  date.split('T');
    const newDate = splitDate[0].split('-');
    const newString = newDate[1] + '/' + newDate[2] + '/' + newDate[0] + ' ' + splitDate[1].substr(0, 5);
    return newString
  }

}
