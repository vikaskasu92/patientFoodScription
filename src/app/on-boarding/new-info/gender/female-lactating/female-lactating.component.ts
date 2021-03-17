import { Component, OnInit } from '@angular/core';
import { ModalController, NavController } from '@ionic/angular';
import { OnBoardingService } from 'src/app/on-boarding/on-boarding.service';

@Component({
  selector: 'app-female-lactating',
  templateUrl: './female-lactating.component.html',
  styleUrls: ['./female-lactating.component.scss'],
})
export class FemaleLactatingComponent implements OnInit {

  constructor(private modelCtrl:ModalController,
              private navCtrl:NavController,
              private onBoardingService:OnBoardingService) { }

ngOnInit() {}

dismissModel(){
  this.modelCtrl.dismiss();
}

lactatingInfoChange(event:any){
  if(event.detail.value === "no"){
    this.onBoardingService.isLactating = false;
  }else{
    this.onBoardingService.isLactating = true;
    this.onBoardingService.lactationPeriod = event.detail.value;
  }
}

navigate(){
  this.dismissModel();
  this.navCtrl.navigateForward('/on-boarding/new-info/height');
}

}
