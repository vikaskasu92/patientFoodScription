import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { OnBoardingService } from '../../on-boarding.service';

@Component({
  selector: 'app-height',
  templateUrl: './height.component.html',
  styleUrls: ['./height.component.scss'],
})
export class HeightComponent implements OnInit {

  constructor(private navCtrl:NavController,
              private onBoardinService:OnBoardingService) { }

  disabled:boolean = true;
  imperial:boolean = true;
  metric:boolean = false;
  feetHeight:number;
  inchesHeight:number;
  cmsHeight:number;
  showFeet:boolean = false;
  showInches:boolean = false;
  cmsChange:boolean = false;

  ngOnInit() {}

  navigate(){
    this.navCtrl.navigateForward('/on-boarding/new-info/weight');
  } 

  feetOnChange(event:any){
    this.showFeet = true;
    this.feetHeight = event.detail.value;
    this._checkToEnableNextButton();
  }

  inchesOnChange(event:any){
    this.showInches = true;
    this.inchesHeight = event.detail.value;
    this._checkToEnableNextButton();
  }

  cmsOnChange(event:any){
    this.cmsChange = true;
    this.cmsHeight = event.detail.value;
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
    if((this.showInches && this.showFeet)){
      this.onBoardinService.height = +((12 * this.feetHeight) + this.inchesHeight).toFixed(2);
      this.disabled = false;
    }
    if(this.cmsChange){
      this.onBoardinService.height = +(this.cmsHeight * 0.3937).toFixed(2);
      this.disabled = false;
    }
  }

  private _resetValues(){
    this.disabled = true;
    this.showFeet = false;
    this.showInches = false;
    this.cmsChange = false;
  }
  
}
