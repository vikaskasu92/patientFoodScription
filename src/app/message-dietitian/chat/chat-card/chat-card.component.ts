import { EventEmitter } from '@angular/core';
import { AfterViewInit, Component, Input, OnInit, Output } from '@angular/core';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-chat-card',
  templateUrl: './chat-card.component.html',
  styleUrls: ['./chat-card.component.scss'],
})
export class ChatCardComponent implements OnInit, AfterViewInit {

  constructor(private authService:AuthService) { }

  @Input() conversationMessage:any;
  @Input() isLast:boolean;
  @Output() lastMessageAdded = new EventEmitter<string>()

  ngOnInit() {
    if(this.conversationMessage.author === undefined || this.conversationMessage.author === null){
      this.conversationMessage.fromUser === this.authService.username ? this.conversationMessage.fromMe = true : this.conversationMessage.fromMe = false; 
    }else{
      this.conversationMessage.author === this.authService.username ? this.conversationMessage.fromMe = true : this.conversationMessage.fromMe = false; 
    }
    
  }

  ionViewWillEnter(){
    
  }

  ngAfterViewInit() {
    if (!this.isLast) { return; }
    this.lastMessageAdded.emit(this.conversationMessage.message);
  }

}
