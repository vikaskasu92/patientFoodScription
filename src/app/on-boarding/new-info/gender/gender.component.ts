import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { FoodscriptionCommonService } from 'src/app/sharedFiles/foodscription-common.service';
import { OnBoardingService } from '../../on-boarding.service';
import { FemalePregnantComponent } from './female-pregnant/female-pregnant.component';

@Component({
  selector: 'app-gender',
  templateUrl: './gender.component.html',
  styleUrls: ['./gender.component.scss'],
})
export class GenderComponent implements OnInit {

  constructor(private navCtrl:NavController,
              private fsCommon:FoodscriptionCommonService,
              private onBoardingService:OnBoardingService) { }

  disabled:boolean = true;
  maleIconClicked:boolean = false;
  femaleIconClicked:boolean = false;

  ngOnInit() {}

  navigate(){
    this.navCtrl.navigateForward('/on-boarding/new-info/height');
  }  

  iconClicked(iconType:string){
    if(iconType === "male"){
      this.disabled = false;
      this.maleIconClicked = true;
      this.femaleIconClicked = false;
      this.onBoardingService.gender = "male";
    }else{
      this.disabled = true;
      this.fsCommon.openModal(FemalePregnantComponent);
      this.maleIconClicked = false;
      this.femaleIconClicked = true;
      this.onBoardingService.gender = "female";
    }
  }
  
}
