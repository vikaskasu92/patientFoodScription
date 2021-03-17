import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'getDate'
})
export class GetDatePipe implements PipeTransform {

  transform(value: any): any {
    if(value) {
      return value.toDateString().substring(8,10);
    }
  }

}
