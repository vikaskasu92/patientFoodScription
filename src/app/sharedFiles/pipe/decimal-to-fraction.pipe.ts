import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'decimalToFraction'
})
export class DecimalToFractionPipe implements PipeTransform {

  transform(value: number,unit:string ): string {
    if(unit === "oz" || unit === "g" || unit ==="fl oz" || unit === "ml"){
      return value.toFixed(2).toString();
    }
    let decimal = value + "";
    let decimalArray = decimal.split(".");
    if(decimalArray.length >1 ){
      let leftDecimalPart = decimalArray[0];
      let rightDecimalPart = decimalArray[1];
      let numerator:any = leftDecimalPart + rightDecimalPart
      let denominator = Math.pow(10,rightDecimalPart.length);
      let factor = this._highestCommonFactor(+numerator, denominator);
      denominator /= factor;
      numerator /= factor;
      if(denominator === 1){
        return numerator;
      }else{
        if(numerator === 33 && denominator === 100){
          return "1/3";
        }else if(numerator === 33 && denominator === 50){
          return "2/3";
        }
        return numerator + "/" + denominator;
      }
    }
    return value.toString();
  }

  private _highestCommonFactor(a:number,b:number){
    if (b == 0) return a;
    return this._highestCommonFactor(b,a%b);
  }

}
