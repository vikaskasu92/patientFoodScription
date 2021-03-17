import { Component, OnInit, ElementRef, Renderer2 } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NotFollwedPage } from '../not-follwed/not-follwed.page';
import { MoreInfoComponent } from '../more-info/more-info.component';
import { NewPhotoComponent } from '../new-photo/new-photo.component';
import { FpService } from 'src/app/home/fps.service';
import { DataService } from 'src/app/sharedFiles/data.service';
import { FoodscriptionCommonService } from 'src/app/sharedFiles/foodscription-common.service';

@Component({
  selector: 'app-meal',
  templateUrl: './meal.page.html',
  styleUrls: ['./meal.page.scss'],
})
export class MealPage implements OnInit {

  constructor(private dataService: DataService, 
              private route:ActivatedRoute,
              private fsCommon: FoodscriptionCommonService,
              private render:Renderer2,
              private fpService: FpService,
              private router:Router) { }

  meal:any[];
  dishtype;
  currentDate:string;

  ngOnInit() {
    this.route.paramMap.subscribe( paramsMap => {
      this.currentDate = paramsMap.get("date");
      const meals = this.dataService.infiniteMeals;
      console.log(this.dataService.infiniteMeals);
        for(let i=0; i<meals.length; i++){
          for(let j=0; j<meals[i].length; j++){
            for(let k=0; k<meals[i][j].meals.length; k++){
              if(meals[i][j].meals[k].mealElements.filter(meal => meal.id === +paramsMap.get("mealId")).length !== 0){
                  this.dishtype = meals[i][j].meals[k].dishType;
                  this.meal = [...meals[i][j].meals[k].mealElements.filter(meal => meal.id === +paramsMap.get("mealId"))];
              }
            }
          }  
        }
    });
  }

  followedPlan(followed:string,mealElementId:number,launchFollowed:any){
    if(launchFollowed){
      this._followedMeals(followed,mealElementId,2);
    }else if(launchFollowed === false){
      this._followedMeals(followed,mealElementId,1);
    }else{
      this._followedMeals(followed,mealElementId,3);
    }
  }

  addMealElementIngredientsToCart(mealElement:any){
    this.fsCommon.addMealIngredientsToCart(mealElement);
  }

  rated(rated:string,id:number,ratingValue:any){
    if(ratingValue === 5){
        this._ratedMeals(rated,id,1);
    }else if(ratingValue === 1){
      this._ratedMeals(rated,id,2);
    }else{
      this._ratedMeals(rated,id,3);
    }  
  }

  chevronToggle(chevClicked:string,chevUp:ElementRef,chevDown:ElementRef,directionInfo:ElementRef){
    if(chevClicked === 'up'){
      this.render.setStyle(chevUp,'display','none');
      this.render.setStyle(chevDown,'display','block');
      this.render.setStyle(directionInfo,'display','none');
    }else{
      this.render.setStyle(chevUp,'display','block');
      this.render.setStyle(chevDown,'display','none');
      this.render.setStyle(directionInfo,'display','block');
    }
    
  }

  nutrientsToggle(textShown:string,nutrientsDiv:ElementRef,nutrientsTextEl:ElementRef,hideTextEl:ElementRef,mealElementId:number,currentMealElement:any){
    if(textShown === "nutrients"){
      this.render.setStyle(nutrientsDiv,'display','block');
      this.render.setStyle(nutrientsTextEl,'display','none');
      this.render.setStyle(hideTextEl,'display','block');
      const labels = ['Carbs','Protein','Fat'];
      const datasets =  [{ 
        data: [currentMealElement.recipe.carbs.toFixed(2), currentMealElement.recipe.protein.toFixed(2), currentMealElement.recipe.fat.toFixed(2)],
        backgroundColor: ['#A977C0','#FF7760','#FCBE5B'],
        fill: true
      }];
      this.fsCommon.generateChart("nutritionInfo"+mealElementId,'doughnut',datasets,labels,false,false);
    }else{
      this.render.setStyle(nutrientsDiv,'display','none');
      this.render.setStyle(nutrientsTextEl,'display','block');
      this.render.setStyle(hideTextEl,'display','none');
    }
    
  }

