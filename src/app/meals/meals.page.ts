import { Component, OnInit, ElementRef, Renderer2, ViewChild, AfterViewInit } from '@angular/core';
import { NavController, LoadingController, IonInfiniteScroll, IonSlides } from '@ionic/angular';
import { NotFollwedPage } from './not-follwed/not-follwed.page';
import { Router } from '@angular/router';
import { MoreInfoComponent } from './more-info/more-info.component';
import { NewPhotoComponent } from './new-photo/new-photo.component';
import { FpService } from '../home/fps.service';
import { DataService } from '../sharedFiles/data.service';
import { FoodscriptionCommonService } from '../sharedFiles/foodscription-common.service';

@Component({
  selector: 'app-meals',
  templateUrl: './meals.page.html',
  styleUrls: ['./meals.page.scss'],
})
export class MealsPage implements OnInit, AfterViewInit {

  constructor (private dataService:DataService, 
              private render: Renderer2, 
              private navCtrl:NavController,
              private loadCtrl:LoadingController,
              private fsCommon:FoodscriptionCommonService,
              private router:Router,
              private fpService: FpService){}

  weekArray:any[];
  meals;
  month:string;
  dateNotAvailable:string;
  currentFabButton:number = 0;
  customDate:boolean = false;
  customFromDate:string = "";
  customToDate:string = "";
  mealsAvailable:boolean = false;
  carbs:number = 0;
  protein:number = 0;
  fat:number = 0;
  totalCalories:number = 0;
  mealsNotLoading:boolean = false;
  customDateRangeMeals:boolean = false;
  infiniteMealsListArray:any[] = [];
  nextUrlForInfinityList:string;
  toggleHighLevelMoreInfo:boolean = false;
  highLevelChevronMoreInfoShown:boolean = false;
  highLevelSeeMoreInfoShown:boolean = false;
  mealsNotAvailable:boolean = false;
  disabledToDate:boolean = true;
  minToDate:string;
  @ViewChild(IonInfiniteScroll) infiniteScroll: IonInfiniteScroll;
  @ViewChild('slides', { read: IonSlides }) ionSlides: IonSlides; 
  @ViewChild('mealFollowMeter',{static:false}) mealFollowMeter: ElementRef<any>;

  slideOpts = {
    initialSlide: 0,
    speed: 400,
    spaceBetween:5,
  };

  ngOnInit() {
    this.weekArray = this.dataService.generateWeekArray();
    if(this.dataService.weekAray === undefined){
      this.dataService.weekAray = this.weekArray;
    }
    
  }

  ngAfterViewInit(): void {
    let deg = 0;
    let value = 70;
    deg = (value * 180) / 100;
    this.render.setStyle(this.mealFollowMeter.nativeElement, 'transform', `rotate(${ deg }deg)`);
    this.render.setStyle(this.mealFollowMeter.nativeElement, '-ms-transform', `rotate(${ deg }deg)`);
    this.render.setStyle(this.mealFollowMeter.nativeElement, '-moz-transform', `rotate(${ deg }deg)`);
    this.render.setStyle(this.mealFollowMeter.nativeElement, '-o-transform', `rotate(${ deg }deg)`);
    this.render.setStyle(this.mealFollowMeter.nativeElement, '-webkit-transform', `rotate(${ deg }deg)`);
  }

  ionViewDidEnter(){
    this.fsCommon.cartItemUpdated.next();
    let toggleEl = <HTMLElement>document.querySelector("#customDateToggle");
    if(toggleEl.getAttribute("aria-checked") === "true"){
      this.mealsAvailable = false;
      this.mealsNotAvailable = false;
    }else{
      this._loadDates(false);
    }
  }

  navigateToDashboard(){
    this.router.navigateByUrl("/tabs/dashboard");
  }

