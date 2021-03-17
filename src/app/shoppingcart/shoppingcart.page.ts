import { Component, OnInit } from '@angular/core';

import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Plugins } from '@capacitor/core';
import { ActionSheetController, LoadingController } from '@ionic/angular';
import { Router } from '@angular/router';
import { FoodscriptionCommonService } from '../sharedFiles/foodscription-common.service';
const { Storage } = Plugins;

@Component({
  selector: 'app-shoppingcart',
  templateUrl: './shoppingcart.page.html',
  styleUrls: ['./shoppingcart.page.scss'],
})
export class ShoppingcartPage implements OnInit {

  constructor(private http:HttpClient,
              private loadCtrl:LoadingController,
              private fsCommon: FoodscriptionCommonService,
              private router:Router,
              private actionSheetController: ActionSheetController) { }

  shoppingCart:any[] = [];
  totalItems:number = 0;

  ngOnInit() { 
   this._intialLoad();
  }

  ionViewWillEnter(){
    this._intialLoad();
  }

  remove(id:number){
    let i=0;
    this.shoppingCart.filter( cart => {
      if(cart.id === id){
        this.shoppingCart.splice(i,1);
        this.fsCommon.setSCStorage(this.shoppingCart,true);
      }
      i++
    });
    this.totalItems = this.shoppingCart.length;
    this.fsCommon.totalItems = this.totalItems;
  }

  increaseQuantity(id:number){
    this.fsCommon.increaseQuantity(id,undefined,undefined,false,this.shoppingCart);
  }

  decreaseQuantity(id:number){
    this.fsCommon.decreaseQuantity(id,undefined,undefined,false,this.shoppingCart);
    let currentModifiedValue = <any>document.querySelector("#textAreaValueSC"+id);
    if(+currentModifiedValue.value.split(" ")[0] === 0){
      this.remove(id);
      let ingredientName = <any>document.querySelector("#ingredientName"+id);
      this.fsCommon.generateToast(ingredientName.textContent+" is removed from cart",500,'toast-config','middle');
    }
  }

  emptyCart(event:any){
    event.preventDefault();
    this.actionSheetController.create({
      header:'Are you sure?',
      backdropDismiss:false,
      buttons: [{
        text: 'Empty Cart',
        role: 'destructive',
        icon: 'trash',
        handler: () => {
          Storage.remove({key:'fsIngredientList'}).then(() => {
            this._intialLoad();
          });
        }
      }, {
        text: 'Cancel',
        icon: 'close',
        role: 'cancel',
        handler: () => {
        }
      }]
    }).then( actionSheet => {
      actionSheet.present();
    })
  }
  
  instacart(){
    this.loadCtrl.create({
      message:'Navigating to Instacart...',
      backdropDismiss:false
    }).then( modal =>{
      modal.present();
      const instacartIngredients = [];
      for(let i=0; i<this.shoppingCart.length; i++){
        instacartIngredients.push(this.shoppingCart[i].name.toString());
      }
      const instacartQuantities = [];
      for(let i=0; i<this.shoppingCart.length; i++){
        instacartQuantities.push(this.shoppingCart[i].value.toString()+this.shoppingCart[i].unit.toString());
      }
      const instacartObject = {
        "ingredients":instacartIngredients,
        "quantities":instacartQuantities
      }
      this.http.post<any>("https://nclo0gjuy4.execute-api.us-east-1.amazonaws.com/Prod/navigatetoinstacart",instacartObject,{
        headers: new HttpHeaders().set("Content-Type","application/json")
      }).subscribe( res =>{
        location.href = res.url;
        modal.dismiss();
        this.fsCommon.generateToast("Redirecting to Instacart",3000,'toast-config',"middle");
      },error =>{
        modal.dismiss();
        this.router.navigateByUrl("/error/Error Connecting to Instacart/shoppingCart");
      });
    })
   
  }

  private _intialLoad(){
    this.loadCtrl.create({
      message:'Loading Cart...'
    }).then( modal => {
      modal.present();
      this._getStorage(modal);
      this.fsCommon.cartItemUpdated.next();
    });
  }

  private _getStorage(modal:HTMLIonLoadingElement){
    Storage.get({key:'fsIngredientList'}).then( storage => {
      if(JSON.parse(storage.value) != null){
        this.shoppingCart = JSON.parse(storage.value);
        this.totalItems = this.shoppingCart.length;
        this.fsCommon.totalItems = this.totalItems;
      }else{
        this.shoppingCart = [];
        this.totalItems = 0;
        this.fsCommon.totalItems = this.totalItems;
      }
      modal.dismiss();
    });
  }

  /*amazonFresh(){
    const amazonFreshIngredients = [];
    for(let i=0; i<this.shoppingCart.length; i++){
      amazonFreshIngredients.push({
        "name": this.shoppingCart[i].ingredientName,
        "quantityList": [
          {
            "unit": "KILOGRAMS",
            "amount": +this.shoppingCart[i].ingredientQuantity
          }
        ]
      });
    }
    const amazonFreshObject = {
      "ingredients":amazonFreshIngredients
    }
    this.http.post<any>("http://localhost:8080/amazonFreshCart",amazonFreshObject).subscribe( res => {
      console.log(res);
    },err => {
      console.log("error has occured ", err);
    });

  }*/


  /*if(this.route.snapshot.queryParams.code !== undefined){
    this.addToKrogerCart(this.route.snapshot.queryParams.code);
  }*/
  /*kroger(){
    let redirect_uri = "http://localhost:4200/shoppingcart"
    if(this.authService.appPlatform === "ios"){
      redirect_uri = "capacitor://com.phrql.foodscription"
    }
    const scope = encodeURIComponent('cart.basic:rw');
    // Build authorization URL
    const url =
        // Base URL (https://api.kroger.com/v1/connect/oauth2)
        `https://api.kroger.com/v1/connect/oauth2/authorize?` +
        // ClientId (specified in .env file)
        `client_id=${encodeURIComponent('foodscription-53a046600ba978de602e9b008df267492424917994410891800')}` +
        // Pre-configured redirect URL (http://localhost:3000/callback)
        `&redirect_uri=${encodeURIComponent(redirect_uri)}` +
        // Grant type
        `&response_type=code` +
        // Scope specified above
        `&scope=${encodeURIComponent('cart.basic:write')}`;
    location.href = url;
  }

  addToKrogerCart(code:string){
    this.http.get<any>("http://localhost:8080/getKrogerToken?authCode="+code+"&platform=web",{}).subscribe(res => {
      console.log(res);
      this.http.get<any>("http://localhost:8080/getUserCart?token="+res.access_token).subscribe(res => {
        console.log(res);
      })
    });
  }*/

  

}