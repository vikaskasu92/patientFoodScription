import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { IonSlides, NavController } from '@ionic/angular';
import { FoodscriptionCommonService } from '../sharedFiles/foodscription-common.service';

@Component({
  selector: 'app-message-dietitian',
  templateUrl: './message-dietitian.page.html',
  styleUrls: ['./message-dietitian.page.scss'],
})
export class MessageDietitianPage implements OnInit, AfterViewInit {

  constructor(private fsCommon:FoodscriptionCommonService,
              private navCtrl:NavController) { }
  about:boolean = false;
  specialties:boolean = false;
  location:boolean = false;
  @ViewChild('slides', { read: IonSlides }) slides: IonSlides;

  slideOpts = {
    initialSlide: 0,
    speed: 400
  };

  showDetails:boolean = true;

  ngOnInit() {}

  ngAfterViewInit():void{
    this.slides.lockSwipes(true);
  }

  segmentChanged(ev: any) {
    switch(ev.detail.value){
      case 'about':{
        this._dietitanMessageCardChange(true,false,false,0);
        break;
      }
      case 'specialties':{
        this._dietitanMessageCardChange(false,true,false,1);
        break;
      }
      case 'location':{
        this._dietitanMessageCardChange(false,false,true,2);
        break;
      }
    }
  }

  chatWithDietitian(){
    this.navCtrl.navigateForward("/convos");
  }


  private _dietitanMessageCardChange(about:boolean,specialties:boolean,location:boolean,slideIndex:number){
    this.about = about;
    this.specialties = specialties;
    this.location = location;
    this.slides.lockSwipes(false).then( () => {
      this.slides.slideTo(slideIndex, 400).then( slide => {
        this.slides.lockSwipes(true);
      });
    });
  }


}
