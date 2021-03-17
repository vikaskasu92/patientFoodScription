import { Component, OnInit } from '@angular/core';
import { UpdateWeightPage } from './update-weight/update-weight.page';
import { NewGoalPage } from './new-goal/new-goal.page';
import * as Chart from 'chart.js';
import { GoalServiceService } from './goal-service.service';
import { DataService } from 'src/app/sharedFiles/data.service';
import { FoodscriptionCommonService } from 'src/app/sharedFiles/foodscription-common.service';

@Component({
  selector: 'app-goal',
  templateUrl: './goal.page.html',
  styleUrls: ['./goal.page.scss'],
})
export class GoalPage implements OnInit {

  constructor(private fsCommon:FoodscriptionCommonService,
              private dataService:DataService,
              private goalService:GoalServiceService) { }

  chart:Chart;
  bmi:any;
  average:any;
  showWeek:boolean = true;
  showMonth:boolean;
  showAll:boolean;
  currentGoal:any;
  weeklyGainLoss:any;
  hasWeekData:boolean;
  hasWMonthData:boolean;
  hasAllData:boolean;

  ngOnInit():void{
    this.getCurrentWeekWeights();  
  }

  segmentChanged(ev: any) {
   if(ev.detail.value === 'month'){
     this.showMonth = true;
     this.showWeek = false;
     this.showAll = false;
    this.getCurrentMonthWeights();
   }
   if(ev.detail.value === 'week'){
     this.showWeek = true;
     this.showAll = false;
     this.showMonth = false;
    this.getCurrentWeekWeights();
   }
   if(ev.detail.value === 'all'){
     this.showAll = true;
     this.showMonth = false;
     this.showWeek = false;
    this.getAllWeights();
   }
  }

  getCurrentWeekWeights(){
    this.dataService.getUserWeights('week').subscribe( (userWeights:any) => {
      this.bmi = userWeights.bmi.toFixed(2);
      this.currentGoal = userWeights.currentGoal.toFixed(2);
      this.weeklyGainLoss = userWeights.weeklyGainLoss.toFixed(2);
      userWeights.weights.length > 1 ? this.hasWeekData = true : this.hasWeekData = false;
      this.goalService.weightGraphData(userWeights.weights,'week');
      this.average = this.goalService.average;
      this.chart = this.goalService.createWeightPerWeekGraph("lineWeightWeek");
    });
  }

  getCurrentMonthWeights(){
    this.dataService.getUserWeights('month').subscribe( (userWeights:any) => {
      this.bmi = userWeights.bmi.toFixed(2);
      this.currentGoal = userWeights.currentGoal.toFixed(2);
      this.weeklyGainLoss = userWeights.weeklyGainLoss.toFixed(2);
      userWeights.weights.length > 1 ? this.hasWMonthData = true : this.hasWMonthData = false;
      this.goalService.weightGraphData(userWeights.weights,'month');
      this.average = this.goalService.average;
      this.chart = this.goalService.createWeightPerWeekGraph("lineWeightMonth");
    });
  }

  getAllWeights(){
    this.dataService.getUserWeights('all').subscribe( (userWeights:any) => {
      this.bmi = userWeights.bmi.toFixed(2);
      this.currentGoal = userWeights.currentGoal.toFixed(2);
      this.weeklyGainLoss = userWeights.weeklyGainLoss.toFixed(2);
      userWeights.weights.length > 1 ? this.hasAllData = true : this.hasAllData = false;
      this.goalService.weightGraphData(userWeights.weights,'all');
      this.average = this.goalService.average;
      this.chart = this.goalService.createWeightPerWeekGraph("lineWeightAll");
    });
  }

  updateWeight(){
    this.fsCommon.openModal(UpdateWeightPage);
  }

  setNewGoal(){
      this.fsCommon.openModal(NewGoalPage);
  }

  createYearExpenseLineChart(canvasName:string,yearsArray:any,expenseArray:any,averageArray:any){
      const datasets =  [{ 
          data: expenseArray,
          fill: true,
          borderColor:"#65C878",
          pointHoverBorderColor:"#fff",
          pointRotation:6,
          backgroundColor:"#B5F3E9"
      }]
      const labels = yearsArray;
      return this._generateChartWithTicks(canvasName,'line',expenseArray,labels,false,true,averageArray);
    }

    private _generateChartWithTicks(canvasName:string,chartType:string,dataSets:any,labels:any,legendDisplay:boolean,toolTips:boolean,averageArray:any){
      return new Chart(canvasName, {
        data: {
            labels: labels,
            datasets: [{
              data: dataSets,
              fill:false,
              borderColor:"#65C878",
              pointHoverBorderColor:"#fff",
              pointRotation:6,
              pointHitRadius:6,
              backgroundColor:"#B5F3E9",
              type: 'line',
              order: 1
          }, {
              data: averageArray, 
              type: 'line',
              fill:true,
              borderColor:"#65C878",
              pointHoverBorderColor:"#fff",
              pointRotation:6,
              pointHitRadius:6,
              hideInLegendAndTooltip:true,
              backgroundColor:"#B5F3E9",
              order: 2
          }]
          },
          options: {
            responsive: true,
            legend: {
              display: legendDisplay,
              labels: {
                fontColor: '#CCCCCC'
              }
            },
            scales: {
              xAxes: [
                { 
                  gridLines: {
                    display: true,
                },
                  ticks: {
                    fontColor: "#CCCCCC"
                  }
              }],
              yAxes: [
                {
                  gridLines: {
                    display: false,
                },
                ticks: {
                  fontColor: "#FFF",
                  beginAtZero: false,
                  min:108,
                  max: 112
                }
            }]
            },
            tooltips:{
              enabled:toolTips
            },
            title: {
              display: false
            }
          }
      });
    }



}
