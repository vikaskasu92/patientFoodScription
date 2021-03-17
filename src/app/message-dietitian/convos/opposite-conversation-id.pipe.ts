import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'oppositeConversationId'
})
export class OppositeConversationIdPipe implements PipeTransform {

  transform(conversation: any, currentUser:string){
    if(conversation.fromUser === currentUser){
      return conversation.toUser;
    }else{
      return conversation.fromUser;
    }
  }

}
