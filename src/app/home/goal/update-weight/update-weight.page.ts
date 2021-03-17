import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/sharedFiles/data.service';
import { FoodscriptionCommonService } from 'src/app/sharedFiles/foodscription-common.service';

@Component({
  selector: 'app-update-weight',
  templateUrl: './update-weight.page.html',
  styleUrls: ['./update-weight.page.scss'],
})
export class UpdateWeightPage implements OnInit {

  constructor(private fsCommon:FoodscriptionCommonService,
              private dataService:DataService) { }

  disabled:boolean = true;
  imperial:boolean = true;
  metric:boolean = false;
  lbsWeight:number;
  kgsWeight:number;
  showLbs:boolean = false;
  showKgs:boolean = false;
  today:string;
  dateSelected:boolean = false;

  ngOnInit() {
    this.today = new Date().toISOString().substring(0,10);
  }

  dateChanged(){
    this.dateSelected = true;
    this._checkToEnableUpdateButton();
  }

  dismissModel(){
   this.fsCommon.dismissModal();
  }

  updateAndClose(){
    let weightData = {};
    if(this.metric){
      weightData = {weight:(this.kgsWeight * 2.20462).toFixed(2)}
    }else{
      weightData = {weight:this.lbsWeight}
    }
    this.dataService.saveUserInfo(weightData).then( () => {
      this.fsCommon.dismissModal();
    });
  }


  lbsOnChange(event:any){
    this.showLbs = true;
    this.lbsWeight = event.detail.value;
    this._checkToEnableUpdateButton();
  }

  kgsOnChange(event:any){
    this.showKgs = true;
    this.kgsWeight = event.detail.value;
    this._checkToEnableUpdateButton();
  }

  imperialClicked(){
    this._imperialMetricChange(true,false);
  }

  metricClicked(){
    this._imperialMetricChange(false,true);
  }

  private _checkToEnableUpdateButton(){
    if((this.showKgs || this.showLbs)){
      this.disabled = false;
    }
  }

  private _resetValues(){
    this.disabled = true;
    this.showLbs = false;
    this.showKgs = false;
  }

  private _imperialMetricChange(imperial:boolean,metric:boolean){
    this.imperial = imperial;
    this.metric = metric;
    this._resetValues();
  }

}
