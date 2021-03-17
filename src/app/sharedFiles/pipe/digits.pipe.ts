import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'digits'
})
export class DigitsPipe implements PipeTransform {

  transform(value: number, digits:number): number {
    if(typeof value === 'number'){
      return parseFloat(value.toFixed(digits));
    }else{

    }
    return value;
  }

}
