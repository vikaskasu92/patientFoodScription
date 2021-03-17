import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';

import { Health } from '@ionic-native/health/ngx';
import { OnBoardingService } from '../../on-boarding.service';

@Component({
  selector: 'app-routine',
  templateUrl: './routine.component.html',
  styleUrls: ['./routine.component.scss'],
})
export class RoutineComponent implements OnInit {

  constructor(private navCtrl:NavController,
                private health: Health,
                private onBoardingService:OnBoardingService) { }

  disabled:boolean = true;
  sedentaryIconClicked:boolean = false;
  lightIconClicked:boolean = false;
  moderateIconClicked:boolean = false;
  activeIconClicked:boolean = false;
  extraHardIconClicked:boolean = false;
  stepsArray:any[]= [];
  averageSteps:string;
  checkBoxCheked:boolean = false;
  onComputer:boolean = true;

  ngOnInit() {}

  ionViewWillEnter(){
    this._contactHealthApp();
  }

  navigate(){
    this.navCtrl.navigateForward('/on-boarding/new-info/set-goal');
  }

  iconClicked(routine:string){
    this.disabled = false;
    this.onBoardingService.activityLevel = routine;
    switch(routine){
      case 'Sedentary':{
        this.sedentaryIconClicked = true;
        this.lightIconClicked = false;
        this.moderateIconClicked = false;
        this.activeIconClicked = false;
        this.extraHardIconClicked = false;
        break;
      }
      case 'Low active':{
        this.sedentaryIconClicked = false;
        this.lightIconClicked = true;
        this.moderateIconClicked = false;
        this.activeIconClicked = false;
        this.extraHardIconClicked = false;
        break;
      }
      case 'Active':{
        this.sedentaryIconClicked = false;
        this.lightIconClicked = false;
        this.moderateIconClicked = true;
        this.activeIconClicked = false;
        this.extraHardIconClicked = false;
        break;
      }
      case 'Very active':{
        this.sedentaryIconClicked = false;
        this.lightIconClicked = false;
        this.moderateIconClicked = false;
        this.activeIconClicked = true;
        this.extraHardIconClicked = false;
        break;
      }
      case 'Extra active':{
        this.sedentaryIconClicked = false;
        this.lightIconClicked = false;
        this.moderateIconClicked = false;
        this.activeIconClicked = false;
        this.extraHardIconClicked = true;
        break;
      }
    }

  }

  checkBoxAltered(){
    this.checkBoxCheked = !this.checkBoxCheked;
    if(this.checkBoxCheked){
      this._contactHealthApp();
    }
  }

  private _contactHealthApp(){
    this.health.isAvailable().then(() => {
      this.onComputer = false;
      this.health.requestAuthorization([ //'distance', 'nutrition',  //read and write permissions
      {
        read: ['steps','height','weight'], //read only permission
        // write: ['height', 'weight']  //write only permission
      }
      ]).then(res => 
        this.health.queryAggregated({
          startDate: new Date(new Date().getTime() - 6 * 24 * 60 * 60 * 1000), // seven days
          endDate: new Date(), // now
          dataType: 'steps',
          bucket: 'day'
        }).then(res => {
            this.stepsArray = Object.values(res);
            var total = 0;
            for(var i = 0; i < this.stepsArray.length; i++) {
                total += this.stepsArray[i]["value"];
            }
            this.averageSteps = (total / this.stepsArray.length).toFixed(2);
            if(+this.averageSteps <1000){
              this.iconClicked('Sedentary');
            }else if(+this.averageSteps <4000){
              this.iconClicked('Low active');
            }else if(+this.averageSteps <6000){
              this.iconClicked('Active');
            }else if(+this.averageSteps <10000){
              this.iconClicked('Very active');
            }else if(+this.averageSteps >=10000){
              this.iconClicked('Extra active');
            }
        }).catch (e =>{
          console.log(e);
        })
        ).catch(e => console.log(e));
    }).catch(e => console.log(e));
  }

}
