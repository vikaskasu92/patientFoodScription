import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { NavController } from '@ionic/angular';
import { FpService } from '../fps.service';

@Component({
  selector: 'app-food-preferences',
  templateUrl: './food-preferences.page.html',
  styleUrls: ['./food-preferences.page.scss'],
})
export class FoodPreferencesPage implements OnInit {

  constructor(private navCtrl:NavController, 
              private fpService:FpService) { }
  
  counter:number = 14;
  foodPreferencesNotDone:boolean = true;
  foodpreferencesLike:string[] = [];
  foodPreferencesDislike:string[] = [];
  visitedCancelFP:String;
  @ViewChild('cardMovable1',{static:false}) cardMovable1:ElementRef;
  @ViewChild('cardMovable2',{static:false}) cardMovable2:ElementRef;
  @ViewChild('cardMovable3',{static:false}) cardMovable3:ElementRef;
  @ViewChild('cardMovable4',{static:false}) cardMovable4:ElementRef;
  @ViewChild('cardMovable5',{static:false}) cardMovable5:ElementRef;
  @ViewChild('cardMovable6',{static:false}) cardMovable6:ElementRef;
  @ViewChild('cardMovable7',{static:false}) cardMovable7:ElementRef;
  @ViewChild('cardMovable8',{static:false}) cardMovable8:ElementRef;
  @ViewChild('cardMovable9',{static:false}) cardMovable9:ElementRef;
  @ViewChild('cardMovable10',{static:false}) cardMovable10:ElementRef;
  @ViewChild('cardMovable11',{static:false}) cardMovable11:ElementRef;
  @ViewChild('cardMovable12',{static:false}) cardMovable12:ElementRef;
  @ViewChild('cardMovable13',{static:false}) cardMovable13:ElementRef;
  @ViewChild('cardMovable14',{static:false}) cardMovable14:ElementRef;


  ngOnInit() {}

  ionViewWillEnter(){
    if(this.visitedCancelFP === "/cancelFoodPreferences"){
        this._updatePreviouslyDonePreferences();
        this.visitedCancelFP = "";
    }
  }

  navigate(){
    this.fpService.foodPreferencesLikes = this.foodpreferencesLike;
    this.fpService.foodPreferencesDisLikes = this.foodPreferencesDislike;
    this.fpService.storeFoodPreferencesToDB().then( () => {});
    //this.navCtrl.navigateForward('/home/food-preferences/eating-pattern');
    this.navCtrl.navigateBack('/home');
  }

  cancelFoodPreferences(){
    if(this.counter != 0){
        this.visitedCancelFP = "/cancelFoodPreferences";
        this.navCtrl.navigateForward('/home/food-preferences/cancel-preference');
    }else{
        this.fpService.foodPreferences = [];
        this.navCtrl.navigateBack('/home');
    }
    
}

  foodLikeDislike(preference:string){
    if(this.counter > 0 && this.counter <15){
      if(this.counter === 1){
          this.foodPreferencesNotDone = false;
      }
      switch(this.counter){
          case 1:{
            this._foodLikeDislikeProperties(this.cardMovable1,preference,'brazilian');
            break;
          }
          case 2:{
            this._foodLikeDislikeProperties(this.cardMovable2,preference,'caribbean');
            break;
          }
          case 3:{
            this._foodLikeDislikeProperties(this.cardMovable3,preference,'chinese');
            break;
          }
          case 4:{
            this._foodLikeDislikeProperties(this.cardMovable4,preference,'french');
            break;
          }
          case 5:{
            this._foodLikeDislikeProperties(this.cardMovable5,preference,'greek');
            break;
          }
          case 6:{
            this._foodLikeDislikeProperties(this.cardMovable6,preference,'indian');
            break;
          }
          case 7:{
            this._foodLikeDislikeProperties(this.cardMovable7,preference,'italian');
            break;
          }
          case 8:{
            this._foodLikeDislikeProperties(this.cardMovable8,preference,'japanese');
            break;
          }
          case 9:{
            this._foodLikeDislikeProperties(this.cardMovable9,preference,'mexican');
            break;
          }
          case 10:{
            this._foodLikeDislikeProperties(this.cardMovable10,preference,'middle eastern');
            break;
          }
          case 11:{
            this._foodLikeDislikeProperties(this.cardMovable11,preference,'nordic');
            break;
          }
          case 12:{
            this._foodLikeDislikeProperties(this.cardMovable12,preference,'african');
            break;
          }
          case 13:{
            this._foodLikeDislikeProperties(this.cardMovable13,preference,'spain & portugal');
            break;
          }
          case 14:{
            this._foodLikeDislikeProperties(this.cardMovable14,preference,'thai');
            break;
          }
      }
  }
  }

private _storeLikeOrDislike(likeOrDislike:string, cardName:string){
    likeOrDislike === 'up' ?  this.foodpreferencesLike.push(cardName) :  this.foodPreferencesDislike.push(cardName);
}

private _foodLikeDislikeProperties(card:ElementRef,preference:string,cuisine:string){
    this._animatePhoto(card,preference);
    this._storeLikeOrDislike(preference,cuisine);
    this.fpService.foodPreferences.push(cuisine);
    this.counter --;
}

private _updatePreviouslyDonePreferences(){
    switch(this.fpService.foodPreferences.length){
        case 1:{
          this._hideOldCards(this.cardMovable1,1);
          break;
        }
        case 2:{
          this._hideOldCards(this.cardMovable2,2);
          break;
        }
        case 3:{
          this._hideOldCards(this.cardMovable3,3);
          break;
        }
        case 4:{
          this._hideOldCards(this.cardMovable4,4);
          break;
        }
        case 5:{
          this._hideOldCards(this.cardMovable5,5);
          break;
        } 
        case 6:{
          this._hideOldCards(this.cardMovable6,6);
          break;
        }
        case 7:{
          this._hideOldCards(this.cardMovable7,7);
          break;
        }
        case 8:{
          this._hideOldCards(this.cardMovable8,8);
          break;
        }
        case 9:{
          this._hideOldCards(this.cardMovable9,9);
          break;
        }
        case 10:{
          this._hideOldCards(this.cardMovable10,10);
          break;
        }
        case 11:{
          this._hideOldCards(this.cardMovable11,11);
          break;
        }
        case 12:{
          this._hideOldCards(this.cardMovable12,12);
          break;
        }
        case 13:{
          this._hideOldCards(this.cardMovable13,13);
          break;
        }
        case 14:{
          this._hideOldCards(this.cardMovable14,14);
          break;
        }
    }
}

  private _animatePhoto(card:ElementRef,type:string){
    if(type === 'down'){
      card.nativeElement.style.animation = 'rotateOutUpLeft 1s ease-out';
    }else{
      card.nativeElement.style.animation = 'rotateOutUpRight 1s ease-out';
    }
    setTimeout( ()=>{
      card.nativeElement.style.display = 'none';
    },900);
  }

  private _hideOldCards(card:ElementRef,currentIndex:number){
    for(let i=14; i>0; i--){
      if(i = 15-currentIndex){
        this.counter = 15-currentIndex;
        break;
      }
      card.nativeElement.style.display = 'none';
    }
    
  }

}
