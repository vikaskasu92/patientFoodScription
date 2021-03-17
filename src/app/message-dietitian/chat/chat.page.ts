import { AfterViewChecked, AfterViewInit, Component, ElementRef, OnInit, Renderer2, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { of, Subscription } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AuthService } from 'src/app/auth/auth.service';
import { PushNotificationService } from 'src/app/push-notification.service';
import { DataService } from 'src/app/sharedFiles/data.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.page.html',
  styleUrls: ['./chat.page.scss'],
})
export class ChatPage implements OnInit {

  constructor(private dataService:DataService,
              private route:ActivatedRoute,
              private authService:AuthService,
              private pushNotificationService:PushNotificationService) { }

  messageForm:FormGroup;
  conversationId:string;
  conversationMessages:any[] = [];
  subscription:Subscription;
  fromUser:string;
  toUser:string;

  ngOnInit() {
    this.messageForm = new FormGroup({
      'currentMessage' : new FormControl(null)
    });
  } 

  ionViewDidEnter(){
    this.dataService.inChatPage= true;
    this.subscription = this.dataService.myWebSocket.pipe(catchError(val => of(`I caught: ${val}`))).subscribe(data => {
      if(data.Type === "RETRIEVE_USER_MESSAGES"){
        console.log("all messages recieved "+data.response);
        this.conversationMessages  = data.response;
      }
      if(data.Type === "USER_MESSAGE_RECIEVED"){
        if(this.conversationId !== data.response.conversationId){
          this.dataService.myWebSocket.next( {"action":"sendmessage","data":{ "type": "USER_MESSAGES", "read": true , "sendTo": this.authService.username, "onlyPush": true }});
        }
        this.conversationMessages.push(data.response);
        this.updateMessageRead(data.response);
      }
    });
    this.route.paramMap.subscribe( paramsMap => {
      this.conversationId = paramsMap.get("conversationId");
      this.fromUser = this.authService.username;
      if(paramsMap.get("fromUser") === this.fromUser){
        this.toUser =  paramsMap.get("toUser");
      }else{
        this.toUser =  paramsMap.get("fromUser");
      }
      this.retrieveConversation();
    });
    
  }

  textAreaFocus(){
    console.log("keyboard in focus now");
  }

  enterPressed(event:any){
    if(event.keyCode === 13){
      this.sendMessage(event);
    }
  }

  ionViewDidLeave(){
    this.dataService.inChatPage= false;
    this.subscription.unsubscribe();
  }

  ngOnDestroy() {
    this.dataService.inChatPage= false;
    this.subscription.unsubscribe();
  }

  lastMessageAdded(message:any){
    this.scrollToBottom(message);
  }

  updateMessageRead(conversation:any){
    this.dataService.myWebSocket.next( {"action":"sendmessage","data":{ "type": "USER_MESSAGE_STATUS_UPDATE", "read": false , "transactionId": conversation.transactionId, "conversationId":conversation.conversationId, "timestamp":conversation.timestamp }});
  }

  scrollToBottom(message:string): void {
    try {
      setTimeout(()=>{
        let msgContainer = <any>document.querySelector("#msgContainer");
        msgContainer.scrollToBottom();
      },100);
    } catch (err) { }
  }

  retrieveConversation(){
    this.dataService.myWebSocket.next( {"action":"sendmessage","data":{ "type": "USER_MESSAGES", "read": true , "conversationId": this.conversationId, "firstCall": true }});
  }

  sendMessage(event:any){
    let textarea = <HTMLElement>document.querySelector("#messageInput");
    textarea.click();
    event.preventDefault();
    this.scrollToBottom(null);
    let message = this.messageForm.controls.currentMessage.value;
    if(message !== "" && message !== null){
      let transactionId = 0;
      for(let i=0; i<19; ++i) transactionId += Math.floor(Math.random() * 100000000000000);
      let currentdate = new Date(); 
      let date = currentdate.getUTCDate().toString().length == 2 ? currentdate.getUTCDate(): "0"+currentdate.getUTCDate();
      let month = (currentdate.getUTCMonth()+1).toString().length == 2 ? (currentdate.getUTCMonth()+1): "0"+(currentdate.getUTCMonth()+1);
      let hour = currentdate.getUTCHours().toString().length == 2 ? currentdate.getUTCHours(): "0"+currentdate.getUTCHours();
      let minute = currentdate.getUTCMinutes().toString().length == 2 ? currentdate.getUTCMinutes(): "0"+currentdate.getUTCMinutes();
      let second = currentdate.getUTCSeconds().toString().length == 2 ? currentdate.getUTCSeconds(): "0"+currentdate.getUTCSeconds();
      let datetime = month + "/" +  date + "/"  + currentdate.getUTCFullYear() + ":"   + hour + ":"   + minute + ":"  + second + ":" + currentdate.getUTCMilliseconds();
      let newMessageObject = {
        "message":message,
        "conversationId":this.conversationId,
        "author": this.fromUser,
        "timestamp":datetime,
        "transactionId":transactionId,
        "sendTo":this.toUser,
        "uniqueDeviceId":this.pushNotificationService.uniqueDeviceId
      }
      this.conversationMessages.push(newMessageObject);
      this.dataService.myWebSocket.next({"action":"sendmessage","data":{ "type": "USER_MESSAGES", "read": false , "author": this.fromUser, "sendTo":this.toUser, "conversationId": this.conversationId, "transactionId":transactionId,"message":message,"timestamp":datetime,"messageStatus":"unread","uniqueDeviceId":this.pushNotificationService.uniqueDeviceId }});
      this.messageForm.controls.currentMessage.setValue("");
    }
  }

}
