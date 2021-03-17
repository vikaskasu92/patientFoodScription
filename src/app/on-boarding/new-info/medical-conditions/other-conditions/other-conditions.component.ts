import { Component, OnInit } from '@angular/core';
import { ModalController, NavController } from '@ionic/angular';
import { OnBoardingService } from 'src/app/on-boarding/on-boarding.service';
import { DataService } from 'src/app/sharedFiles/data.service';

@Component({
  selector: 'app-other-conditions',
  templateUrl: './other-conditions.component.html',
  styleUrls: ['./other-conditions.component.scss'],
})
export class OtherConditionsComponent implements OnInit {

  constructor(private modelCtrl:ModalController,
              private navCtrl:NavController,
              private dataService:DataService,
              private onBoardingService:OnBoardingService) { }

  searchResults:string[];
  savedResults:string[];
  resultsAvailable:boolean = true;

  ngOnInit() {
    this.savedResults = [];
    this.searchResults = [];
  }

  dismissModel(){
    this.modelCtrl.dismiss();
  }

  cancelSearch(event:any){
    if (event.cancelable) {
      event.preventDefault();
      this.navCtrl.back();
     }
  }

  removeMedicalCondition(savedResult:any){
    let searchedResult = <any>document.querySelector("#"+this._removeSpecialCharacters(savedResult));
    if(searchedResult === null){
      this.savedResults.splice(savedResult,1);
      this.onBoardingService.medicalConditions.splice(this.onBoardingService.medicalConditions.indexOf(savedResult),1);
    }else{
      searchedResult.click();
    }
  }
  
  searchMedicalCondition(event:any){
    if(event.detail.value.length > 0){
      this.dataService.searchMedialConditions(event.detail.value).subscribe( searchResults => {
        if(searchResults.length > 0){
          this.searchResults = searchResults;
          this.resultsAvailable = true;
        }else{
          this.searchResults = [];
          this.resultsAvailable = false;
        }
      });
    }else{
      this.searchResults = [];
    }
   
  }

  searchResultChange(event:any,disease:string){
    if(event.detail.checked){
      if(this.onBoardingService.medicalConditions.indexOf(disease) === -1){
        this.onBoardingService.medicalConditions.push(disease);
        this.savedResults.push(disease);
      }
    }else{
      this.onBoardingService.medicalConditions.splice(this.onBoardingService.medicalConditions.indexOf(disease),1);
       this.savedResults.splice(this.savedResults.indexOf(disease),1);
    }
  }

  private _removeSpecialCharacters(value:any){
    let spacesRemoved = value.replaceAll(" ","");
    let forwardSlashesRemoved = spacesRemoved.replaceAll("/","");
    let bracketOpenRemoved = forwardSlashesRemoved.replaceAll("(","");
    let bracketCloseRemoved = bracketOpenRemoved.replaceAll(")","");
    return bracketCloseRemoved;
  }

}
