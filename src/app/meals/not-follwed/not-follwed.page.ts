import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from 'src/app/sharedFiles/data.service';
import { FoodscriptionCommonService } from 'src/app/sharedFiles/foodscription-common.service';

@Component({
  selector: 'app-not-follwed',
  templateUrl: './not-follwed.page.html',
  styleUrls: ['./not-follwed.page.scss'],
})
export class NotFollwedPage implements OnInit {

  constructor(private fsCommon:FoodscriptionCommonService,
              private dataService:DataService,
              private router:Router) { }

  @Input() mealImage:string;
  @Input() mealElementId:number
  part1:boolean = true;
  part2a:boolean = false;
  part2b:boolean = false;
  somethingElse:boolean = false;
  skipReason:boolean = false;
  otherReason:boolean = false;
  part1Reason:string;
  part2Reason:string;

  ngOnInit() {
  }

  closeModal(){
    this.fsCommon.dismissModal();
  }

  changedRadio(event:any){
      if(event.detail.value === "somethingElse"){
        this.somethingElse = true;
        this.part1Reason = "I had something else";
      }else{
        this.somethingElse = false;
        this.part1Reason = "I took a different portion";
      }
  }

  changedRadio2a(event:any){
    if(event.detail.value === "skipMeal"){
      this.skipReason = true;
      this.otherReason = false;
      this.part2Reason = undefined;
    }else if(event.detail.value === "Other"){
      this.otherReason = true;
      this.skipReason = false;
      this.part2Reason = undefined;
    }else if(event.detail.value === "leftOversRepeatedRecipe"){
      this.skipReason = false;
      this.otherReason = false;
      this.part2Reason = "repeated previous meal";
    }else if(event.detail.value === "notAGoodChoice"){
      this.skipReason = false;
      this.otherReason = false;
      this.part2Reason = "didn't like recommendation";
    }else if( event.detail.value === "goodChoiceCouldNotPrepare"){
      this.skipReason = false;
      this.otherReason = false;
      this.part2Reason = "couldn't prepare meal";
    }else if( event.detail.value === "problemWithRecipe"){
      this.skipReason = false;
      this.otherReason = false;
      this.part2Reason = "problem with recipe";
    }
  }

  changedRadio2b(event:any){
    if(event.detail.value === "smallerPortion"){
      this.part2Reason = "I had a smaller portion size";
    }else{
      this.part2Reason = "I had a larger portion size";
    }
  }

  nextPart(currentPart:number){
    if(currentPart === 1){
      this.part1 = false;
      this.somethingElse ? this.part2a = true : this.part2b = true;
    }else{
      if(this.part2Reason === undefined && this.part2a === true){
        if(this.skipReason){
          let skipEl = <any>document.querySelector("#skipReason");
          this.part2Reason = skipEl.textContent;
        }else{
          let otherEl = <any>document.querySelector("#otherReason");
          this.part2Reason = otherEl.textContent;
        }
      }
      this.part2a = false;
      this.part2b = false;
      this._saveMealsNotFollowedReason(false,this.part1Reason,this.part2Reason).then(()=>{}).catch(()=>{
        this.fsCommon.dismissModal();
        this.router.navigateByUrl("/error/Error Updating meals followed/meals");
      });
    }
  }

  private _saveMealsNotFollowedReason(followed:boolean,followedReason1:string,followedReason2:string){
    return new Promise((resolve,reject)=>{
      this.dataService.saveMealsNotFollowed(this.mealElementId,followed,followedReason1,followedReason2).then( followed =>{
        this.fsCommon.dismissModalWithToast('Thanks for your feedback!',2000,'toast-config');
        resolve();
      }).catch(()=>{
        reject();
      });
    });
  }

}
