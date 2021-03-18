import { Component, OnInit, Renderer2, ElementRef } from '@angular/core';
import { SocialSharing } from '@ionic-native/social-sharing/ngx';
import { LoadingController} from '@ionic/angular';

import { Plugins } from '@capacitor/core';
import { AuthService } from '../auth/auth.service';
import { Router } from '@angular/router';
import { DataService } from '../sharedFiles/data.service';
import { FoodscriptionCommonService } from '../sharedFiles/foodscription-common.service';
const { Storage } = Plugins;

@Component({
  selector: 'app-grocery-list',
  templateUrl: './grocery-list.page.html',
  styleUrls: ['./grocery-list.page.scss'],
})
export class GroceryListPage implements OnInit {

  constructor(private dataService:DataService,
              private renderer:Renderer2,
              private socialSharing:SocialSharing,
              private loadCtrl: LoadingController,
              private fsCommon:FoodscriptionCommonService,
              private authService:AuthService,
              private router:Router) { }

  weekArray:any[];
  
  byCategory:boolean = true;
  currentFabButton:number = 0;
  meals:any[];
  month:string;
  noMealsAvailable:boolean = false;
  mealsAvailable:boolean = false;
  dateNotAvailable:string;
  mobile:boolean = true;
  groceryCategoryDisplay:boolean = false;
  ingredientsCategories:any[];

  options = {
    message: '',
    subject: 'Meal Plan from FoodScription'
  };

  ngOnInit() {
    this.weekArray = this.dataService.getWeekArray();
    if(this.dataService.weekAray === undefined){
      this.dataService.weekAray =  this.weekArray;
    }
    if(this.authService.appPlatform === "web"){
      this.mobile = false;
    }
  }

  ionViewWillEnter(){
    this._initialLoad();
  }

  fabButtonClicked(index:number){
    if(this.currentFabButton !== index){
      let newButton = <HTMLElement>document.querySelector("#fabButtonGL"+index);
      let oldButton = <HTMLElement>document.querySelector("#fabButtonGL"+this.currentFabButton);
      newButton.classList.add('selected-fabbutton'); 
      oldButton.classList.remove('selected-fabbutton'); 
      this.currentFabButton = index;
      this.month = this.weekArray[index].toDateString().substring(3,7);
      this.createGroceryListOnDate();
    }
  }

  copyToClipboard(meals:any){
    var el:any = document.createElement('textarea');
    el.value = this._generateClipboardContent(meals);
    el.setAttribute('readonly', '');
    el.style = {position: 'absolute', left: '-9999px'};
    document.body.appendChild(el);
    el.select();
    document.execCommand('copy');
    document.body.removeChild(el);
    this.fsCommon.generateToast("Copied to clipboard!",200,'toast-config','middle');
  }

  shareMealsOnApp(meals:any){
    this.options.message = this._generateClipboardContent(meals);
    this.socialSharing.shareWithOptions(this.options).then( () => {});
  }

  private _generateClipboardContent(meals:any){
    let clipboardText:string = "";
    for(let i=0; i<meals.length; i++){
      if(i >0){
        clipboardText +="\n";
      }
      clipboardText += "Meal Name : "+meals[i].title+" ("+meals[i].date+") \n";
      clipboardText += "Meal Ingredients : \n";
      for(let j=0; j<meals[i].ingredients.length; j++){
        let currentValue = 0;
        meals[i].ingredients[j].value.toString().includes(".") ? currentValue = meals[i].ingredients[j].value.toFixed(2): currentValue = meals[i].ingredients[j].value;
        if(currentValue !== 0){
          clipboardText += "  "+meals[i].ingredients[j].name+" : "+currentValue+" "+meals[i].ingredients[j].unit+"\n"; 
        }
      }
    }
    return clipboardText;
  }

