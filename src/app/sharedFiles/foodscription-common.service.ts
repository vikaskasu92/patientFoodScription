import { Injectable } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { Plugins } from '@capacitor/core';
const { Storage } = Plugins;
import * as Chart from 'chart.js';
import { ModalController, PopoverController, ToastController } from '@ionic/angular';
import { DataService } from './data.service';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FoodscriptionCommonService {

  constructor(private authService:AuthService,
              private popoverController:PopoverController,
              private modalCtrl:ModalController,
              private toastCtrl:ToastController,
              private dataService: DataService) { }

  chart:Chart;
  totalItems:number = 0;
  cartItemUpdated = new Subject();

  generateChart(canvasName:string,chartType:string,dataSets:any,labels:any,legendDisplay:boolean,toolTips:boolean){
    return new Chart(canvasName, {
      type: chartType,
      data: {
          labels: labels,
          datasets: dataSets
        },
        options: {
          responsive: true,
          legend: {
            display: legendDisplay,
            labels: {
              fontColor: '#009788',
              fontSize:5
            }
          },
          tooltips:{
            enabled:toolTips
          },
          title: {
            display: false
          }
        }
    });
  }
  
  openModal(componentName:any){
    this.modalCtrl.create({
      component:componentName,
      backdropDismiss:false
    }).then( modal => {
      modal.present();
    });
  }

  openModalWithProps(componentName:any,componentProps:any){
    this.modalCtrl.create({
      component:componentName,
      backdropDismiss:false,
      componentProps:componentProps
    }).then( modal => {
      modal.present();
    });
  }

  dismissModal(){
    this.modalCtrl.dismiss({
      'dismissed': true
    });
  }
 
  dismissModalWithToast(message:string,duration:number,cssClass:string){
    this.modalCtrl.dismiss().then( () => {
      this.toastCtrl.create({
        message:message,
        duration:duration,
        cssClass:cssClass
      }).then( toast => {
        toast.present();
      });
    });
  }

  generateToast(message:string,duration:number,cssClass:string,position:any){
    this.toastCtrl.create({
      message:message,
      duration:duration,
      cssClass:cssClass,
      position:position
    }).then( toast =>{
      toast.present();
    });
  }

  generatePopover(component:any,mealElement:any){
    this.popoverController.create({
      component: component,
      translucent: true,
      backdropDismiss: true,
      componentProps:{recipe:mealElement},
    }).then( popOver => {
      popOver.present();
    });
  }

  addFabButtonColor(currentFabButton:number,index:number,fromCustomChange:boolean){
      let newButton = <HTMLElement>document.querySelector("#fabButton"+index);
      let oldButton = <HTMLElement>document.querySelector("#fabButton"+currentFabButton);
      newButton.classList.add('selected-fabbutton'); 
      if(!fromCustomChange){
        oldButton.classList.remove('selected-fabbutton');
      }
  }

  dateAvailable(weekArray:any[],currentFabButton):any[]{
    return this.dataService.currentMeals.filter(meals => new Date(meals.date).toISOString().substring(0,10) === this.todaysDate(weekArray[currentFabButton]));
  }

  fetchFromMealsAvailable(meals:any,fromDate:string,loader:HTMLIonLoadingElement){
    if(new Date(this.dataService.currentMeals[0].date).toISOString().substring(0,10) > new Date(fromDate).toISOString().substring(0,10)){
      this.dataService.currentMeals = meals.results.concat(this.dataService.currentMeals);
    }else{
      this.dataService.currentMeals = this.dataService.currentMeals.concat(meals.results);
    }
  }

  todaysDate(value:Date){
    let month = new Date(value).getMonth() +1;
    let day = new Date(value).getDate();
    let year = new Date(value).getFullYear();
    return new Date(month+"/"+day+"/"+year).toISOString().substring(0,10);
  }

  todaysDateFromString(value:string){
    let dateArray = value.split("-");
    return new Date(dateArray[1]+"/"+dateArray[2]+"/"+dateArray[0]);
  }

  increaseQuantity(id:number,weekArray:any,currentFabButton:number,fromGroceryList:boolean,shoppingCart:any){
    let currentWholeValue = null;
    shoppingCart !== undefined ? currentWholeValue = <HTMLIonTextareaElement>document.querySelector("#textAreaValueSC"+id) : currentWholeValue = <HTMLIonTextareaElement>document.querySelector("#textAreaValue"+id);
    this._increaseQuantity(currentWholeValue,id,weekArray,currentFabButton,fromGroceryList,shoppingCart,false);
  }

  increaseQuantityCat(id:number,weekArray:any,currentFabButton:number,fromGroceryList:boolean,shoppingCart:any){
    let currentWholeValue = null;
    shoppingCart !== undefined ? currentWholeValue = <HTMLIonTextareaElement>document.querySelector("#textAreaValueSC"+id) : currentWholeValue = <HTMLIonTextareaElement>document.querySelector("#textAreaValueCat"+id);
    this._increaseQuantity(currentWholeValue,id,weekArray,currentFabButton,fromGroceryList,shoppingCart,true);
  }

  decreaseQuantity(id:number,weekArray:any,currentFabButton:number,fromGroceryList:boolean,shoppingCart:any){
    let currentWholeValue = null;
    shoppingCart !== undefined ? currentWholeValue = <HTMLIonTextareaElement>document.querySelector("#textAreaValueSC"+id) : currentWholeValue = <HTMLIonTextareaElement>document.querySelector("#textAreaValue"+id);
    this._decreaseQuantity(currentWholeValue,id,weekArray,currentFabButton,fromGroceryList,shoppingCart,false);
  }

  decreaseQuantityCat(id:number,weekArray:any,currentFabButton:number,fromGroceryList:boolean,shoppingCart:any){
    let currentWholeValue = null;
    shoppingCart !== undefined ? currentWholeValue = <HTMLIonTextareaElement>document.querySelector("#textAreaValueSC"+id) : currentWholeValue = <HTMLIonTextareaElement>document.querySelector("#textAreaValueCat"+id);
    this._decreaseQuantity(currentWholeValue,id,weekArray,currentFabButton,fromGroceryList,shoppingCart,true);
  }

  addSingleItemToShoppingCart(id:number,name:string,currentValue:number,unit:string,shoppingCart:any){
    const tempObj = {
      "name":name,
      "value":currentValue,
      "id":id,
      "unit":unit
    }
    if(shoppingCart != null){
      const tempIngredients:any[] = shoppingCart;
      let elementFound:boolean = false;
      for(let i=0; i<tempIngredients.length; i++){
        if(tempIngredients[i].id === id){
          elementFound = true;
          tempIngredients[i].value = tempIngredients[i].value + currentValue;
          if(currentValue <=0){
            tempIngredients[i].value = 0;
          }
          this.setSCStorage(tempIngredients,false);
          break;
        }
      }
      if(!elementFound){
        tempIngredients.push(tempObj);
        this.setSCStorage(tempIngredients,false);
      }
    }else{
      this.setSCStorage([tempObj],false);
    }
  }

  private _roundFigureValue(value:any,unit:string){
    if(Math.round(value*2)/2 === 0){
      if(unit === "oz" || unit === "g" || unit ==="fl oz" || unit === "ml"){
        return value.toFixed(2).toString();
      }
      return 0;
    }
    return Math.round(value*2)/2;
  }

  setSCStorage(shoppingCart:any,fromShoppingCart:boolean){
    Storage.set({
      key:'fsIngredientList',
      value:JSON.stringify(shoppingCart)
    }).then( () =>{
      this.cartItemUpdated.next();
      if(!fromShoppingCart){
        this.generateToast("Successfully Added to Cart",200,'toast-config','middle');
      }
    })
  }

  addMealIngredientsToCart(mealElement:any){
    Storage.get({key:'fsIngredientList'}).then( storage => {
      let tempIngredientsArray = JSON.parse(storage.value); 
      if(tempIngredientsArray != null){
        for(let i=0; i<mealElement.recipe.extendedIngredients.length; i++){
          let mealElementIngredientFound:boolean = false;
          for(let j=0; j<tempIngredientsArray.length; j++){
            if(mealElement.recipe.extendedIngredients[i].id === tempIngredientsArray[j].id && mealElement.recipe.extendedIngredients[i].unit === tempIngredientsArray[j].unit){
              tempIngredientsArray[j].value = +tempIngredientsArray[j].value + (+mealElement.recipe.extendedIngredients[i].amount * +mealElement.recipe.servings);
              mealElementIngredientFound = true;
            }
          }
          if(!mealElementIngredientFound){
            tempIngredientsArray = this._pushTempIngredients(tempIngredientsArray,mealElement,i);
          }
        }
        this.setSCStorage(tempIngredientsArray,false);
      }else{
        tempIngredientsArray = [];
        for(let i=0; i<mealElement.recipe.extendedIngredients.length; i++){
          tempIngredientsArray = this._pushTempIngredients(tempIngredientsArray,mealElement,i);
        }
        this.setSCStorage(tempIngredientsArray,false);
      }
    });
  }

  getCartStorageItemsLength():Promise<number>{
    return Storage.get({ key: 'fsIngredientList' }).then(storage => {
      if (JSON.parse(storage.value) != null) {
        return JSON.parse(storage.value).length;
      } else {
        return 0;
      }
    });
  }

  private _increaseQuantity(currentWholeValue:any,id:number,weekArray:any,currentFabButton:number,fromGroceryList:boolean,shoppingCart:any,cat:boolean){
    let currentValueArray = currentWholeValue.value.trim().split(" ");
    let currentValue = this._alterQuantityUp(currentValueArray,currentWholeValue,id,weekArray,currentFabButton,fromGroceryList,shoppingCart);
    cat ? this._checkEnableCatIngredient(currentValue,id):this._checkEnableIngredient(currentValue,id);
    this._updateFinalIngredientQuantity(currentValueArray,currentWholeValue,currentValue);
  }

  private _decreaseQuantity(currentWholeValue:any,id:number,weekArray:any,currentFabButton:number,fromGroceryList:boolean,shoppingCart:any,cat:boolean){
    let currentValueArray = currentWholeValue.value.trim().split(" ");
    let currentValue = this._alterQuantityDown(currentValueArray,currentWholeValue,id,weekArray,currentFabButton,fromGroceryList,shoppingCart);
    if(cat){
      this._checkDisableIngredientCat(currentValue,id) === true ? currentValue = 0 : currentValue = currentValue;
    }else{
      this._checkDisableIngredient(currentValue,id) === true ? currentValue = 0 : currentValue = currentValue;
    }
    
    this._updateFinalIngredientQuantity(currentValueArray,currentWholeValue,currentValue);
  }

  private _pushTempIngredients(tempIngredientsArray:any,mealElement:any,i:number){
    tempIngredientsArray.push({
      "name":mealElement.recipe.extendedIngredients[i].ingredient,
      "value":mealElement.recipe.extendedIngredients[i].amount * mealElement.recipe.servings,
      "id": mealElement.recipe.extendedIngredients[i].id,
      "unit":mealElement.recipe.extendedIngredients[i].unit 
    });
    return tempIngredientsArray;
  }

  private _alterQuantityUp(currentValueArray:any,currentWholeValue:any,id:number,weekArray:any,currentFabButton:number,fromGroceryList:boolean,shoppingCart:any){
    let currentValue = +currentValueArray[0];
    if(fromGroceryList){
      return this._addSubGLCurrentValue('add',currentWholeValue,currentValue,id,weekArray,currentFabButton);
    }
    return this._addSubSCCurrentValue('add',currentWholeValue,currentValue,id,shoppingCart);
  }

  private _checkEnableIngredient(currentValue:number,id:number){
    if(currentValue > 0){
      let ingredientElement = <HTMLElement>document.querySelector("#ingredientName"+id);
      let buttonSubElement = <HTMLElement>document.querySelector("#buttonSub"+id);
      buttonSubElement.setAttribute("disabled","false");
      ingredientElement.style.textDecoration = "none";
    }
  }

  private _checkEnableCatIngredient(currentValue:number,id:number){
    if(currentValue > 0){
      let ingredientElement = <HTMLElement>document.querySelector("#ingredientNameCat"+id);
      let buttonSubElement = <HTMLElement>document.querySelector("#buttonSubCat"+id);
      buttonSubElement.setAttribute("disabled","false");
      ingredientElement.style.textDecoration = "none";
    }
  }

  private _alterQuantityDown(currentValueArray:any,currentWholeValue:any,id:number,weekArray:any,currentFabButton:number,fromGroceryList:boolean,shoppingCart:any){
    let currentValue = +currentValueArray[0];
    if(fromGroceryList){
      return this._addSubGLCurrentValue('sub',currentWholeValue,currentValue,id,weekArray,currentFabButton);
    }
    return this._addSubSCCurrentValue('sub',currentWholeValue,currentValue,id,shoppingCart);
  }

  private _checkDisableIngredient(currentValue:number,id:number){
    if(currentValue <= 0){
     let ingredientElement = <HTMLElement>document.querySelector("#ingredientName"+id);
     let buttonSubElement = <HTMLElement>document.querySelector("#buttonSub"+id);
     buttonSubElement.setAttribute("disabled","true");
     ingredientElement.style.textDecoration = "line-through";
     return true
    }
    return false
  }

  private _checkDisableIngredientCat(currentValue:number,id:number){
    if(currentValue <= 0){
     let ingredientElement = <HTMLElement>document.querySelector("#ingredientNameCat"+id);
     let buttonSubElement = <HTMLElement>document.querySelector("#buttonSubCat"+id);
     buttonSubElement.setAttribute("disabled","true");
     ingredientElement.style.textDecoration = "line-through";
     return true
    }
    return false
  }

  private _updateFinalIngredientQuantity(currentValueArray:any,currentWholeValue:any,currentValue:number){
    currentValueArray[0] = currentValue.toString();
    let finalValue = currentValueArray.join(" ");
    currentWholeValue.value = finalValue;
  }

  private _addSubGLCurrentValue(calculation:string,currentWholeValue:any,currentValue:any,id:number,weekArray:any,currentFabButton:number){
    if(currentWholeValue.value.trim().split(" ")[1] === "milliliter" || currentWholeValue.value.trim().split(" ")[1] === "ml"){
      calculation === "add" ? currentValue = currentValue + 50 : currentValue = currentValue - 50;
    }else if(currentWholeValue.value.trim().split(" ")[1] === "tsp" || currentWholeValue.value.trim().split(" ")[1] === "tsp," || currentWholeValue.value.trim().split(" ")[1] === "tbsp" || currentWholeValue.value.trim().split(" ")[1] === "cup" || currentWholeValue.value.trim().split(" ")[1] === "cup," || currentWholeValue.value.trim().split(" ")[1] === "lb" || currentWholeValue.value.trim().split(" ")[1] === "tablespoon"){
      calculation === "add" ? currentValue = currentValue + 0.5 : currentValue = currentValue - 0.5;
    }else{
      calculation === "add" ? currentValue = currentValue + 1 : currentValue = currentValue - 1;
    }
    currentValue < 0 ?  currentValue = 0 :  currentValue = currentValue;
    this._updateGroceryList(id,currentValue,weekArray,currentFabButton);
    return currentValue;
  }

  private _addSubSCCurrentValue(calculation:string,currentWholeValue:any,currentValue:any,id:number,shoppingCart:any){
    if(currentWholeValue.value.trim().split(" ")[1] === "milliliter" || currentWholeValue.value.trim().split(" ")[1] === "ml"){
      calculation === "add" ? currentValue = currentValue + 50 : currentValue = currentValue - 50;
    }else if(currentWholeValue.value.trim().split(" ")[1] === "tsp" || currentWholeValue.value.trim().split(" ")[1] === "tsp," || currentWholeValue.value.trim().split(" ")[1] === "tbsp" || currentWholeValue.value.trim().split(" ")[1] === "cup" || currentWholeValue.value.trim().split(" ")[1] === "cup," || currentWholeValue.value.trim().split(" ")[1] === "lb"  || currentWholeValue.value.trim().split(" ")[1] === "tablespoon"){
      calculation === "add" ? currentValue = currentValue + 0.5 : currentValue = currentValue - 0.5;
    }else{
      calculation === "add" ? currentValue = currentValue + 1 : currentValue = currentValue - 1;
    }
    currentValue < 0 ?  currentValue = 0 :  currentValue = currentValue;
    this._updateShoppingCart(id,currentValue,shoppingCart);
    return currentValue;
  }

  private _updateGroceryList(id:number,currentValue:number,weekArray:any,currentFabButton:number){
    const tempIngredients = [...this.dataService.groceryIngredients];
    for(let i=0; i<tempIngredients.length; i++){
      if(tempIngredients[i].date === this.todaysDate(weekArray[currentFabButton])){
        for(let j=0; j<tempIngredients[i].ingredients.length; j++){
            if(tempIngredients[i].ingredients[j].ingredientId === id){
              tempIngredients[i].ingredients[j].value = currentValue;
              if(currentValue <=0){
                tempIngredients[i].ingredients[j].checked = false;
              }else{
                tempIngredients[i].ingredients[j].checked = true;
              }
              this.dataService.groceryIngredients = tempIngredients;
              break;
            }
        }
      }
    }
  }

  private _updateShoppingCart(id:number,currentValue:number,shoppingCart:any){
    const tempIngredients = shoppingCart;
    for(let i=0; i<tempIngredients.length; i++){
      if(tempIngredients[i].id === id){
        tempIngredients[i].value = currentValue;
        if(currentValue <=0){
          tempIngredients[i].value = 0;
        }
        this.setSCStorage(shoppingCart,true);
        break;
      }
    }
  }

}
