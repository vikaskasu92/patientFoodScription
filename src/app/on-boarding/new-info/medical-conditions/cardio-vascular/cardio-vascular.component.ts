import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { OnBoardingService } from 'src/app/on-boarding/on-boarding.service';
import { FoodscriptionCommonService } from 'src/app/sharedFiles/foodscription-common.service';
import { OtherConditionsComponent } from '../other-conditions/other-conditions.component';

@Component({
  selector: 'app-cardio-vascular',
  templateUrl: './cardio-vascular.component.html',
  styleUrls: ['./cardio-vascular.component.scss'],
})
export class CardioVascularComponent implements OnInit {

  constructor(private modelCtrl:ModalController,
              private onBoardingService:OnBoardingService,
              private fsCommon:FoodscriptionCommonService) { }

  ngOnInit() {}

  cardioVascularChange(event:any,disease:string){
    if(event.detail.checked){
      if(this.onBoardingService.medicalConditions.indexOf(disease) === -1){
        this.onBoardingService.medicalConditions.push(disease);
      }
    }else{
      this.onBoardingService.medicalConditions.splice(this.onBoardingService.medicalConditions.indexOf(disease),1);
    }
  }

  otherOptionChanged(event:any){
    if(event.detail.checked){
      this.fsCommon.openModal(OtherConditionsComponent);
    }
  }

  dismissModel(){
    this.modelCtrl.dismiss();
  }

}
