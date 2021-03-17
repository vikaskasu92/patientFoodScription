import { Component, OnInit } from '@angular/core';
import { SettingsService } from './settings/settings.service';
import { NavController, LoadingController } from '@ionic/angular';
import { Router } from '@angular/router';
import { FoodscriptionCommonService } from '../sharedFiles/foodscription-common.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  constructor(private settingsService:SettingsService, 
              private navCtrl:NavController,
              private loadCtrl:LoadingController,
              private fsCommon:FoodscriptionCommonService,
              private router:Router) { }

  showGoal:boolean;
  showToday:boolean;
  data:any;

  ngOnInit() {
  }
  
  ionViewWillEnter(){
    this.loadCtrl.create({
      message:'Loading Home...',
      backdropDismiss:false
    }).then( modal => {
      modal.present();
      if(this.settingsService.showGoal === null && this.settingsService.showToday === null){
        this.settingsService.fetchUserPreferences().then( preferences => {
          console.log(preferences);
          this.settingsService.createOrUpdatePreferences(preferences);
          this._updateSettings();
          modal.dismiss();
        }).catch(()=>{
          modal.dismiss();
          this.router.navigateByUrl("/error/Error Retrieving Settings/home");
        });
      }else{
        this._updateSettings();
        modal.dismiss();
      }
      this.showGoal = this.settingsService.showGoal;
      this.showToday = this.settingsService.showToday;
    })
    this.fsCommon.cartItemUpdated.next();
  }

  navigateToSearch(){
    this.navCtrl.navigateForward('/search');
  }
  
  naviagateToGroceryList(){
    this.navCtrl.navigateForward('/grocery-list');
  }

  private _updateSettings(){
    this.showGoal = this.settingsService.showGoal;
    this.showToday = this.settingsService.showToday;
  }

}
