import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.scss'],
})
export class WelcomeComponent implements OnInit {

  constructor(private navCtrl:NavController) { }

  ngOnInit() {}

  navigate(){
    this.navCtrl.navigateForward('/home');
  }

}
