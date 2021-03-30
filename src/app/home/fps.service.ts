import { Injectable } from '@angular/core';
//import { AuthService } from 'src/app/auth/auth.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthService } from '../auth/auth.service';
import { FoodscriptionCommonService } from '../sharedFiles/foodscription-common.service';

@Injectable({
  providedIn: 'root'
})
export class FpService {

  constructor(private http:HttpClient,
              private authService:AuthService,
              private fpCommon:FoodscriptionCommonService) { }

  foodPreferences:string[] = [];
  foodPreferencesLikes:string[] = [];
  foodPreferencesDisLikes:string[] = [];
  generalEatingPattern:string = 'None Selected';
  favorites:any[];
  favoritesData:any[] = [];

    updateMealFavorite(id:number,favorite:boolean){
      if(this.authService.appPlatform === "web"){
        let token = this.fpCommon.getCookie("csrftoken");
        return new Promise<any>((resolve,reject)=>{
          this.http.patch<any>("https://fs-api.phrqltest.com/api/recipe/"+id+"/favorite-rating/",{ "favorite":favorite},{
            headers :  new HttpHeaders().set('Content-Type', 'application/json').set('X-CSRFToken',token),
            withCredentials:true
          }).subscribe( favoriteUpdate => {
              resolve(favoriteUpdate);
          },err=>{
            reject();
          });
        });
      }else{
        return new Promise<any>((resolve,reject)=>{
          this.http.patch<any>("https://fs-api.phrqltest.com/api/recipe/"+id+"/favorite-rating/",{ "favorite":favorite},this.authService.getHeadersObject()).subscribe( favoriteUpdate => {
              resolve(favoriteUpdate);
          },err=>{
            reject();
          });
        });
      }
      
    }

    storeFoodPreferencesToDB(){
      if(this.authService.appPlatform === "web"){
        let token = this.fpCommon.getCookie("csrftoken");
        return new Promise<any>((resolve,reject)=>{
          this.http.patch<any>("https://fs-api.phrqltest.com/api/user-food-preference/"+this.authService.userPreferenceId,{
            "cuisineLikes":this.foodPreferencesLikes,
            "cuisineDislikes":this.foodPreferencesDisLikes
        },{
          headers :  new HttpHeaders().set('Content-Type', 'application/json').set('X-CSRFToken',token),
          withCredentials:true
        }).subscribe( addFavorites => {
             resolve(addFavorites);
          },err=>{
            reject();
         });
        });
      }else{
        return new Promise<any>((resolve,reject)=>{
          this.http.patch<any>("https://fs-api.phrqltest.com/api/user-food-preference/"+this.authService.userPreferenceId,{
            "cuisineLikes":this.foodPreferencesLikes,
            "cuisineDislikes":this.foodPreferencesDisLikes
        },this.authService.getHeadersObject()).subscribe( addFavorites => {
             resolve(addFavorites);
          },err=>{
            reject();
         });
        });
      }

     
    }

    updateMealRating(rating:number,id:number){
      if(this.authService.appPlatform === "web"){
        let token = this.fpCommon.getCookie("csrftoken");
        return new Promise<any>((resolve,reject)=>{
          this.http.patch<any>("https://fs-api.phrqltest.com/api/recipe/"+id+"/favorite-rating/",{"rating":rating},
          {
            headers :  new HttpHeaders().set('Content-Type', 'application/json').set('X-CSRFToken',token),
            withCredentials:true
          }).subscribe( addRating => {
              resolve(addRating);
          },err=>{
            reject();
          });
        });
      }else{
        return new Promise<any>((resolve,reject)=>{
          this.http.patch<any>("https://fs-api.phrqltest.com/api/recipe/"+id+"/favorite-rating/",{"rating":rating},
          this.authService.getHeadersObject()).subscribe( addRating => {
              resolve(addRating);
          },err=>{
            reject();
          });
        });
      }

      
    }

}
