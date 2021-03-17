import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'roundNumber'
})
export class RoundNumberPipe implements PipeTransform {

  transform(value: number,unit:any): any {
    if(Math.round(value*2)/2 === 0){
      if(unit === "oz" || unit === "g" || unit ==="fl oz" || unit === "ml"){
        return value.toFixed(2).toString();
      }
      return 0;
    }
    return Math.round(value*2)/2;
  }

}
