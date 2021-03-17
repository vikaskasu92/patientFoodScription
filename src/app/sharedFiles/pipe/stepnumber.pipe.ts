import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'stepnumber'
})
export class StepnumberPipe implements PipeTransform {

  transform(stepnumber: any) {
    let stepNumberArray = stepnumber.split(" ");
    return stepNumberArray[1];
  }

}