  createGroceryListOnDate(){
    let fromDate = this.dataService.getFromDate(this.currentFabButton);
    let toDate = this.dataService.getToDate(this.currentFabButton);
    let wantedDate = this.weekArray[this.currentFabButton];
    this.loadCtrl.create({
      message:'Fetching Ingredients...',
      backdropDismiss:false
    }).then( loader => {
      loader.present();
      if(this.dataService.currentMeals !== null && this.dataService.currentMeals.length > 0){
        if(this.fsCommon.dateAvailable(this.weekArray,this.currentFabButton).length !== 0){
          let wantedMeals = this.dataService.groceryIngredients.filter( d => this.fsCommon.todaysDateFromString(d.date).toString().substring(0,15) == wantedDate.toString().substring(0,15));
          wantedMeals.length !== 0 ?  this.rendermeals(wantedMeals,loader): this._mealsNotAvailable(loader,this.fsCommon.todaysDate(this.weekArray[this.currentFabButton]));
        }else{
          this.dataService.getMeals(fromDate,toDate,"7").then( meals =>{
            this.dataService.currentMeals = meals.results.concat(this.dataService.currentMeals);
            this.dataService.generateGroceryListArray(meals.results);
            let wantedMeals = this.dataService.groceryIngredients.filter( d => this.fsCommon.todaysDateFromString(d.date).toString().substring(0,15) == wantedDate.toString().substring(0,15));
            wantedMeals.length !== 0 ?  this.rendermeals(wantedMeals,loader): this._mealsNotAvailable(loader,this.fsCommon.todaysDate(this.weekArray[this.currentFabButton]));
          }).catch(()=>{
            loader.dismiss();
            this.router.navigateByUrl("/error/Error Retrieving Grocery List/groceryList");
          });
        } 
      }else{
          this.dataService.getMeals(fromDate,toDate,"7").then( meals =>{
            this.dataService.currentMeals = meals.results;
            this.dataService.generateGroceryListArray(meals.results);
            let wantedMeals = this.dataService.groceryIngredients.filter( d => this.fsCommon.todaysDateFromString(d.date).toString().substring(0,15) == wantedDate.toString().substring(0,15));
            wantedMeals.length !== 0 ?  this.rendermeals(wantedMeals,loader): this._mealsNotAvailable(loader,this.fsCommon.todaysDate(this.weekArray[this.currentFabButton])); 
          }).catch(()=>{
            loader.dismiss();
            this.router.navigateByUrl("/error/Error Retrieving Grocery List/groceryList");
          });
      }
    });
  }

  rendermeals(meals:any,loader:HTMLIonLoadingElement){
    this.mealsAvailable = true;
    this.noMealsAvailable = false;
    this.meals = meals;
    if(this.groceryCategoryDisplay){
      this._categoriesData();
    }
    loader.dismiss();
  }

  addToCart(){
    this._addItemsToGroceryList();
  }

  doRefresh(event:any){
    this.dataService.currentMeals = null;
    this.dataService.infiniteMeals = [];
    this.dataService.groceryIngredients = [];
    this._loadDates();
    event.target.complete();
  }

  increaseQuantity(id:number){
   this.fsCommon.increaseQuantity(id,this.weekArray,this.currentFabButton,true,undefined);
  }

  increaseQuantityCat(id:number){
    this.fsCommon.increaseQuantityCat(id,this.weekArray,this.currentFabButton,true,undefined);
   }

  decreaseQuantity(id:number){
    this.fsCommon.decreaseQuantity(id,this.weekArray,this.currentFabButton,true,undefined);
  }

  decreaseQuantityCat(id:number){
    this.fsCommon.decreaseQuantityCat(id,this.weekArray,this.currentFabButton,true,undefined);
  }

  addItemToCart(id:number,name:string,value:number,unit:string){
    Storage.get({key:'fsIngredientList'}).then( storage => {
      JSON.parse(storage.value) != null ? this.fsCommon.addSingleItemToShoppingCart(id,name,value,unit,JSON.parse(storage.value)) : this.fsCommon.addSingleItemToShoppingCart(id,name,value,unit,null);
    });
  }

  chevronToggle(chevClicked:string,chevUp:ElementRef<any>,chevDown:ElementRef<any>,directionInfo:ElementRef<any>){
    if(chevClicked === 'up'){
      this.renderer.setStyle(chevUp,'display','none');
      this.renderer.setStyle(chevDown,'display','block');
      this.renderer.setStyle(directionInfo,'display','none');
    }else{
      this.renderer.setStyle(chevUp,'display','block');
      this.renderer.setStyle(chevDown,'display','none');
      this.renderer.setStyle(directionInfo,'display','block');
    }
  }

  groceryTypeToggle(event:any){
    if(event.detail.checked){
      this.groceryCategoryDisplay = false;
    }else{
      this._categoriesData();
    }
  }

