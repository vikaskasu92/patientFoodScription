import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { AuthService } from '../auth.service';
import { LoadingController } from '@ionic/angular';
import { Capacitor, Plugins } from '@capacitor/core';
import { DataService } from 'src/app/sharedFiles/data.service';
import { KeychainTouchId } from '@ionic-native/keychain-touch-id/ngx';
import { SettingsService } from 'src/app/home/settings/settings.service';
const { Storage } = Plugins;

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  constructor(private router:Router,
              private authService: AuthService,
              private loadCtrl:LoadingController,
              private keychainTouchId: KeychainTouchId,
              private settingsService: SettingsService,
              private dataService:DataService) { }
              
  loginForm:FormGroup;
  validation_messages:any;
  blank_fields:boolean = false;
  invalid_user:boolean = false;
  faceIdEnabled:boolean = false;
  showFaceID:boolean = false;
  notAndroid:boolean = true;

  ngOnInit() {
    this.loginForm = new FormGroup({
      'username' : new FormControl(null,[Validators.required]),
      'password' : new FormControl(null,[Validators.required])
    });
    this._subscribedValidationMessages();
    this._checkLoginControls();
    console.log("notAndroid")
  }

  ionViewDidEnter(){
    if(Capacitor.getPlatform() === "android"){
      this.notAndroid = false;
      console.log("android it is")
    }
    let mainContent = <HTMLElement>document.querySelector("#mainLoginContent");
    mainContent.style.display = "block";
    this.keychainTouchId.isAvailable().then( res => {
      console.log("touchid is available")
      this.showFaceID = true;
      Storage.get({key:'fsFaceIdEnableKey'}).then( storage => {
        if(JSON.parse(storage.value) !== null){
          this.faceIdEnabled = JSON.parse(storage.value).fsFaceIdEnable;
        }else{
          this.faceIdEnabled = false;
        }
        if(this.faceIdEnabled){
          let faceIdToggle = <HTMLElement>document.querySelector("#faceIdToggle");
          faceIdToggle.click();
          this.faceId();
        }
      });
    },err =>{});
  }

  passwordFocus(){
    let passwordField = <HTMLElement>document.querySelector("#password-field");
    passwordField.focus();
  }

  enableFaceId(event:any){
    if(event.detail.checked){
      this.faceIdEnabled = true;
      Storage.set({
        key:'fsFaceIdEnableKey',
        value:JSON.stringify({"fsFaceIdEnable":true})
      })
    }else{
      Storage.set({
        key:'fsFaceIdEnableKey',
        value:JSON.stringify({"fsFaceIdEnable":false})
      })
    }
  }

  faceId(){
    this.keychainTouchId.isAvailable().then( res => {
        this._verifyFaceIdLogin();
      });
  }

  loginClicked(){
    if(!this.faceIdEnabled || Capacitor.platform === "android"){
      this._callRegularLoginProcess();
    }else{
      this._verifyFaceIdLogin();
    }
  }

  enterPressed(event:any){
    if(event.keyCode === 13){
      this.loginClicked();
    }
  }

  private _checkLoginControls(){
    this.loginForm.controls.username.valueChanges.subscribe( () => {
      if(this.loginForm.controls.username.value !== "" && this.loginForm.controls.password.value !== "" && this.loginForm.controls.username.value !== null && this.loginForm.controls.password.value !== null){
       this._checkValidations();
      }
    });
    this.loginForm.controls.password.valueChanges.subscribe( () => {
     if(this.loginForm.controls.username.value !== "" && this.loginForm.controls.password.value !== "" && this.loginForm.controls.username.value !== null && this.loginForm.controls.password.value !== null){
       this._checkValidations();
      }
   });
  }

  private _subscribedValidationMessages(){
    this.authService.validationMessage.subscribe( value => {
      this.validation_messages = value;
     });
  }

  private _callRegularLoginProcess(){
    this.invalid_user = false;
    if(this.loginForm.valid){
      this.blank_fields = false;
      this.loadCtrl.create({
        message:'Logging in...',
        backdropDismiss:false
      }).then( modal => {
         modal.present();
         this.authService.awsLogin({"email":this.loginForm.controls.username.value,"password":this.loginForm.controls.password.value}).then(userData => {
          this._commonLoginProcess(modal,userData);
        }).catch(error =>{
          this.invalid_user = true;
        });
      });
    }else{
      this.blank_fields = true;
    }
  }



  private _commonLoginProcess(loader:HTMLIonLoadingElement,userData:any){
    console.log(userData);
    this.authService.accessToken = userData.signInUserSession.idToken.jwtToken;
    this.authService.refreshToken = userData.signInUserSession.refreshToken.token;
    this.authService.getCurrentUserDetails().subscribe((profile:any) => {
      this.authService.username = profile.email;
      this.dataService.connectToChatServer(this.authService.username);
      this.authService.userPreferenceId = profile.id;
      loader.dismiss();
      console.log("profile is ",profile);
      this.router.navigateByUrl("/tabs");
    });
  }

  private _checkValidations(){
    (this.loginForm.controls.username.valid && this.loginForm.controls.password.valid) ? this.blank_fields = false : this.blank_fields = true;
  }

  private _verifyFaceIdLogin(){
   this.keychainTouchId.verify("fspfaLoginKey","FoodScription").then( res=>{
     this.loadCtrl.create({
       message:'Logging in...',
       backdropDismiss:false
     }).then( modal => {
        modal.present();
        this.authService.awsLogin({"email":res.split(":")[0],"password":res.split(":")[1]}).then((userData:any) => {
         this._commonLoginProcess(modal,userData);
        },error =>{
          this.keychainTouchId.delete("fspfaLoginKey").then(() => {
            modal.dismiss();
            this.invalid_user = true;
          });
        });
     });
      
    }, err => {
    if(this.loginForm.valid){
      this._storeFaceId();
      this.loginClicked();
    }
  });
  }

  private _storeFaceId(){
    this.keychainTouchId.save("fspfaLoginKey",this.loginForm.controls.username.value+":"+this.loginForm.controls.password.value,true).then( store => { });
  }

}
