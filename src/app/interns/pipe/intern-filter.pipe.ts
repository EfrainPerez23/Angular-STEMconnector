import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'internFilter'
})
export class InternFilterPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    return null;
  }

}
