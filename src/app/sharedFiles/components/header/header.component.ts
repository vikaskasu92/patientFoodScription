import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { FoodscriptionCommonService } from '../../foodscription-common.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {

  constructor(private navCtrl:NavController,
              private fsCommon:FoodscriptionCommonService) { }

  totalItems:number = 0;

  ngOnInit() {
    this.fsCommon.cartItemUpdated.subscribe( () => {
      this.fsCommon.getCartStorageItemsLength().then( length => {
        this.totalItems = length;
      });
    });
  }

  navigateToSearch(){
    this.navCtrl.navigateForward('/search');
  }
  
  naviagateToGroceryList(){
    this.navCtrl.navigateForward('/shoppingcart');
  }

}