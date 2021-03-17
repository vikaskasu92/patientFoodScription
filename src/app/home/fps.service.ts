import { Injectable } from '@angular/core';
//import { AuthService } from 'src/app/auth/auth.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class FpService {

  constructor(private http:HttpClient) { }

  foodPreferences:string[] = [];
  foodPreferencesLikes:string[] = [];
  foodPreferencesDisLikes:string[] = [];
  generalEatingPattern:string = 'None Selected';
  favorites:any[];
  favoritesData:any[] = [];

    updateMealFavorite(id:number,favorite:boolean){
      return new Promise<any>((resolve,reject)=>{
            this.http.patch<any>("https://fs-api.phrqltest.com/api/recipe/"+id+"/favorite-rating/",{ "favorite":favorite},{
              headers: new HttpHeaders().set("accept","application/json"),withCredentials:true}).subscribe( favoriteUpdate => {
                resolve(favoriteUpdate);
            },err=>{
              reject();
            });
      });
    }

    storeFoodPreferencesToDB(){
      return new Promise<any>((resolve,reject)=>{
            this.http.patch<any>("https://fs-api.phrqltest.com/api/user-food-preference/1",{
              "cuisineLikes":this.foodPreferencesLikes,
              "cuisineDislikes":this.foodPreferencesDisLikes
          },{headers: new HttpHeaders().set("accept","application/json"),withCredentials:true}).subscribe( addFavorites => {
               resolve(addFavorites);
            },err=>{
              reject();
           });
      });
    }

    updateMealRating(rating:number,id:number){
      return new Promise<any>((resolve,reject)=>{
            this.http.patch<any>("https://fs-api.phrqltest.com/api/recipe/"+id+"/favorite-rating/",{"rating":rating},
            {headers:  new HttpHeaders().set("accept","application/json"),withCredentials:true}).subscribe( addRating => {
                resolve(addRating);
            },err=>{
              reject();
            });
      });
    }

}
