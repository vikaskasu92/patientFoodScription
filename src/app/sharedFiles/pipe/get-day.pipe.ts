import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'getDay'
})
export class GetDayPipe implements PipeTransform {

  transform(value: any): any {
    if(value) {
      return value.toDateString().substring(0,3);
    }
  }

}
