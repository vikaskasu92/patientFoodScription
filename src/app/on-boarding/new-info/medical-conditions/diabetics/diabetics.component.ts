import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { OnBoardingService } from 'src/app/on-boarding/on-boarding.service';
import { FoodscriptionCommonService } from 'src/app/sharedFiles/foodscription-common.service';
import { OtherConditionsComponent } from '../other-conditions/other-conditions.component';

@Component({
  selector: 'app-diabetics',
  templateUrl: './diabetics.component.html',
  styleUrls: ['./diabetics.component.scss'],
})
export class DiabeticsComponent implements OnInit {

  constructor(private modelCtrl:ModalController,
              private fsCommon:FoodscriptionCommonService,
              private onBoardingService:OnBoardingService) { }

  ngOnInit() {}

  dismissModel(){
    this.modelCtrl.dismiss();
  }

  otherOptionChanged(){
    this.fsCommon.openModal(OtherConditionsComponent);
  }

  diabeticsChange(event:any,disease:string){
    if(event.detail.checked){
      if(this.onBoardingService.medicalConditions.indexOf(disease) === -1){
        this.onBoardingService.medicalConditions.push(disease);
      }
    }else{
      this.onBoardingService.medicalConditions.splice(this.onBoardingService.medicalConditions.indexOf(disease),1);
    }
  }

}
