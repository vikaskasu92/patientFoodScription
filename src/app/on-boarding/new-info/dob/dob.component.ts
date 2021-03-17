import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { OnBoardingService } from '../../on-boarding.service';

@Component({
  selector: 'app-dob',
  templateUrl: './dob.component.html',
  styleUrls: ['./dob.component.scss'],
})
export class DobComponent implements OnInit {

  constructor(private navCtrl:NavController,
    private onBoardingService:OnBoardingService) { }

  disabled:boolean = true;
  today:string;

  ngOnInit() {
    this.today = new Date().toISOString().substring(0,10);
  }

  navigate(){
    this.navCtrl.navigateForward('/on-boarding/new-info/medical-conditions');
  } 

  dateChanged(event:any){
    this.onBoardingService.dob = new Date(event.detail.value.toString()).toISOString().substring(0,10);
    this.disabled = false;
  }

}