  toggleMealsData(mealElementId:number){
    let mealDataToggle = <HTMLElement>document.querySelector("#toggleMealInfo"+mealElementId);
    let ratingInfoToggle = <HTMLElement>document.querySelector("#ratingInfoToggle"+mealElementId);
    mealDataToggle.style.display === "none" ? mealDataToggle.style.display = "inline-block" : mealDataToggle.style.display = "none";
    ratingInfoToggle.style.display === "none" ? ratingInfoToggle.style.display = "inline-block" : ratingInfoToggle.style.display = "none";
  }

  favoriteMeal(id:number,favorite:boolean){
    this.fpService.updateMealFavorite(id,favorite).then(()=>{
      if(favorite){
        this.fsCommon.generateToast('Added to fav! \n View your fav in Home - Food preferences',1000,'toast-config','bottom');
      }
      this._updateCurrentScreenFavorite(id,favorite);
      this._updateCurrentMealsWithMealFavorites(id,favorite);
    });
  }

  moreInfo(mealElement:any){
    this.fsCommon.generatePopover(MoreInfoComponent,mealElement);
  }

  private _ratedMeals(rated:string,id:number,sequence:number){
    let ratedUpEl = <HTMLElement>document.querySelector("#ratedUp"+sequence+id);
    let ratedDownEl = <HTMLElement>document.querySelector("#ratedDown"+sequence+id);
    if(rated === 'up'){
      ratedUpEl.classList.add("rate-selected");
      ratedUpEl.classList.remove("default-fab");
      ratedDownEl.classList.add("default-fab");
      ratedDownEl.classList.remove("rate-selected");
      this.fpService.updateMealRating(5,id).then(()=>{
        this._updateCurrentMealsWithRating(id,5);
      }).catch(()=>{
        this.router.navigateByUrl("/error/Error Updating Meal Rating/meals");
      });
    }else{
      ratedDownEl.classList.add("rate-selected");
      ratedDownEl.classList.remove("default-fab");
      ratedUpEl.classList.add("default-fab");
      ratedUpEl.classList.remove("rate-selected");
      this.fpService.updateMealRating(1,id).then(()=>{
        this._updateCurrentMealsWithRating(id,1);
      }).catch(()=>{
        this.router.navigateByUrl("/error/Error Updating Meal Rating/meals");
      });
    }
  }

  private _updateCurrentMealsWithRating(recipeId:number,rating:number){
    for(let i=0; i<this.dataService.infiniteMeals[0].length; i++){
      if(this.fsCommon.todaysDateFromString(this.dataService.infiniteMeals[0][i].date).toISOString().substring(0,10) === this.fsCommon.todaysDateFromString(this.currentDate).toISOString().substring(0,10)){
        for(let j=0; j<this.dataService.infiniteMeals[0][i].meals.length; j++){
          for(let k=0; k<this.dataService.infiniteMeals[0][i].meals[j].mealElements.length; k++){
            if(this.dataService.infiniteMeals[0][i].meals[j].mealElements[k].recipe.id === recipeId){
              this.dataService.infiniteMeals[0][i].meals[j].mealElements[k].recipe.rating = rating;
              break;
            }
          }
        }
      }
    }
  }

  private _followedMeals(followed:string,mealElementId:number,launchFollowed:number){
    let followedEl = <HTMLElement>document.querySelector("#followed"+launchFollowed+mealElementId);
    let unfollowedEl = <HTMLElement>document.querySelector("#didNotfollow"+launchFollowed+mealElementId);
    if(followed === 'yes'){
      this.dataService.saveMealsNotFollowed(mealElementId,true,"followed the meal",undefined).then(()=>{
        followedEl.classList.add("followed-selected");
        followedEl.classList.remove("default-fab");
        unfollowedEl.classList.add("default-fab");
        unfollowedEl.classList.remove("followed-selected");
        this._updateCurrentMealsWithFollowed(mealElementId,true);
      }).catch(()=>{
        this.router.navigateByUrl("/error/Error saving Followed meal/meals");
      });
    }else{
      unfollowedEl.classList.add("followed-selected");
      unfollowedEl.classList.remove("default-fab");
      followedEl.classList.add("default-fab");
      followedEl.classList.remove("followed-selected");
      this._updateCurrentMealsWithFollowed(mealElementId,false);
      this.fsCommon.openModalWithProps(NotFollwedPage,{mealImage:document.querySelector("#mealImage"+mealElementId).getAttribute("src"),mealElementId:mealElementId});
    }
  }

