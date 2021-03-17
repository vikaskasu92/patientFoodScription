import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'nullCheck'
})
export class NullCheckPipe implements PipeTransform {

  transform(value: any): any {
    value === null ?  value = "--" : value;
    return value;
  }

}
