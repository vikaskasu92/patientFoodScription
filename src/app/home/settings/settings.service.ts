import { Injectable } from '@angular/core';
import { AuthService } from 'src/app/auth/auth.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { FoodscriptionCommonService } from 'src/app/sharedFiles/foodscription-common.service';

@Injectable({
  providedIn: 'root'
})
export class SettingsService {

  constructor(private authService: AuthService,
              private http: HttpClient,
              private fpCommon:FoodscriptionCommonService) { }

  showGoal:boolean = null;
  showToday:boolean = null;

  checkUserOwnInfo(){
    return new Promise<any>((resolve,reject)=>{
          this.http.get(environment.userOwnInfo,this.authService.getHeadersObject()).subscribe( userOwninfo => {
              resolve(userOwninfo);
          },err=>{
            reject();
          });
    });
}

fetchUserPreferences(){
  return new Promise<any>((resolve,reject)=>{
        this.http.get<any>(environment.userSettings,this.authService.getHeadersObject()).subscribe( userSettings => {
            resolve(userSettings);
        },err=>{
          reject();
        });
  });
}

storeNewUserPreferences(){
  if(this.authService.appPlatform === "web"){
    let token = this.fpCommon.getCookie("csrftoken");
    return new Promise<any>((resolve,reject)=>{
      this.http.post<any>(environment.userBulkSettings,[{
        "key": "showGoal",
        "value": "true",
        "valueType": "string",
        "deviceType": "0_all"
      },{
        "key": "showToday",
        "value": "true",
        "valueType": "string",
        "deviceType": "0_all"
      }], {
        headers :  new HttpHeaders().set('Content-Type', 'application/json').set('X-CSRFToken',token),
        withCredentials:true
      }).subscribe( newUserPreferences => {
          resolve(newUserPreferences);
      },err=>{
        reject();
      });
    });   
  }else{
    return new Promise<any>((resolve,reject)=>{
      this.http.post<any>(environment.userBulkSettings,[{
        "key": "showGoal",
        "value": "true",
        "valueType": "string",
        "deviceType": "0_all"
      },{
        "key": "showToday",
        "value": "true",
        "valueType": "string",
        "deviceType": "0_all"
      }],this.authService.getHeadersObject()).subscribe( newUserPreferences => {
          resolve(newUserPreferences);
      },err=>{
        reject();
      });
    });
  }


  
  }

  createOrUpdatePreferences(preferences:any){
    if(preferences.count !== 0){
      for(let i=0; i<preferences.results.length; i++){
        if(preferences.results[i].key === "showGoal"){
          this.showGoal = JSON.parse(preferences.results[i].value);
        }
        if(preferences.results[i].key === "showToday")
        this.showToday = JSON.parse(preferences.results[i].value);
      }
    }else{
      this.showGoal = true;
      this.showToday = true;
      this.storeNewUserPreferences().then( () => {});
    }
  }

  updateUserSettings(preferencesId:number,value:boolean,preferenceType:string){
    if(this.authService.appPlatform === "web"){
      let token = this.fpCommon.getCookie("csrftoken");
      return new Promise<any>((resolve,reject)=>{
        this.http.patch<any>("https://fs-api.phrqltest.com/api/user-settings/"+preferencesId+"/",{
        "key": preferenceType,
        "value": value.toString(),
        "valueType": "string",
        "deviceType": "0_all"
      },{
        headers :  new HttpHeaders().set('Content-Type', 'application/json').set('X-CSRFToken',token),
        withCredentials:true
      }).subscribe( updateUserGoal => {
            resolve(updateUserGoal);
        },err=>{
          reject();
        });
      });
    }else{
      return new Promise<any>((resolve,reject)=>{
        this.http.patch<any>("https://fs-api.phrqltest.com/api/user-settings/"+preferencesId+"/",{
        "key": preferenceType,
        "value": value.toString(),
        "valueType": "string",
        "deviceType": "0_all"
      },this.authService.getHeadersObject()).subscribe( updateUserGoal => {
            resolve(updateUserGoal);
        },err=>{
          reject();
        });
      });
    }
    
  }
}
