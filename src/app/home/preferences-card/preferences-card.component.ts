import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-preferences-card',
  templateUrl: './preferences-card.component.html',
  styleUrls: ['./preferences-card.component.scss'],
})
export class PreferencesCardComponent implements OnInit {

  constructor(private navCtrl:NavController) { }

  ngOnInit() {}

  navigate(navigateTo:string){
    this.navCtrl.navigateForward('/tabs/home/'+navigateTo);
  }

}
