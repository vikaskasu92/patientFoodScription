import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-eating-pattern',
  templateUrl: './eating-pattern.page.html',
  styleUrls: ['./eating-pattern.page.scss'],
})
export class EatingPatternPage implements OnInit {

  constructor(private navCtrl:NavController) { }

  generalClicked:boolean = false;
  mediterraneanClicked:boolean = false;
  vegetarianClicked:boolean = false;

  ngOnInit() {
  }

  navigate(){
    this.navCtrl.navigateBack('/home');
  }

  cardClicked(cardType:string){
    switch(cardType){
      case 'general'  :{
        this._eatingPatternSelection(true,false,false);
        break;
      }
      case 'mediterranean' :{
        this._eatingPatternSelection(false,true,false);
        break;
      }
      case 'vegetarian' :{
        this._eatingPatternSelection(false,false,true);
        break;
      }
    }
  }

  private _eatingPatternSelection(general:boolean,mediterranean:boolean,vegetarian:boolean){
    this.generalClicked = general;
    this.mediterraneanClicked = mediterranean;
    this.vegetarianClicked = vegetarian;
  }

}