  private _categoriesData(){
    let todayMeals = this.dataService.groceryIngredients.filter(meal => this.fsCommon.todaysDateFromString(meal.date).toISOString().substring(0,10) === this.fsCommon.todaysDate(this.weekArray[this.currentFabButton]));
    const tempArray =[];
    for(let i=0; i< todayMeals.length; i++){
        for(let j=0; j<todayMeals[i].ingredients.length; j++){
          tempArray.push({"id":todayMeals[i].ingredients[j].id,"amount":todayMeals[i].ingredients[j].value ,"unit":todayMeals[i].ingredients[j].unit});
        }
    }
    this.dataService.getIngredientCategories(tempArray).then( ingredientsCategories => {
      this.groceryCategoryDisplay = true;
      console.log(ingredientsCategories);
      this.ingredientsCategories = ingredientsCategories;
    });
  }

  private _loadDates(){
    let todayDate = this.weekArray.filter(d => d.toDateString() === new Date().toDateString());
    for(let i=0; i<this.weekArray.length; i++){
      if(todayDate[0] === this.weekArray[i]){
        let fabButton = <HTMLElement>document.querySelector("#fabButtonGL"+i);
        fabButton.scrollIntoView();
        setTimeout(() => {
          this.fabButtonClicked(i);
        },500);
      }
    }
  }

  private _addItemsToGroceryList(){
    let cartIngredients = [];
    Storage.get({key:'fsIngredientList'}).then( storage => {
      const shoppingCart = JSON.parse(storage.value);
      if(shoppingCart != null){
        cartIngredients = shoppingCart;
      }
      this._generateShoppingCart(cartIngredients);
    });   
  }

  private _generateShoppingCart(cartIngredients:any){
    const selectedDayIngredients = [...this.dataService.groceryIngredients].filter( ing => ing.date === this.fsCommon.todaysDate(this.weekArray[this.currentFabButton]))
    let ingredientCartList = [];
    if(cartIngredients.length !== 0){
      ingredientCartList =  this._addDataToCart(selectedDayIngredients,cartIngredients);
    }else{
      ingredientCartList =  this._addDataToCart(selectedDayIngredients,ingredientCartList);
    }
    this.fsCommon.setSCStorage(ingredientCartList,false);
  }

  private _addDataToCart(selectedDayIngredients:any,cartIngredients:any){
    let insideLoop:boolean = false;
      for(let i=0; i<selectedDayIngredients.length; i++){
        for(let j=0; j<selectedDayIngredients[i].ingredients.length; j++){
          if(selectedDayIngredients[i].ingredients[j].value !== 0){
            cartIngredients.filter( cart => {
              if(cart.name === selectedDayIngredients[i].ingredients[j].name && cart.unit === selectedDayIngredients[i].ingredients[j].unit){
                insideLoop = true;
                cart.value = cart.value + this._findCurrentValueForDecimals(selectedDayIngredients,i,j);
              }
            })
            if(!insideLoop){
               cartIngredients.push({
                'name':selectedDayIngredients[i].ingredients[j].name,
                'value':this._findCurrentValueForDecimals(selectedDayIngredients,i,j),
                'id':selectedDayIngredients[i].ingredients[j].ingredientId,
                'unit':selectedDayIngredients[i].ingredients[j].unit,
              });
            }else{
              insideLoop = false;
            }
          }
        }
      }
      return cartIngredients;
  }

  private _findCurrentValueForDecimals(selectedDayIngredients:any,i:number,j:number){
    let currentValue = 0;
    selectedDayIngredients[i].ingredients[j].value.toString().includes(".") ? currentValue = +selectedDayIngredients[i].ingredients[j].value.toFixed(2): currentValue = +selectedDayIngredients[i].ingredients[j].value;
    return currentValue;    
  }

  private _mealsNotAvailable(loader:HTMLIonLoadingElement,currentDate:string){
    this.mealsAvailable = false;
    this.noMealsAvailable = true;
    this.meals = [];
    this.dateNotAvailable = currentDate;
    loader.dismiss();
  }

  private _initialLoad(){
    this.weekArray = this.dataService.getWeekArray();
    if(this.dataService.weekAray === undefined){
      this.dataService.weekAray =  this.weekArray;
    }
    this._loadDates();
    if(this.authService.appPlatform === "web"){
      this.mobile = false;
    }
    this.fsCommon.cartItemUpdated.next();
  }

}