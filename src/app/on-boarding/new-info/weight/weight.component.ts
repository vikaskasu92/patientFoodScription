import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { OnBoardingService } from '../../on-boarding.service';

@Component({
  selector: 'app-weight',
  templateUrl: './weight.component.html',
  styleUrls: ['./weight.component.scss'],
})
export class WeightComponent implements OnInit {

  constructor(private navCtrl:NavController,
              private onBoardingService:OnBoardingService) { }

  disabled:boolean = true;
  imperial:boolean = true;
  metric:boolean = false;
  lbsWeight:number;
  kgsWeight:number;
  showLbs:boolean = false;
  showKgs:boolean = false;

  ngOnInit() {}

  navigate(){
    this.navCtrl.navigateForward('/on-boarding/new-info/dob');
  }  

  lbsOnChange(event:any){
    this.showLbs = true;
    this.lbsWeight = event.detail.value;
    this._checkToEnableNextButton();
  }

  kgsOnChange(event:any){
    this.showKgs = true;
    this.kgsWeight = event.detail.value;
    this._checkToEnableNextButton();
  }

  imperialClicked(){
    this.imperial = true;
    this.metric = false;
    this._resetValues();
  }

  metricClicked(){
    this.imperial = false;
    this.metric = true;
    this._resetValues();
  }

  private _checkToEnableNextButton(){
    if(this.showKgs){
      this.onBoardingService.weight = +(this.kgsWeight * 2.20462).toFixed(2);
      this.disabled = false;
    }
    if(this.showLbs){
      this.onBoardingService.weight = this.lbsWeight;
      this.disabled = false;
    }
  }

  private _resetValues(){
    this.disabled = true;
    this.showLbs = false;
    this.showKgs = false;
  }

}