  openCamera(mealElementId:number){
    this.fsCommon.openModalWithProps(NewPhotoComponent,{mealElementId:mealElementId});
  }

  private _updateCurrentMealsWithFollowed(mealElementId:number,followed:boolean){
    for(let i=0; i<this.dataService.infiniteMeals[0].length; i++){
      if(this.fsCommon.todaysDateFromString(this.dataService.infiniteMeals[0][i].date).toISOString().substring(0,10) === this.fsCommon.todaysDateFromString(this.currentDate).toISOString().substring(0,10)){
        for(let j=0; j<this.dataService.infiniteMeals[0][i].meals.length; j++){
          for(let k=0; k<this.dataService.infiniteMeals[0][i].meals[j].mealElements.length; k++){
            if(this.dataService.infiniteMeals[0][i].meals[j].mealElements[k].id === mealElementId){
              this.dataService.infiniteMeals[0][i].meals[j].mealElements[k].followed = followed;
              break;
            }
          }
        }
      }
    }
  }


  private _updateCurrentMealsWithMealFavorites(id:number,favorite:boolean){
    let currentMeals = this.dataService.currentMeals;
    for(let i=0; i<currentMeals.length; i++){
      for(let j=0; j<currentMeals[i].meals.length; j++){
        for(let k=0; k<currentMeals[i].meals[j].mealElements.length; k++){
          if(currentMeals[i].meals[j].mealElements[k].recipe.id === id){
            currentMeals[i].meals[j].mealElements[k].recipe.isFavorite = favorite;
          }
          break;
        }
      }
    }
    this.dataService.currentMeals = currentMeals;
  }

  private _updateCurrentScreenFavorite(id:number,favorite:boolean){
    const meals = this.dataService.infiniteMeals;
    for(let i=0; i<meals.length; i++){
      for(let j=0; j<meals[i].length; j++){
        for(let k=0; k<meals[i][j].meals.length; k++){
          for(let l=0; l<meals[i][j].meals[k].mealElements.length; l++){
            if(meals[i][j].meals[k].mealElements[l].recipe.id === id){
              meals[i][j].meals[k].mealElements[l].recipe.isFavorite = favorite;
              this.meal = meals[i][j].meals[k].mealElements[l];
              break;
            }
          }
        }
      }  
    }
    let onLaunchEl = <any>document.querySelector("#onLaunch"+id);
    let notOnLaunchEl = <any>document.querySelector("#notOnLaunch"+id);
    let notOnLaunchFill = <any>document.querySelector("#notOnLaunchFill"+id);
    let notOnLaunchNoFill = <any>document.querySelector("#notOnLaunchNoFill"+id);
    onLaunchEl.style.display = 'none';
    notOnLaunchEl.style.display = 'block';
    if(favorite){
      notOnLaunchFill.style.display = 'block';
      notOnLaunchNoFill.style.display = 'none';
    }else{
      notOnLaunchFill.style.display = 'none';
      notOnLaunchNoFill.style.display = 'block';
    }
  }


  /*shareOnInstagram(index:number){
    window.open("https://www.instagram.com/?url="+document.querySelector("#shareUrl"+index).getAttribute("value"));
  }

  shareOnTwitter(index:number){
    window.open("https://twitter.com/intent/tweet?url="+document.querySelector("#shareUrl"+index).getAttribute("value"));
  }

  shareOnFacebook(index:number){
    window.open("http://www.facebook.com/sharer.php?u="+document.querySelector("#shareUrl"+index).getAttribute("value"));
  }*/

}