  slideChanged( meal:any){
    this.ionSlides.getActiveIndex().then( slideNumber =>{
      if(slideNumber === 0){
        let firstSlide = <HTMLElement>document.querySelector("#mealSlide"+meal.mealElements[0].id);
        firstSlide.style.maxWidth = "99%";
      }else{
        let currentSlide = <HTMLElement>document.querySelector("#mealSlide"+meal.mealElements[slideNumber].id);
        currentSlide.style.maxWidth = "99%";
        let firstSlide = <HTMLElement>document.querySelector("#mealSlide"+meal.mealElements[slideNumber-1].id);
        firstSlide.style.maxWidth = "100%";
      }
      let mealImage = <HTMLElement>document.querySelector("#mealImage"+meal.mealElements[slideNumber].id);
      this.ionSlides.getPreviousIndex().then( previousSlideNumber =>{
        let mealDataToggle = <HTMLElement>document.querySelector("#toggleMealInfo"+meal.mealElements[previousSlideNumber].id);
        let ratingInfoToggle = <HTMLElement>document.querySelector("#ratingInfoToggle"+meal.mealElements[previousSlideNumber].id);
        let mealNutrients = <HTMLElement>document.querySelector("#mealNutrients"+meal.mealElements[previousSlideNumber].id);
        let nutrientText = <HTMLElement>document.querySelector("#nutrientText"+meal.mealElements[previousSlideNumber].id);
        let nutrientHide = <HTMLElement>document.querySelector("#nutrientHide"+meal.mealElements[previousSlideNumber].id);
        if(mealDataToggle.style.display === "inline-block"){
          mealImage.scrollIntoView();
        }
        mealNutrients.style.display === "inline-block" ? mealNutrients.style.display = "none" : mealNutrients.style.display = "none";
        nutrientText.style.display === "none" ? nutrientText.style.display = "inline-block" : nutrientText.style.display = "inline-block";
        nutrientHide.style.display === "inline-block" ? nutrientHide.style.display = "none" : nutrientHide.style.display = "none";
        mealDataToggle.style.display === "inline-block" ? mealDataToggle.style.display = "none" : mealDataToggle.style.display = "none";
        ratingInfoToggle.style.display === "inline-block" ? ratingInfoToggle.style.display = "none" : ratingInfoToggle.style.display = "none";
      });
    });
    
  }

  openCamera(mealElementId:number){
    this.fsCommon.openModalWithProps(NewPhotoComponent,{mealElementId:mealElementId});
  }

  addMealIngredientsToCart(mealElement:any){
    this.fsCommon.addMealIngredientsToCart(mealElement);
  }

  followedPlan(followed:string,mealElementId:number,launchFollowed:any){
    if(launchFollowed){
      this._followedMeals(followed,mealElementId,2);
    }else if(launchFollowed === false){
      this._followedMeals(followed,mealElementId,1);
    }else{
      this._followedMeals(followed,mealElementId,3);
    }
  }

  highLevelMoreInfo(){
    this.toggleHighLevelMoreInfo = !this.toggleHighLevelMoreInfo;
    this.highLevelChevronMoreInfoShown = !this.highLevelChevronMoreInfoShown;
    this.highLevelSeeMoreInfoShown = !this.highLevelSeeMoreInfoShown;
  }

  rated(rated:string,id:number,ratingValue:any){
    if(ratingValue === 5){
        this._ratedMeals(rated,id,1);
    }else if(ratingValue === 1){
      this._ratedMeals(rated,id,2);
    }else{
      this._ratedMeals(rated,id,3);
    }  
  }

  navigateToSearch(){
    this.navCtrl.navigateForward('/search');
  }

  fabButtonClicked(index:number,fromCustomDate:boolean){
    this.mealsNotLoading = false;
    if(this.currentFabButton !== index || fromCustomDate){
      this.fsCommon.addFabButtonColor(this.currentFabButton,index,fromCustomDate);
      this.currentFabButton = index;
      this.month = this.weekArray[index].toDateString().substring(3,7);
    }
    let fromDate = this.dataService.getFromDate(this.currentFabButton);
    let toDate = this.dataService.getToDate(this.currentFabButton);
    this.loadCtrl.create({
      message:'Fetching Meals...',
      backdropDismiss:false
    }).then( loader => {
      loader.present();
      if(this.dataService.currentMeals !== null && this.dataService.currentMeals.length > 0){
        if(this.fsCommon.dateAvailable(this.weekArray,this.currentFabButton).length !== 0){
          this.rendermeals(this.fsCommon.dateAvailable(this.weekArray,this.currentFabButton),loader);
        }else{
          this.dataService.getMeals(fromDate,toDate,"7").then( meals =>{
            this._fetchFromMealsAvailable(meals,fromDate,loader);
            this.dataService.generateGroceryListArray(meals.results);
          }).catch( (e) => {
            loader.dismiss();
            this.router.navigateByUrl("/error/Error Fetching Meals/meals");
          });
        }
      }else{
          this.dataService.getMeals(fromDate,toDate,"7").then( meals =>{
            this.dataService.currentMeals = meals.results;
            this._getMealsAvailability(loader);
            this.dataService.generateGroceryListArray(meals.results);
          }).catch( (e) => {
            loader.dismiss();
            this.router.navigateByUrl("/error/Error Fetching Meals/meals");
          });
      }
    });
  }

