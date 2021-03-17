import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { OnBoardingService } from 'src/app/on-boarding/on-boarding.service';
import { FoodscriptionCommonService } from 'src/app/sharedFiles/foodscription-common.service';
import { FemaleLactatingComponent } from '../female-lactating/female-lactating.component';
import { FemalePregnantDetailsComponent } from '../female-pregnant-details/female-pregnant-details.component';

@Component({
  selector: 'app-female-pregnant',
  templateUrl: './female-pregnant.component.html',
  styleUrls: ['./female-pregnant.component.scss'],
})
export class FemalePregnantComponent implements OnInit {

  constructor(private modelCtrl:ModalController,
              private fsCommon:FoodscriptionCommonService,
              private onBoardingService:OnBoardingService) { }

  ngOnInit() {}

  dismissModel(){
    this.modelCtrl.dismiss();
  }

  pregnent(event:any){
    console.log(event);
    if(event.detail.value === "yes"){
      this.onBoardingService.isPregnant = true;
      this.modelCtrl.dismiss();
      this.fsCommon.openModal(FemalePregnantDetailsComponent);
    }else{
      this.onBoardingService.isPregnant = false;
      this.modelCtrl.dismiss();
      this.fsCommon.openModal(FemaleLactatingComponent);
    }
  }

}
