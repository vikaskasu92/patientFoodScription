import { Component, OnInit } from '@angular/core';
import { NavParams } from '@ionic/angular';

@Component({
  selector: 'app-more-info',
  templateUrl: './more-info.component.html',
  styleUrls: ['./more-info.component.scss'],
})
export class MoreInfoComponent implements OnInit {

  constructor(private navParams:NavParams) { }

  mealElement:any;

  ngOnInit() {
    this._constructPopOver();
  }

  private _constructPopOver(){
    this.mealElement = this.navParams.get('recipe');
  }

}