  rendermeals(meals:any,loader:HTMLIonLoadingElement){
    this.mealsAvailable = true;
    this.mealsNotAvailable = false;
    this.mealsNotLoading = true;
    this.meals = meals[0].meals;
    this._updateHighLevelNutirnets(meals[0].meals);
    loader.dismiss();
    setTimeout(()=>{
      const labels = ['carbs','protein','fat'];
      const datasets =  [{ 
        data: [+((this.carbs /(this.totalCalories/4))*100).toFixed(0), +((this.protein /(this.totalCalories/4))*100).toFixed(0), +((this.fat /(this.totalCalories/9))*100).toFixed(0)],
        backgroundColor: ['#A977C0','#FF7760','#FCBE5B'],
        fill: true
      }];
      this.fsCommon.generateChart("overallMealDayPieChart",'doughnut',datasets,labels,false,false);
    },0);
  }

  customDateToggle(event:any){
    this.infiniteMealsListArray = [];
    this.dataService.infiniteMealList.next([]);
    this.dataService.infiniteMeals = [];
    if(event.detail.checked){
      this.customDate = true;
      this.customDateRangeMeals = true;
      this.mealsAvailable = false;
      this.mealsNotAvailable = false;
    }else{
      this.customDate = false;
      this.customDateRangeMeals = false;
      this.customToDate = "";
      this.customToDate = "";
      this.dataService.currentMeals = null;
      setTimeout(()=>{
        this._loadDates(true);
      },0);
    }
  }

  customDateChanged(dateSelected:String,event:any){
    if(dateSelected === "from"){
      this.customFromDate = this.fsCommon.todaysDate(new Date(event.detail.value));
      this.minToDate = this.customFromDate;
      this.customToDate = "";
      this.disabledToDate = false;
    }else{
      this.customToDate = this.fsCommon.todaysDate(new Date(event.detail.value));
    }
    this.infiniteMealsListArray = [];
    this.dataService.infiniteMealList.next([]);
    this.dataService.infiniteMeals = [];
    if(this.customToDate !== "" && this.customFromDate !== ""){
        this._fetchFirstInfiniteMeals();
    }
  }

  doInfinite(event:any) {
    this._fetchNextInfiniteMeals(event);
  }

  nutrientsToggle(textShown:string,nutrientsDiv:ElementRef<any>,nutrientsTextEl:ElementRef<any>,hideTextEl:ElementRef<any>,mealElementId:number,currentMealElement:any){
    if(textShown === "nutrients"){
      this.render.setStyle(nutrientsDiv,'display','block');
      this.render.setStyle(nutrientsTextEl,'display','none');
      this.render.setStyle(hideTextEl,'display','block');
      const labels = ['Carbs','Protein','Fat'];
      const datasets =  [{ 
        data: [currentMealElement.recipe.carbs.toFixed(2), currentMealElement.recipe.protein.toFixed(2), currentMealElement.recipe.fat.toFixed(2)],
        backgroundColor: ['#A977C0','#FF7760','#FCBE5B'],
        fill: true
      }];
      this.fsCommon.generateChart("nutritionInfo"+mealElementId,'doughnut',datasets,labels,false,false);
    }else{
      this.render.setStyle(nutrientsDiv,'display','none');
      this.render.setStyle(nutrientsTextEl,'display','block');
      this.render.setStyle(hideTextEl,'display','none');
    }

    
  }

