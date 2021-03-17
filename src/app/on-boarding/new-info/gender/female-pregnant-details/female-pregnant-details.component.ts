import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { OnBoardingService } from 'src/app/on-boarding/on-boarding.service';
import { FoodscriptionCommonService } from 'src/app/sharedFiles/foodscription-common.service';
import { FemaleLactatingComponent } from '../female-lactating/female-lactating.component';

@Component({
  selector: 'app-female-pregnant-details',
  templateUrl: './female-pregnant-details.component.html',
  styleUrls: ['./female-pregnant-details.component.scss'],
})
export class FemalePregnantDetailsComponent implements OnInit {

  constructor(private modelCtrl:ModalController,
    private fsCommon:FoodscriptionCommonService,
    private onBoardingService:OnBoardingService) { }

    disabled:boolean = true;

  ngOnInit() {}

  pregnantStateChange(event:any){
    this.onBoardingService.pregnancyTrimester = event.detail.value;
    this.disabled = false;
   }

   dismissModel(){
    this.modelCtrl.dismiss();
  }

  navigate(){
    this.dismissModel();
    this.fsCommon.openModal(FemaleLactatingComponent);
  } 

}
