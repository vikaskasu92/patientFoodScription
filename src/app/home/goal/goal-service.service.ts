import { Injectable } from '@angular/core';
import * as Chart from 'chart.js';
import { FoodscriptionCommonService } from 'src/app/sharedFiles/foodscription-common.service';

@Injectable({
  providedIn: 'root'
})
export class GoalServiceService {

  constructor(private fsCommon:FoodscriptionCommonService) { }

  min:number;
  averageArray:number[] = [];
  average:any;
  max:number;
  labelArray = [];
  weightArray = [];

  weightGraphData(weights:any,calendarType:string){
    let sortedWeights = weights.sort( (a,b) =>{ (a.date > b.date) ? 1 : -1});
    let previousWeightDate = "";
    let averageWeight = [];
    this.labelArray = [];
    this.weightArray = [];
    this.averageArray = [];
    for(let i=0; i<sortedWeights.length; i++){
      if(previousWeightDate === ""){
        previousWeightDate = sortedWeights[0].date;
        averageWeight.push(+sortedWeights[0].weight);
        if(i+1 !== sortedWeights.length){
          if(sortedWeights[i+1].date !== sortedWeights[i].date){
            this.labelArray.push(sortedWeights[i].date);
            this.weightArray.push(averageWeight[0]);
            previousWeightDate = sortedWeights[i+1].date;
            averageWeight = [];
          }
        }else{
          this.labelArray.push(sortedWeights[i].date);
          this.weightArray.push(averageWeight[0]);
        }
      }else{
        if(sortedWeights[i].date === previousWeightDate){
          averageWeight.push(+sortedWeights[i].weight);
          if(i+1 !== sortedWeights.length){
            if(sortedWeights[i+1].date !== sortedWeights[i].date){
              this.labelArray.push(sortedWeights[i].date);
              let totalWeight = 0;
              averageWeight.forEach(weight => {
                totalWeight += weight;
              });
              this.weightArray.push(totalWeight/averageWeight.length);
              previousWeightDate = sortedWeights[i+1].date;
              averageWeight = [];
            }
          }else{
            this.labelArray.push(sortedWeights[i].date);
            this.weightArray.push(averageWeight[0]);
          }
        }
      }
    }
    this.min = Math.min.apply(Math, this.weightArray);
    this.max = Math.max.apply(Math, this.weightArray);
    let totalWeight = 0;
    this.weightArray.forEach( (weight,i) =>{
      if(i=0){
        totalWeight = weight
      }else{
        totalWeight += weight
      }
    });
    this.average = (totalWeight/this.weightArray.length).toFixed(2);
    this.weightArray.forEach(() => {
      this.averageArray.push(+this.average);
    });
    if(calendarType === "week"){
      let tempArray = [];
      this.labelArray.forEach( label => {
        tempArray.push(label.substring(5));
      });
      this.labelArray = tempArray;
    }else if(calendarType === "month"){
      let tempArray = [];
      this.labelArray.forEach( label => {
        tempArray.push(label.substring(5));
      });
      this.labelArray = tempArray;
    }else{
      let tempArray = [];
      this.labelArray.forEach( label => {
        tempArray.push(label.substring(0,7));
      });
      this.labelArray = tempArray;
    }
    this.average = this.averageArray[0];
  }
  
  createWeightPerWeekGraph(canvasName:string){
      const datasets =  [{ 
          data: this.weightArray,
          fill: true,
          borderColor:"#65C878",
          pointHoverBorderColor:"#fff",
          pointRotation:6,
          backgroundColor:"#B5F3E9"
      }]
      const labels = this.labelArray;
      return this._generateChartWithTicks(canvasName,'line',this.weightArray,labels,false,true);
    }
    private _generateChartWithTicks(canvasName:string,chartType:string,dataSets:any,labels:any,legendDisplay:boolean,toolTips:boolean){
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
              data: this.averageArray, 
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
                    display: true,
                },
                ticks: {
                  fontColor: "#CCCCCC",
                  beginAtZero: false,
                  min:Math.round(this.min / 10) * 10 - 10,
                  max:Math.round(this.max / 10) * 10 + 10
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