  toggleMealsData(mealElementId:number){
    let mealDataToggle = <HTMLElement>document.querySelector("#toggleMealInfo"+mealElementId);
    let ratingInfoToggle = <HTMLElement>document.querySelector("#ratingInfoToggle"+mealElementId);
    mealDataToggle.style.display === "none" ? mealDataToggle.style.display = "inline-block" : mealDataToggle.style.display = "none";
    ratingInfoToggle.style.display === "none" ? ratingInfoToggle.style.display = "inline-block" : ratingInfoToggle.style.display = "none";
  }

  openAMeal(mealId:number,date:string){
    this.router.navigateByUrl("/meals/meal/"+mealId+"/"+date);
  }

  chevronToggle(chevClicked:string,chevUp:ElementRef<any>,chevDown:ElementRef<any>,directionInfo:ElementRef<any>){
    if(chevClicked === 'up'){
      this.render.setStyle(chevUp,'display','none');
      this.render.setStyle(chevDown,'display','block');
      this.render.setStyle(directionInfo,'display','none');
    }else{
      this.render.setStyle(chevUp,'display','block');
      this.render.setStyle(chevDown,'display','none');
      this.render.setStyle(directionInfo,'display','block');
    }
  }

  doRefresh(event:any){
    if(!this.customDate){
      this.dataService.currentMeals = null;
      this.dataService.infiniteMeals = [];
      this.dataService.groceryIngredients = [];
      this._loadDates(false);
      event.target.complete();
    }else{
      event.target.complete();
    }
  }

  favoriteMeal(id:number,favorite:boolean){
    this.fpService.updateMealFavorite(id,favorite).then(()=>{
      if(favorite){
        this.fsCommon.generateToast('Added to fav! \n View your fav in Home - Food preferences',1000,'toast-config','bottom');
      }
      this._updateCurrentScreenFavorite(id,favorite);
      this._updateCurrentMealsWithMealFavorites(id,favorite);
    }).catch(()=>{
      this.router.navigateByUrl("/error/Error Updating Favorites/meals");
    });
  }

  moreInfo(mealElement:any){
   this.fsCommon.generatePopover(MoreInfoComponent,mealElement);
  }

  private _ratedMeals(rated:string,id:number,sequence:number){
    let ratedUpEl = <HTMLElement>document.querySelector("#ratedUp"+sequence+id);
    let ratedDownEl = <HTMLElement>document.querySelector("#ratedDown"+sequence+id);
    if(rated === 'up'){
      ratedUpEl.classList.add("rate-selected");
      ratedUpEl.classList.remove("default-fab");
      ratedDownEl.classList.add("default-fab");
      ratedDownEl.classList.remove("rate-selected");
      this.fpService.updateMealRating(5,id).then(()=>{
        this._updateCurrentMealsWithRating(id,5);
      }).catch((e)=>{
        console.log(e);
        //this.router.navigateByUrl("/error/Error Updating Meal Rating/meals");
      });
    }else{
      ratedDownEl.classList.add("rate-selected");
      ratedDownEl.classList.remove("default-fab");
      ratedUpEl.classList.add("default-fab");
      ratedUpEl.classList.remove("rate-selected");
      this.fpService.updateMealRating(1,id).then(()=>{
        this._updateCurrentMealsWithRating(id,1);
      }).catch((e)=>{
        console.log(e);
        //this.router.navigateByUrl("/error/Error Updating Meal Rating/meals");
      });
    }
  }

  private _followedMeals(followed:string,mealElementId:number,launchFollowed:number){
    let followedEl = <HTMLElement>document.querySelector("#followed"+launchFollowed+mealElementId);
    let unfollowedEl = <HTMLElement>document.querySelector("#didNotfollow"+launchFollowed+mealElementId);
    if(followed === 'yes'){
      this.dataService.saveMealsNotFollowed(mealElementId,true,"followed the meal",undefined).then(()=>{
        followedEl.classList.add("followed-selected");
        followedEl.classList.remove("default-fab");
        unfollowedEl.classList.add("default-fab");
        unfollowedEl.classList.remove("followed-selected");
        this._updateCurrentMealsWithFollowed(mealElementId,true);
      }).catch(()=>{
        this.router.navigateByUrl("/error/Error saving Followed meal/meals");
      });
    }else{
      unfollowedEl.classList.add("followed-selected");
      unfollowedEl.classList.remove("default-fab");
      followedEl.classList.add("default-fab");
      followedEl.classList.remove("followed-selected");
      this._updateCurrentMealsWithFollowed(mealElementId,false);
      this.fsCommon.openModalWithProps(NotFollwedPage,{mealImage:document.querySelector("#mealImage"+mealElementId).getAttribute("src"),mealElementId:mealElementId});
    }
  }

