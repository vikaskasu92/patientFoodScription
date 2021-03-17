import { Injectable } from '@angular/core';
import { AuthService } from 'src/app/auth/auth.service';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SettingsService {

  constructor(private authService: AuthService,
              private http: HttpClient) { }

  showGoal:boolean = null;
  showToday:boolean = null;

  checkUserOwnInfo(){
    return new Promise<any>((resolve,reject)=>{
          this.http.get(environment.userOwnInfo,{
            headers:  new HttpHeaders().set("accept","application/json"),withCredentials:true}).subscribe( userOwninfo => {
              resolve(userOwninfo);
          },err=>{
            reject();
          });
    });
}

fetchUserPreferences(){
  return new Promise<any>((resolve,reject)=>{
        this.http.get<any>(environment.userSettings,{
          headers:  new HttpHeaders().set("accept","application/json"),withCredentials:true}).subscribe( userSettings => {
            resolve(userSettings);
        },err=>{
          reject();
        });
  });
}

storeNewUserPreferences(){
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
        }],{
          headers:  new HttpHeaders().set("accept","application/json"),withCredentials:true}).subscribe( newUserPreferences => {
            resolve(newUserPreferences);
        },err=>{
          reject();
        });
  });
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
    return new Promise<any>((resolve,reject)=>{
          this.http.patch<any>("https://fs-api.phrqltest.com/api/user-settings/"+preferencesId+"/",{
          "key": preferenceType,
          "value": value.toString(),
          "valueType": "string",
          "deviceType": "0_all"
        },{
          headers: new HttpHeaders().set("accept","application/json"),withCredentials:true}).subscribe( updateUserGoal => {
              resolve(updateUserGoal);
          },err=>{
            reject();
          });
    });
  }
}
