import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'timestamp'
})
export class TimestampPipe implements PipeTransform {

  evening:boolean = false;

  transform(timestamp: any): any {
    let date = timestamp.substring(0,10);
    let hour = timestamp.substring(11,13);
    let minute = "";
    if(+hour <= 12){
      hour = hour;
      if(hour != 10 || hour != 11){
        hour = "0"+hour;
      }
      let tempTimestamp;
      if(timestamp.substring(14,16).length === 1){
        tempTimestamp = "0"+timestamp.substring(14,16);
      }else{
        tempTimestamp = timestamp.substring(14,16);
      }
      minute = tempTimestamp+ " Am";
    }else{
      this.evening = true;
      hour = +hour-12;
      if(hour != 10 || hour != 11){
        hour = "0"+hour;
      }
      let tempTimestamp;
      if(timestamp.substring(14,16).length === 1){
        tempTimestamp = "0"+timestamp.substring(14,16);
      }else{
        tempTimestamp = timestamp.substring(14,16);
      }
      minute = tempTimestamp+ " Pm";
    }
    let finalTimestamp = date + " " + hour + ":" + minute;
    console.log(finalTimestamp)
    let localTime;
    if(this.evening){
      localTime = new Date(finalTimestamp.substring(0,16)+":00 PM UTC");
    }else{
      localTime = new Date(finalTimestamp.substring(0,16)+":00 AM UTC");
    }
    console.log(localTime)
    if(localTime.toLocaleTimeString().split(":")[0].length === 1){
      return localTime.toLocaleDateString()+" "+localTime.toLocaleTimeString().substring(0,4)+ " " +localTime.toLocaleTimeString().substring(8,10).toLowerCase();
    }
    return localTime.toLocaleDateString()+" "+localTime.toLocaleTimeString().substring(0,5)+ " " +localTime.toLocaleTimeString().substring(9,12).toLowerCase();
  }

}