  private _updateCurrentMealsWithMealFavorites(id:number,favorite:boolean){
    let currentMeals = this.dataService.currentMeals;
    for(let i=0; i<currentMeals.length; i++){
      for(let j=0; j<currentMeals[i].meals.length; j++){
        for(let k=0; k<currentMeals[i].meals[j].mealElements.length; k++){
          if(currentMeals[i].meals[j].mealElements[k].recipe.id === id){
            currentMeals[i].meals[j].mealElements[k].recipe.isFavorite = favorite;
          }
          break;
        }
      }
    }
    this.dataService.currentMeals = currentMeals;
  }

  private _updateCurrentMealsWithFollowed(mealElementId:number,followed:boolean){
    for(let i=0; i<this.dataService.currentMeals.length; i++){
      if(this.fsCommon.todaysDateFromString(this.dataService.currentMeals[i].date).toISOString().substring(0,10) === this.fsCommon.todaysDate(this.weekArray[this.currentFabButton])){
        for(let j=0; j< this.dataService.currentMeals[i].meals.length; j++){
          for(let k=0; k<this.dataService.currentMeals[i].meals[j].mealElements.length; k++){
            if(this.dataService.currentMeals[i].meals[j].mealElements[k].id === mealElementId){
              this.dataService.currentMeals[i].meals[j].mealElements[k].followed = followed;
              break;
            }
          }
        }
      }
    }
  }

  private _updateCurrentMealsWithRating(recipeId:number,rating:number){
    for(let i=0; i<this.dataService.currentMeals.length; i++){
      if(this.fsCommon.todaysDateFromString(this.dataService.currentMeals[i].date).toISOString().substring(0,10) === this.fsCommon.todaysDate(this.weekArray[this.currentFabButton])){
        for(let j=0; j< this.dataService.currentMeals[i].meals.length; j++){
          for(let k=0; k<this.dataService.currentMeals[i].meals[j].mealElements.length; k++){
            if(this.dataService.currentMeals[i].meals[j].mealElements[k].recipe.id === recipeId){
              this.dataService.currentMeals[i].meals[j].mealElements[k].recipe.rating = rating;
              break;
            }
          }
        }
      }
    }
  }

  private _updateCurrentScreenFavorite(id:number,favorite:boolean){
    let tempMeals = this.meals;
    for(let i=0; i<tempMeals.length; i++){
      for(let j=0; j<tempMeals[i].mealElements.length; j++){
        if(tempMeals[i].mealElements[j].recipe.id === id){
          tempMeals[i].mealElements[j].recipe.isFavorite = favorite;
        }
        break;
      }
    }
    this.meals = tempMeals;
    let onLaunchEl = <any>document.querySelector("#onLaunch"+id);
    let notOnLaunchEl = <any>document.querySelector("#notOnLaunch"+id);
    let notOnLaunchFill = <any>document.querySelector("#notOnLaunchFill"+id);
    let notOnLaunchNoFill = <any>document.querySelector("#notOnLaunchNoFill"+id);
    onLaunchEl.style.display = 'none';
    notOnLaunchEl.style.display = 'inline-block';
    if(favorite){
      notOnLaunchFill.style.display = 'inline-block';
      notOnLaunchNoFill.style.display = 'none';
    }else{
      notOnLaunchFill.style.display = 'none';
      notOnLaunchNoFill.style.display = 'inline-block';
    }
  }

  private _mealsNotAvailable(loader:HTMLIonLoadingElement,currentDate:string){
      this.mealsAvailable = false;
      this.mealsNotAvailable = true;
      this.meals = [];
      this.dateNotAvailable = currentDate;
      loader.dismiss();
  }

