import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { DataService } from 'src/app/sharedFiles/data.service';
import { OnBoardingService } from '../../on-boarding.service';

@Component({
  selector: 'app-set-goal',
  templateUrl: './set-goal.component.html',
  styleUrls: ['./set-goal.component.scss'],
})
export class SetGoalComponent implements OnInit {

  constructor(private navCtrl:NavController,
              private onBoardingService:OnBoardingService,
              private dataService:DataService) { }

  disabled:boolean = true;
  loseWeightIconClicked:boolean = false;
  keepItIconClicked:boolean = false;
  gainWeightIconClicked:boolean = false;

  ngOnInit() {}

  navigate(){
    this._saveOnboardingPart1Data();
    this.navCtrl.navigateForward('/on-boarding/onboarding-part2');
  } 

  iconClicked(goalType:string){
    this.disabled = false;
    switch(goalType){
      case 'loseWeight':{
        this.loseWeightIconClicked = true;
        this.keepItIconClicked = false;
        this.gainWeightIconClicked = false;
        break;
      }
      case 'keepIt':{
        this.loseWeightIconClicked = false;
        this.keepItIconClicked = true;
        this.gainWeightIconClicked = false;
        break;
      }
      case 'gainWeight':{
        this.loseWeightIconClicked = false;
        this.keepItIconClicked = false;
        this.gainWeightIconClicked = true;
        break;
      }
    }
  }

  private _saveOnboardingPart1Data(){
    this.dataService.saveUserInfo(this._formRequest()).then( savedInfo => {
      console.log(savedInfo);
    });
  }

  private _formRequest(){
    let userInfo:any = {};
    userInfo.gender = this.onBoardingService.gender;
    userInfo.dob = this.onBoardingService.dob;
    userInfo.weight = this.onBoardingService.weight;
    userInfo.height = this.onBoardingService.height;
    userInfo.allergies = this.onBoardingService.allergies;
    userInfo.activityLevel = this.onBoardingService.activityLevel;
    userInfo.conditions = this.onBoardingService.medicalConditions;
    if(this.onBoardingService.isPregnant){
      userInfo.pregnancy = this.onBoardingService.pregnancyTrimester;
    }
    if(this.onBoardingService.isLactating){
      userInfo.lactation = this.onBoardingService.lactationPeriod;
    }
    return userInfo;
  }

}
