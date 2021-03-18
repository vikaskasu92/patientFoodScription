import { Component, OnInit, Renderer2, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import { LoadingController } from '@ionic/angular';
import { DataService } from 'src/app/sharedFiles/data.service';
import { FpService } from '../fps.service';

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.page.html',
  styleUrls: ['./favorites.page.scss'],
})
export class FavoritesPage implements OnInit {

  constructor(private dataService:DataService,
             private render: Renderer2,
             private fpService:FpService,
             private loadCtrl:LoadingController,
             private router:Router) { }

  meals:any[];
  favoritesAvailable:boolean = true;

  ngOnInit() {
    this.loadCtrl.create({
      message:'Fetching Favorites...',
      backdropDismiss:false
    }).then( modal => {
      modal.present();
      this.getFavoriteMeal(modal);
    });
  }

  nutrientsToggle(textShown:string,nutrientsDiv:ElementRef<any>,nutrientsTextEl:ElementRef<any>,hideTextEl:ElementRef<any>){
    if(textShown === "nutrients"){
      this.render.setStyle(nutrientsDiv,'display','block');
      this.render.setStyle(nutrientsTextEl,'display','none');
      this.render.setStyle(hideTextEl,'display','block');
    }else{
      this.render.setStyle(nutrientsDiv,'display','none');
      this.render.setStyle(nutrientsTextEl,'display','block');
      this.render.setStyle(hideTextEl,'display','none');
    }
    
  }

  getFavoriteMeal(modal:HTMLIonLoadingElement){
    this.dataService.getFavorites().then( favorites => {
      this.meals = favorites.results;
      this._checkForNoFavorites();
      modal.dismiss();
    }).catch(()=>{
      modal.dismiss();
      this.router.navigateByUrl("/error/Error Retrieving Favorites/favorites");
    });
  }

  removeFavorite(id:number){
    this.fpService.updateMealFavorite(id,false).then(()=>{
      for(let i=0; i<this.meals.length; i++){
        if(this.meals[i].id === id){
          this.meals.splice(i,1);
          this._checkForNoFavorites();
          this._updateCurrentMeals(id);
        }
      }
    }).catch(()=>{
      this.router.navigateByUrl("/error/Error Updating Favorites/favorites");
    });
  }

  private _updateCurrentMeals(id:number){
    let currentMeals = this.dataService.currentMeals;
    for(let i=0; i<currentMeals.length; i++){
      for(let j=0; j<currentMeals[i].meals.length; j++){
        for(let k=0; k<currentMeals[i].meals[j].mealElements.length; k++){
          if(currentMeals[i].meals[j].mealElements[k].recipe.id === id){
            currentMeals[i].meals[j].mealElements[k].recipe.isFavorite = false;
          }
          break;
        }
      }
    }
  }

  private _checkForNoFavorites(){
    if(this.meals.length === 0){
      this.favoritesAvailable = false;
    }
  }

}
