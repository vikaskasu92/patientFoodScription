import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { AuthService } from '../auth/auth.service';
import { of, Subject } from 'rxjs';
import {webSocket, WebSocketSubject} from 'rxjs/webSocket';
import { environment } from '../../environments/environment'; 
import { Plugins } from '@capacitor/core';
import { catchError } from 'rxjs/operators';

const { Storage } = Plugins;

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private http:HttpClient,
            private authService:AuthService) {
                this.weekAray = this.getWeekArray();
             }

  totalCalories:number;
  totalCarbs:number;
  totalFat:number;
  totalProtein:number;
  weekAray:any;
  currentMeals:any = null;
  infiniteMealList = new Subject<any[]>();
  infiniteMealsListArray = this.infiniteMealList.asObservable();
  infiniteMeals:any[] = [];
  groceryIngredients:any[] = [];
  myWebSocket: WebSocketSubject<any>;
  inConversationPage:boolean = false;
  inChatPage:boolean = false;

connectToChatServer(email:string){
  if(this.myWebSocket !== undefined && this.myWebSocket.isStopped ){
    this.startWebSocket(email);
  }else if(this.myWebSocket === undefined){
    this.startWebSocket(email);
  }
}

startWebSocket(email:string){
  this.myWebSocket = webSocket('wss://gfdkv495x9.execute-api.us-east-1.amazonaws.com/Prod');
    this.myWebSocket.pipe(catchError(val => of(`I caught: ${val}`))).subscribe(dataFromServer => {
      if(dataFromServer.Type === "USER_MESSAGE_RECIEVED"){
        if(!this.inChatPage && !this.inConversationPage){
          console.log("not in chat or convo")
          this.myWebSocket.next( {"action":"sendmessage","data":{ "type": "USER_MESSAGES", "read": false , "message":dataFromServer.response.message, "sendTo": this.authService.username, "onlyPush": true }});
        }
      }
    });
    this.myWebSocket.next({"action":"sendmessage","data":{ "type": "NEW_CONNECTION", "read": false, "email": email}});
}

stopWebSocket(){
  this.myWebSocket.unsubscribe();
}

getMeals(fromDate:string,toDate:string,limit:string){
  let userToken = this.authService.accessToken;
  return new Promise<any>((resolve,reject)=>{
    this.http.get<any>(environment.mealDayApi+"?toDate="+toDate+"&ordering=recipe&limit="+limit+"&offset=0",this.authService.getHeadersObject()).subscribe( meals =>{
        resolve(meals);
      },err=>{
        reject();
      });
  });
}

getFavorites(){
  return new Promise<any>((resolve,reject)=>{
        this.http.get<any>(environment.userFavorites,this.authService.getHeadersObject()).subscribe( favorites => {
            resolve(favorites);
          },err=>{
            reject();
          });
  });
}

getNextInfiniteMeals(nextUrl:string){
    let httpUrlArray = nextUrl.split("http");
    return new Promise<any>((resolve,reject)=>{
          this.http.get<any>("https"+httpUrlArray[1],this.authService.getHeadersObject()).subscribe( meals => {
              resolve(meals);
          },err=>{
            reject();
          });
    });
}

getIngredientCategories(ingredientIds:any){
  return new Promise<any>((resolve,reject)=>{
        this.http.post<any>(environment.ingredientsCategory,ingredientIds,this.authService.getHeadersObject()).subscribe( ingredients => {
            resolve(ingredients);
        },err=>{
          reject();
        });
  });
}

saveMealsNotFollowed(mealElementId:number,followed:boolean,followedReason1:string,followedReason2:string){
  let followedReason = [];
  if(followedReason2 === undefined){
    followedReason.push(followedReason1);
  }else{
    followedReason.push(followedReason1);
    followedReason.push(followedReason2);
  }
  return new Promise<any>((resolve,reject)=>{
        this.http.put<any>("https://fs-api.phrqltest.com/api/meal-element/"+mealElementId+"/followed/",{
          "followed":followed,
          "followedReason":followedReason
        },this.authService.getHeadersObject()).subscribe( mealsFollowed => {
          resolve(mealsFollowed);
        },err =>{
          reject();
        });
  });
}

searchMedialConditions(searchText:string){
  return this.http.get<any>(environment.searchDisease+"?condition="+searchText,this.authService.getHeadersObject())
}

