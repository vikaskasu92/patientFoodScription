import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'getDayDate'
})
export class GetDayDatePipe implements PipeTransform {

  transform(value:string): string {
    let month = value.substring(5,7);
    let day = value.substring(8,11);
    let year = value.substring(0,4);
    return year + "-" + month + "-" + day;
  }

}
