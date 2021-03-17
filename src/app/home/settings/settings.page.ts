import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SettingsService } from './settings.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.page.html',
  styleUrls: ['./settings.page.scss'],
})
export class SettingsPage implements OnInit {

  constructor(private settingsService:SettingsService,
            private router:Router) { }

  showGoal:boolean;
  showToday:boolean;

  ngOnInit(){
    this._checkAndUpdateSettings();
  }

  ionViewWillEnter() {
    this._checkAndUpdateSettings();
  }

  eyeClicked(eyeType:string){
    if(eyeType === 'goal'){
      this._toggleGoal(); 
    }else{
      this._toggleToday();
    }
  }

  private _toggleGoal(){
    this.settingsService.fetchUserPreferences().then( preferences => {
      
      for(let i=0; i<preferences.results.length; i++){
        if(preferences.results[i].key === "showGoal"){
          this.showGoal = ! this.showGoal;
          this.settingsService.updateUserSettings(preferences.results[i].id,this.showGoal,"showGoal").then( () => {
            this.settingsService.showGoal = this.showGoal;
          }).catch(()=>{
            this.router.navigateByUrl("/error/Error Updating Settings/settings");
          });
        }
      }
    }).catch(()=>{
      this.router.navigateByUrl("/error/Error Retrieving Settings/settings");
    });
  }

  private _toggleToday(){
    this.settingsService.fetchUserPreferences().then( preferences => {
      for(let i=0; i<preferences.results.length; i++){
        if(preferences.results[i].key === "showToday"){
          this.showToday = ! this.showToday;
          this.settingsService.updateUserSettings(preferences.results[i].id,this.showToday,"showToday").then( () => {
            this.settingsService.showToday = this.showToday;
          }).catch(()=>{
            this.router.navigateByUrl("/error/Error Updating Settings/settings");
          });
        }
      }
    }).catch(()=>{
      this.router.navigateByUrl("/error/Error Retrieving Settings/settings");
    });
  }

  private _checkAndUpdateSettings(){
    if(this.settingsService.showGoal === null && this.settingsService.showToday === null){
      this.settingsService.fetchUserPreferences().then( preferences => {
        this.settingsService.createOrUpdatePreferences(preferences);
        this._updateSettings();
      }).catch(()=>{
        this.router.navigateByUrl("/error/Error Retrieving Settings/settings");
      });
    }else{
      this._updateSettings();
    }
  }

  private _updateSettings(){
    this.showGoal = this.settingsService.showGoal;
    this.showToday = this.settingsService.showToday;
  }

}
