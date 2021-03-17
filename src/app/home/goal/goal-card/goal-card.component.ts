import { Component, OnInit } from '@angular/core';
import * as Chart from 'chart.js';
import { NavController } from '@ionic/angular';

import { GoalServiceService } from '../goal-service.service';
import { DataService } from 'src/app/sharedFiles/data.service';
import { FoodscriptionCommonService } from 'src/app/sharedFiles/foodscription-common.service';

@Component({
  selector: 'app-goal-card',
  templateUrl: './goal-card.component.html',
  styleUrls: ['./goal-card.component.scss'],
})
export class GoalCardComponent implements OnInit {

  constructor(private navCtrl:NavController,
              private dataService:DataService,
              private fsCommon:FoodscriptionCommonService,
              private goalService:GoalServiceService){}

  chart:Chart;
  weekArray:string[] = [];
  weightArray:number[] = [];
  currentGoal:any;
  bmi:number;
  currentWeekArray:Date[];
  weightData = {
    Sun:0,
    Mon:0,
    Tue:0,
    Wed:0,
    Thu:0,
    Fri:0,
    Sat:0
  }
  min:number;
  max:number;
  averageArray:number[] = [];
  average:any;
  noWeightGraph:boolean = true;
  currentWeight:any;

    
  ngOnInit():void{ 
    this.currentWeekArray = this.dataService.generateCurrentWeekArray();
    this.getCurrentWeekWeights();
  }

  getCurrentWeekWeights(){
    this.dataService.getUserWeights('week').subscribe( (userWeights:any) => {
      this.bmi = userWeights.bmi.toFixed(2);
      this.currentGoal = userWeights.currentGoal.toFixed(2);
      userWeights.weights.length > 1 ? this.noWeightGraph = false : this.noWeightGraph = true;
      this.goalService.weightGraphData(userWeights.weights,'week');
      this.average = this.goalService.average;
      this.currentWeight = userWeights.currentWeight;
      this.goalService.createWeightPerWeekGraph("lineWeightGoalCard");
    });
  }
 
  setGoal(){
    this.navCtrl.navigateForward('/home/goal');
  }

}
