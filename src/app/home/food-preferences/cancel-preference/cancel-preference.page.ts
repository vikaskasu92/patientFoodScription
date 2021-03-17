import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-cancel-preference',
  templateUrl: './cancel-preference.page.html',
  styleUrls: ['./cancel-preference.page.scss'],
})
export class CancelPreferencePage implements OnInit {

  constructor(private navCtrl:NavController) { }

  ngOnInit() {
  }

  navigate(){
    this.navCtrl.navigateBack('/home/food-preferences');
  }

  quitQuiz(event:any){
    event.preventDefault();
    this.navCtrl.navigateBack('/home');
  }

}
