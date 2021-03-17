import {  Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { LoadingController } from '@ionic/angular';

import * as Chart from 'chart.js';
import { DataService } from 'src/app/sharedFiles/data.service';
import { FoodscriptionCommonService } from 'src/app/sharedFiles/foodscription-common.service';

@Component({
  selector: 'app-today-card',
  templateUrl: './today-card.component.html',
  styleUrls: ['./today-card.component.scss'],
})
export class TodayCardComponent implements OnInit {

  constructor(private fsCommon:FoodscriptionCommonService,
              private dataservice:DataService,
              private loadingCtrl: LoadingController){}
 

  chart:Chart;
  totalCalories:number;
  totalProtein:number;
  totalCarbs:number;
  totalFat:number;
  noMealsAvailableToday:boolean = false;
  dateNotAvailable:string;
  @ViewChild('breakfast', {static:false}) breakfast:ElementRef;
  @ViewChild('lunch', {static:false}) lunch:ElementRef;
  @ViewChild('snack', {static:false}) snack:ElementRef;
  @ViewChild('dinner', {static:false}) dinner:ElementRef;

    ngOnInit(){
      
    }

    ngAfterViewInit(): void {
      this.getTodaysMeals();
    }

    createTotalDoughnutChart(canvasName:string,carbs:number,protein:number,fat:number):Chart{
        const datasets =  [{ 
            data: [carbs.toFixed(2), protein.toFixed(2), fat.toFixed(2)],
            backgroundColor: ['#A977C0','#FF7760','#FCBE5B'],
            fill: true
        }]
        const labels = ['Carbs','Protein','Fat'];
        return this.fsCommon.generateChart(canvasName,'doughnut',datasets,labels,false,true);
    }

    createTotalPieChart(canvasName:string,breakfast:number,lunch:number,snack:number,dinner:number){
      const datasets =  [{ 
        data: [breakfast.toFixed(2), lunch.toFixed(2), snack.toFixed(2),dinner.toFixed(2)],
        backgroundColor: ['green','blue','purple','red'],
        fill: true
      }]
      const labels = ['Breakfast','Lunch','Snack','Dinner'];
      return this.fsCommon.generateChart(canvasName,'pie',datasets,labels,false,true);
    }

    getTodaysMeals(){
      this.loadingCtrl.create({
        message:'Loading Home...',
        backdropDismiss:false
      }).then( modal => {
        modal.present();
        let todayDate = this.fsCommon.todaysDate(new Date());
        this.dataservice.getMeals(todayDate,todayDate,"8").then( meals => {
          if(meals.results.length > 0){
            this._calculateTotalCalories(meals.results[0].meals);
            modal.dismiss();
          }else{
            this.noMealsAvailableToday = true;
            this.dateNotAvailable = todayDate;
            modal.dismiss();
          }
          
        });
      });
    }

    private _calculateTotalCalories(meals:any){
      let totalCalories = 0;
      let totalProtein = 0;
      let totalCarbs = 0;
      let totalFat = 0;
      let breakFastCalories = 0;
      let lunchCalories = 0;
      let dinnerCalories = 0;
      let snackCalories = 0;
      for(let i=0; i<meals.length; i++){
        for(let j=0; j<meals[i].mealElements.length; j++){
          totalCalories += (+meals[i].mealElements[j].recipe.calories * +meals[i].mealElements[j].userServings);
          totalCarbs += (+meals[i].mealElements[j].recipe.carbs * +meals[i].mealElements[j].userServings);
          totalProtein += (+meals[i].mealElements[j].recipe.protein * +meals[i].mealElements[j].userServings);
          totalFat += (+meals[i].mealElements[j].recipe.fat * +meals[i].mealElements[j].userServings);
          if(meals[i].dishType === "breakfast"){
            breakFastCalories += (+meals[i].mealElements[j].recipe.calories * +meals[i].mealElements[j].userServings);
          }
          if(meals[i].dishType === "lunch"){
            lunchCalories += (+meals[i].mealElements[j].recipe.calories * +meals[i].mealElements[j].userServings);
          }
          if(meals[i].dishType === "dinner"){
            dinnerCalories += (+meals[i].mealElements[j].recipe.calories * +meals[i].mealElements[j].userServings);
          }
          if(meals[i].dishType.toString().includes("snack")){
            snackCalories += (+meals[i].mealElements[j].recipe.calories * +meals[i].mealElements[j].userServings);
          }
        }
      }
      this._updateTodayCard(totalCalories,totalProtein,totalCarbs,totalFat,breakFastCalories,lunchCalories,dinnerCalories,snackCalories);
    }

    private _updateTodayCard(totalCalories:any,totalProtein:any,totalCarbs:any,totalFat:any,breakFastCalories:any,lunchCalories:any,dinnerCalories:any,snackCalories:any){
      this.totalCalories = totalCalories;
      this.totalProtein = totalProtein;
      this.totalCarbs = totalCarbs;
      this.totalFat = totalFat;
      let breakfast = +((breakFastCalories/(breakFastCalories+lunchCalories+dinnerCalories+snackCalories))*100).toFixed(2);
      (breakfast < 5 && breakfast !== 0) ? breakfast = breakfast + 5 : breakfast = breakfast;
      let lunch = +((lunchCalories/(breakFastCalories+lunchCalories+dinnerCalories+snackCalories))*100).toFixed(2);
      (lunch < 5 && lunch !== 0) ? lunch = lunch + 5 : lunch = lunch;
      let snack = +((snackCalories/(breakFastCalories+lunchCalories+dinnerCalories+snackCalories))*100).toFixed(2);
      (snack < 5 && snack !== 0) ? snack = snack + 5 : snack = snack;
      let dinner = +((dinnerCalories/(breakFastCalories+lunchCalories+dinnerCalories+snackCalories))*100).toFixed(2);
      (dinner < 5 && dinner !== 0) ? dinner = dinner + 5 : dinner = dinner;
      this.breakfast.nativeElement.style.width = breakfast+"%";
      this.lunch.nativeElement.style.width  = lunch+"%";
      this.snack.nativeElement.style.width  = snack+"%";
      this.dinner.nativeElement.style.width  = dinner+"%";
     // this.chart = this.createTotalPieChart("blsdGraph",breakFastCalories,lunchCalories,snackCalories,dinnerCalories);
      this.chart = this.createTotalDoughnutChart("donoughtGraph",totalCarbs,totalProtein,totalFat);
    }
}
