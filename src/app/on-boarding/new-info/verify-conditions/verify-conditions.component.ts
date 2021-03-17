import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { OnBoardingService } from 'src/app/on-boarding/on-boarding.service';

@Component({
  selector: 'app-verify-conditions',
  templateUrl: './verify-conditions.component.html',
  styleUrls: ['./verify-conditions.component.scss'],
})
export class VerifyConditionsComponent implements OnInit {

  constructor(private onBoardingService:OnBoardingService,
              private navCtrl:NavController) { }

  medicalConditions:string[];

  ngOnInit() {
    this.medicalConditions = this.onBoardingService.medicalConditions;
  }

  navigate(){
    this.navCtrl.navigateForward('/on-boarding/new-info/food-allergies');
  }

  removeMedicalCondition(disease:string){
    if(this.onBoardingService.medicalConditions.indexOf(disease) === -1){
      this.onBoardingService.medicalConditions.push(disease);
    }else{
      this.onBoardingService.medicalConditions.splice(this.onBoardingService.medicalConditions.indexOf(disease),1);
    }
  }

}
