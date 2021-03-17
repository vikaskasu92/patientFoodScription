import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { FoodscriptionCommonService } from 'src/app/sharedFiles/foodscription-common.service';
import { OnBoardingService } from '../../on-boarding.service';
import { CardioVascularComponent } from './cardio-vascular/cardio-vascular.component';
import { DiabeticsComponent } from './diabetics/diabetics.component';
import { GastroIntestinalComponent } from './gastro-intestinal/gastro-intestinal.component';
import { ImmuneSystemComponent } from './immune-system/immune-system.component';
import { OtherConditionsComponent } from './other-conditions/other-conditions.component';

@Component({
  selector: 'app-medical-conditions',
  templateUrl: './medical-conditions.component.html',
  styleUrls: ['./medical-conditions.component.scss'],
})
export class MedicalConditionsComponent implements OnInit {

  constructor(private navCtrl:NavController,
            private fsCommon:FoodscriptionCommonService,
            private onBoardingService:OnBoardingService) { }

  ngOnInit() {}

  navigate(){
    this.navCtrl.navigateForward('/on-boarding/new-info/verify-conditions');
  } 

  diabeticsOptionChanged(event:any){
    if(event.detail.checked){
        this.fsCommon.openModal(DiabeticsComponent);
    }
  }

  otherOptionChanged(event:any){
    if(event.detail.checked){
      this.fsCommon.openModal(OtherConditionsComponent);
    }
  }

  cardioVascularChange(event:any){
    if(event.detail.checked){
      this.fsCommon.openModal(CardioVascularComponent);
    }
  }

  gastroIntestinalChange(event:any){
    if(event.detail.checked){
      this.fsCommon.openModal(GastroIntestinalComponent);
    }
  }

  immuneSystemChange(event:any){
    if(event.detail.checked){
      this.fsCommon.openModal(ImmuneSystemComponent);
    }
  }

  metabolicSyndromeChange(event:any,disease:any){
    if(event.detail.checked){
      if(this.onBoardingService.medicalConditions.indexOf(disease) === -1){
        this.onBoardingService.medicalConditions.push(disease);
      }
    }else{
      this.onBoardingService.medicalConditions.splice(this.onBoardingService.medicalConditions.indexOf(disease),1);
    }
  }

}
