import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { OnBoardingService } from '../../on-boarding.service';

@Component({
  selector: 'app-alergies',
  templateUrl: './alergies.component.html',
  styleUrls: ['./alergies.component.scss'],
})
export class AlergiesComponent implements OnInit {

  constructor(private navCtrl:NavController,
    private onBoardingService:OnBoardingService) { }

  currentAllergies:string[] = [];

  ngOnInit() {
    this.currentAllergies = this.onBoardingService.allergies;
  }

  checkBoxSelectionChanged(allergy:string){
    if(this.currentAllergies.indexOf(allergy) === -1){
      this.currentAllergies.push(allergy);
    }else{
      this.currentAllergies.splice(this.currentAllergies.indexOf(allergy),1);
    }
    this.onBoardingService.allergies = this.currentAllergies;
  }

  navigate(){
    this.navCtrl.navigateForward('/on-boarding/new-info/routine');
  }

}
