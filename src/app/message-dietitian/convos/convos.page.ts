import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { NavController } from '@ionic/angular';
import { of, Subscription } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AuthService } from 'src/app/auth/auth.service';
import { DataService } from 'src/app/sharedFiles/data.service';
import { FoodscriptionCommonService } from 'src/app/sharedFiles/foodscription-common.service';
import { Md5 } from 'ts-md5';

@Component({
  selector: 'app-convos',
  templateUrl: './convos.page.html',
  styleUrls: ['./convos.page.scss'],
})
export class ConvosPage implements OnInit {

  constructor(private fsCommon:FoodscriptionCommonService,
    private dataService:DataService,
    private authService:AuthService,
    private navCtrl:NavController) { }

  chatForm:FormGroup;
  showNewChatCreate:boolean = false;
  showConversations:boolean = false;
  conversations:any;
  subscription:Subscription;
  currentUser:string;
  unreadConversations = [];

  ngOnInit() {
    this.currentUser = this.authService.userName;
  }

  ionViewDidEnter(){
    this.dataService.inConversationPage = true;
    this.getConvos();
  }

  dismissModel(){
    this.fsCommon.dismissModal();
  }

  getConvos(){
    this.retrieveCoversations();
    this.subscription = this.dataService.myWebSocket.pipe(catchError(val => of(`I caught: ${val}`))).subscribe(data => {
      if(data.Type === "USER_CONVOS_SAVED"){
        this.retrieveCoversations();
      }
      if(data.Type === "RETRIEVE_CONVOS"){
        if(data.response !== null && data.response.length !== 0 && data.response[0].conversationIds.length > 0){
          this.showConversations = true;
          this.conversations = data.response[0].conversationIds;
          this.conversations.forEach(convo => {
            let recipientUser;
            if(convo.fromUser !== this.authService.userName){
              recipientUser = convo.toUser;
            }else{
              recipientUser = convo.fromUser;
            }
            this.dataService.myWebSocket.next({"action":"sendmessage","data":{ "type": "UNREAD_MESSAGE_COUNT", "read": true , "conversationId": convo.conversationId, "recipientUsername": recipientUser}});
          });
        }
      }
      if(data.Type === "UNREAD_MESSAGE_COUNT"){
        const filteredConvos = this.conversations.filter(conversation => conversation.conversationId == JSON.parse(data.response).conversationId);
        JSON.parse(data.response).items.forEach(item => {
          let currentConvo ={
            "conversationId":item.conversationId,
            "transactionId":item.transactionId,
            "timestamp":item.timestamp
          }
          this.unreadConversations.push(currentConvo);
        });
        let unreadCount = 0;
        JSON.parse(data.response).items.forEach(item => {
          if(item.fromUser !== this.authService.userName){
            unreadCount ++;
          }
        })
        filteredConvos[0].unread = unreadCount;
      }
      if(data.Type === "USER_MESSAGE_RECIEVED"){
        this.retrieveCoversations();
      }
    });
  }

  ionViewDidLeave(){
    this.unreadConversations = [];
    this.dataService.inConversationPage = false;
    console.log("in convesation page "+this.dataService.inConversationPage)
    this.subscription.unsubscribe();
  }

  ngOnDestroy() {
    this.dataService.inConversationPage = false;
    console.log("in convesation page "+this.dataService.inConversationPage)
    this.subscription.unsubscribe();
  }

  initiateChat(){
    //create chat
    if(this.chatForm.controls.chatTo.value !== undefined && this.chatForm.controls.chatTo.value !== "" && this.chatForm.controls.chatTo.value !== null){
      let toUser = this.chatForm.controls.chatTo.value;
      let fromUser = this.authService.userName;
      let conversationId = Md5.hashStr(toUser+"*&*"+fromUser);
      this.dataService.myWebSocket.next({"action":"sendmessage","data":{ "type": "USER_CONVOS", "read": false , "fromUser": fromUser, "toUser":toUser, "conversationIds": [{"conversationId":conversationId,"fromUser":fromUser,"toUser":toUser}] }});
      this.chatForm = null;
      this.showNewChatCreate = false;
    }
  }

  retrieveCoversations(){
    let fromUser = this.authService.userName;
    this.dataService.myWebSocket.next({"action":"sendmessage","data":{ "type": "USER_CONVOS", "read": true , "fromUser": fromUser}});
  }

  openAConversation(conversationId:string,fromUser:string,toUser:string){
    const unreadConvos = this.unreadConversations.filter( convo => convo.conversationId === conversationId);
    unreadConvos.forEach(convo => {
      this.dataService.myWebSocket.next( {"action":"sendmessage","data":{ "type": "USER_MESSAGES_STATUS_UPDATE", "read": false , "transactionId":convo.transactionId, "timestamp":convo.timestamp}});
    });
    const filteredConvos = this.conversations.filter(conversation => conversation.conversationId == conversationId);
    filteredConvos[0].unread = 0;
    this.navCtrl.navigateForward("/chat/"+conversationId+"/"+fromUser+"/"+toUser);
  }

  createChat(){
    this.showNewChatCreate = true;
    this.chatForm = new FormGroup({
      'chatTo' : new FormControl(null,[Validators.required])
    });
  }

  cancelCreateChat(event:any){
    event.preventDefault();
    this.chatForm = null;
    this.showNewChatCreate = false;
  }

}
