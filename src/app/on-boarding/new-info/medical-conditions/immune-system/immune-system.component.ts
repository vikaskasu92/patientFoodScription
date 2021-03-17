import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { OnBoardingService } from 'src/app/on-boarding/on-boarding.service';
import { FoodscriptionCommonService } from 'src/app/sharedFiles/foodscription-common.service';
import { OtherConditionsComponent } from '../other-conditions/other-conditions.component';

@Component({
  selector: 'app-immune-system',
  templateUrl: './immune-system.component.html',
  styleUrls: ['./immune-system.component.scss'],
})
export class ImmuneSystemComponent implements OnInit {

  constructor(private modelCtrl:ModalController,
              private onBoardingService:OnBoardingService,
              private fsCommon:FoodscriptionCommonService) { }

  ngOnInit() {}

  immuneSystemChange(event:any,disease:string){
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