saveUserInfo(userInfo:any):Promise<any>{
 // let userPreferenceId:any = this.authService.userPreferenceId;
 let userPreferenceId:any = undefined;
  return new Promise((resolve,reject) => {
    if(userPreferenceId === undefined){
      Storage.get({key:'fsUserPreferenceId'}).then( storage => {
        userPreferenceId = JSON.parse(storage.value).preferencesId;
        this.http.patch<any>(environment.saveUserInfo+userPreferenceId+"/",userInfo,this.authService.getHeadersObject()).subscribe( () => {
          resolve();
        });
      })
    }else{
      this.http.patch<any>(environment.saveUserInfo+userPreferenceId+"/",userInfo,this.authService.getHeadersObject()).subscribe( () => {
        resolve();
      });
    }
  });
}

getUserWeights(period:string){
  return this.http.get<any>(environment.getUserWeights+"?range="+period,this.authService.getHeadersObject());
}

getWeekArray(){
    return this.generateWeekArray();
}

currentDate(){
    return new Date().getDate();
}

startDate(){
    return this.currentDate() - (new Date().getDay() - 1);
}

getFromDate(currentDateIndex:number){
    if(currentDateIndex < 7){
        return this.weekAray[0].toLocaleDateString(); 
    }else if(currentDateIndex >6 && currentDateIndex <14){
        return this.weekAray[7].toLocaleDateString();
    }else{
        return this.weekAray[14].toLocaleDateString();
    }
}

getToDate(currentDateIndex:number){
    if(currentDateIndex < 7){
        return this.weekAray[6].toLocaleDateString(); 
    }else if(currentDateIndex >6 && currentDateIndex <14){
        return this.weekAray[13].toLocaleDateString();
    }else{
        return this.weekAray[20].toLocaleDateString();
    }
}

storeNewMealsInStore(meals:any){
    if(this.currentMeals.length === 0){
        this.currentMeals = meals; 
    }else{

    }
}

generateWeekArray():Date[]{
    let currentDay = new Date().getDay();
    let currentDate = new Date().getDate();
    let startDate = currentDate - (((currentDay+1)-1)+7);
    const weekAray = [];
    let i = 0;
    for(let j=0; j<21; j++){
      let today = new Date();
      if(i  === 0){
        today.setDate(startDate)
        weekAray.push(today);
        i++;
      }else{
        today.setDate(startDate+j)
        weekAray.push(today);
      }
    }
    return weekAray;
  }

  generateCurrentWeekArray():Date[]{
    let currentDay = new Date().getDay();
    let currentDate = new Date().getDate();
    let startDate = currentDate - (((currentDay+1)-1));
    const weekAray = [];
    let i = 0;
    for(let j=0; j<7; j++){
      let today = new Date();
      if(i  === 0){
        today.setDate(startDate)
        weekAray.push(today);
        i++;
      }else{
        today.setDate(startDate+j)
        weekAray.push(today);
      }
    }
    return weekAray;
  }

  generateGroceryListArray(mealResults:any){
    const groceryIngredientsList = this.groceryIngredients;
    for(let i=0; i<mealResults.length; i++){
      let newObj = {
        'date':null,
        'title':null,
        'cart':false,
        'ingredients':[]
      };
      this._generateMealsIngredients(newObj,mealResults,groceryIngredientsList,i);
    }
   this.groceryIngredients = groceryIngredientsList;
  }

  private _generateMealsIngredients(newObj:any,mealResults:any,groceryIngredientsList:any,i:number){
    for(let j=0; j<mealResults[i].meals.length; j++){
      for(let k=0; k<mealResults[i].meals[j].mealElements.length; k++){
        newObj.date = mealResults[i].date;
        newObj.title = mealResults[i].meals[j].mealElements[k].recipe.title;
        this._generateIndividualIngredients(newObj,mealResults,i,j,k);
        groceryIngredientsList.push(newObj);
        newObj = {
          'date':null,
          'title':null,
          'cart':false,
          'ingredients':[]
        };
      }
    }
  }

  private _generateIndividualIngredients(newObj:any,mealResults:any,i:number,j:number,k:number){
    for(let l=0; l<mealResults[i].meals[j].mealElements[k].recipe.extendedIngredients.length; l++){
      newObj.ingredients.push({
        'value':(mealResults[i].meals[j].mealElements[k].recipe.extendedIngredients[l].amount * mealResults[i].meals[j].mealElements[k].recipe.servings),
        'unit':mealResults[i].meals[j].mealElements[k].recipe.extendedIngredients[l].unit,
        'name':mealResults[i].meals[j].mealElements[k].recipe.extendedIngredients[l].ingredient,
        'ingredientId':mealResults[i].meals[j].mealElements[k].recipe.extendedIngredients[l].ingredientId,
        'id':mealResults[i].meals[j].mealElements[k].recipe.extendedIngredients[l].id,
        'checked':true
      })
    }
  }

      
}
