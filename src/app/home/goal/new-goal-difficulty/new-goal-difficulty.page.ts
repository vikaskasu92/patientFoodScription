import { Component, OnInit } from '@angular/core';
import { FoodscriptionCommonService } from 'src/app/sharedFiles/foodscription-common.service';

@Component({
  selector: 'app-new-goal-difficulty',
  templateUrl: './new-goal-difficulty.page.html',
  styleUrls: ['./new-goal-difficulty.page.scss'],
})
export class NewGoalDifficultyPage implements OnInit {

  constructor(private fsCommon:FoodscriptionCommonService) { }

  disabled:boolean = true;
  easyCardSelected:boolean = false;
  mediumCardSelected:boolean = false;
  hardCardSelected:boolean = false;

  ngOnInit() {
  }

  dismissModel(){
    this.fsCommon.dismissModal();
  }

  difficultySelected(difficulty:string){
    switch(difficulty){
      case 'easy' :{
        this._difficultySelection(true,false,false);
        break;
      }
      case 'medium' :{
        this._difficultySelection(false,true,false);
        break;
      }
      case 'hard' :{
        this._difficultySelection(false,false,true);
        break;
      }
    }
  }

  navigate(){
    this.fsCommon.dismissModalWithToast('Success! New goal set.',2000,'toast-config');
  }

  private _difficultySelection(easyCard:boolean,mediumCard:boolean,hardCard:boolean){
    this.disabled = false;
    this.easyCardSelected = easyCard;
    this.mediumCardSelected = mediumCard;
    this.hardCardSelected = hardCard;
  }

}