  private _loadDates(fromCustomDate:boolean){
    let todayDate = this.weekArray.filter(d => d.toDateString() === new Date().toDateString());
    for(let i=0; i<this.weekArray.length; i++){
      if(todayDate[0] === this.weekArray[i]){
        let fabButton = <HTMLElement>document.querySelector("#fabButton"+i);
        let fabButtonMonth = <HTMLElement>document.querySelector("#fabButtonMonth");
        fabButtonMonth.scrollIntoView();
        fabButton.scrollIntoView();
        setTimeout(() => {
          this.fabButtonClicked(i,fromCustomDate);
        },500);
      }
    }
  }

  private _fetchFromMealsAvailable(meals:any,fromDate:string,loader:HTMLIonLoadingElement){
    this.fsCommon.fetchFromMealsAvailable(meals,fromDate,loader);
    this._getMealsAvailability(loader);
  }

  private _getMealsAvailability(loader:HTMLIonLoadingElement){
    const mealAvailable = this.dataService.currentMeals.filter( meal => new Date(meal.date).toISOString().substring(0,10) === this.fsCommon.todaysDate(this.weekArray[this.currentFabButton]));
    mealAvailable.length === 0 ? this._mealsNotAvailable(loader,this.fsCommon.todaysDate(this.weekArray[this.currentFabButton])): this.rendermeals(this.fsCommon.dateAvailable(this.weekArray,this.currentFabButton),loader);    
  }

  private _updateHighLevelNutirnets(meals:any){
    this._resetAllNutrients();
   for(let i=0; i<meals.length; i++){
      for(let j=0; j<meals[i].mealElements.length; j++){
        this.totalCalories += (+meals[i].mealElements[j].recipe.calories * +meals[i].mealElements[j].userServings);
        this.carbs += (+meals[i].mealElements[j].recipe.carbs * +meals[i].mealElements[j].userServings);
        this.protein += (+meals[i].mealElements[j].recipe.protein * +meals[i].mealElements[j].userServings);
        this.fat += (+meals[i].mealElements[j].recipe.fat * +meals[i].mealElements[j].userServings);
      }
    }
  }

  private _resetAllNutrients(){
    this.totalCalories = 0;
    this.carbs = 0;
    this.protein = 0;
    this.fat = 0;
  }

  private _fetchFirstInfiniteMeals(){
    this.infiniteScroll.disabled = false;
    this.loadCtrl.create({
      message:'Fetching Meals...',
      backdropDismiss:false
    }).then( modal => {
      modal.present();
      this.dataService.getMeals(this.customFromDate,this.customToDate,"5").then( meals => {
        this.dataService.infiniteMeals = [];
        this.nextUrlForInfinityList = meals.next;
        this.nextUrlForInfinityList === null ? this.infiniteScroll.disabled = true : this.infiniteScroll.disabled = false;
        meals.results.length === 0 ? this.mealsNotAvailable = true: this.mealsNotAvailable = false;
        this.infiniteMealsListArray.push(meals.results);
        this.dataService.infiniteMeals.push(meals.results);
        modal.dismiss()
      }).catch(()=>{
        modal.dismiss();
        this.router.navigateByUrl("/error/Error Fetching Meals/meals");
      });
    });
    
  }

  private _fetchNextInfiniteMeals(event:any){
      this.dataService.getNextInfiniteMeals(this.nextUrlForInfinityList).then( meals => {
        this.nextUrlForInfinityList = meals.next;
          this.nextUrlForInfinityList === null ? event.target.disabled = true : event.target.disabled = false;
          this.infiniteMealsListArray.push(meals.results);
          this.dataService.infiniteMeals.push(meals.results);
          event.target.complete();
      }).catch(()=>{
        event.target.complete();
        this.router.navigateByUrl("/error/Error Fetching Meals/meals");
      });
  }

/*
  shareOnInstagram(index:number){
    window.open("https://www.instagram.com/?url="+document.querySelector("#shareUrl"+index).getAttribute("value"));
  }

  shareOnTwitter(index:number){
    window.open("https://twitter.com/intent/tweet?url="+document.querySelector("#shareUrl"+index).getAttribute("value"));
  }

  shareOnFacebook(index:number){
    window.open("http://www.facebook.com/sharer.php?u="+document.querySelector("#shareUrl"+index).getAttribute("value"));
  }
  */
}
