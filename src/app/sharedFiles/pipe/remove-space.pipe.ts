import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'removeSpace'
})
export class RemoveSpacePipe implements PipeTransform {

  transform(value: any): unknown {
    let spacesRemoved = value.replaceAll(" ","");
    let forwardSlashesRemoved = spacesRemoved.replaceAll("/","");
    let bracketOpenRemoved = forwardSlashesRemoved.replaceAll("(","");
    let bracketCloseRemoved = bracketOpenRemoved.replaceAll(")","");
    return bracketCloseRemoved;
  }

}
