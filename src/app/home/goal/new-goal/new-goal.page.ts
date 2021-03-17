import { Component, OnInit } from '@angular/core';
import { NewGoalDifficultyPage } from '../new-goal-difficulty/new-goal-difficulty.page';
import { ModalController } from '@ionic/angular';
import { FoodscriptionCommonService } from 'src/app/sharedFiles/foodscription-common.service';

@Component({
  selector: 'app-new-goal',
  templateUrl: './new-goal.page.html',
  styleUrls: ['./new-goal.page.scss'],
})
export class NewGoalPage implements OnInit {

  constructor(private modalCtrl:ModalController,
              private fsCommon:FoodscriptionCommonService) { }


  disabled:boolean = true;
  loseWeightIconClicked:boolean = false;
  keepItIconClicked:boolean = false;
  gainWeightIconClicked:boolean = false;

  ngOnInit() {
  }


  dismissModel(){
    this.fsCommon.dismissModal();
  }

  iconClicked(goalType:string){
    this.disabled = false;
    switch(goalType){
      case 'loseWeight':{
        this._iconSelection(true,false,false);
        break;
      }
      case 'keepIt':{
        this._iconSelection(false,true,false);
        break;
      }
      case 'gainWeight':{
        this._iconSelection(false,false,true);
        break;
      }
    }
  }

  navigate(){
    this.modalCtrl.dismiss().then( () => {
      this.fsCommon.openModal(NewGoalDifficultyPage);
    });
    
  }

  private _iconSelection(loseWeight:boolean,keepWeight:boolean,gainWeight:boolean){
    this.loseWeightIconClicked = loseWeight;
    this.keepItIconClicked = keepWeight;
    this.gainWeightIconClicked = gainWeight;
  }

}
