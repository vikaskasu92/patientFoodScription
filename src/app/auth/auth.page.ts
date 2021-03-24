import { Component, OnInit } from '@angular/core';
import { AuthService } from './auth.service';
import { SafariViewController } from '@ionic-native/safari-view-controller/ngx';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';
import { Router } from '@angular/router';
import { FoodscriptionCommonService } from '../sharedFiles/foodscription-common.service';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.page.html',
  styleUrls: ['./auth.page.scss'],
})
export class AuthPage implements OnInit {

  constructor(private authService:AuthService,
              private router:Router,
              private fpCommon:FoodscriptionCommonService,
              private safariViewController:SafariViewController,
              private iab: InAppBrowser){}

  showContent:boolean;
  domain:string = "accounts-phrqltest";
  region:string = "us-west-2";
  appClientId:string = "753e4kpfehvqs6jc95qm3lf5pe";
  userPoolId:string = "us-west-2_chPPnHOzM";
  redirectURI:string = "foodscription://userpool/callback/";
  tokens:any;
  myHeaders = new Headers().set('Cache-Control', 'no-store');
  urlParams = new URLSearchParams(window.location.search);
  key_id:any;
  keys:any;
  key_index:any;

  ngOnInit() {
   this.login();
  }

  ionViewWillEnter(){
    this.showContent = true;
  }

  ionViewWillLeave(){
    this.showContent = false;
  }

  login(){
    alert("in login")
    console.log("*************************************in login**********************************")
    if(this.authService.appPlatform === "web"){
      this.checkCookie();
      return;
    }else{
      this.loginUserWithOauth();
    }
  }

  checkCookie() {
    alert('in check cookie')
    let token= this.fpCommon.getCookie("csrftoken");
    if (token != "") {
      this.router.navigateByUrl("/tabs")
    } else {
      window.location.href=environment.cookieAuth;
    }
  }

  getRandomString(){
    const randomItems:any = new Uint32Array(28);
    crypto.getRandomValues(randomItems);
    const binaryStringItems = randomItems.map(dec => `0${dec.toString(16).substr(-2)}`)
    return binaryStringItems.reduce((acc, item) => `${acc}${item}`, '');
  }

  
  async loginUserWithOauth(){
    let code = this.urlParams.get('code');
    let state = this.getRandomString();
    if(code == null){
      window.location.href = "https://"+this.domain+".auth."+this.region+".amazoncognito.com/oauth2/authorize?response_type=code&state="+state+"&client_id="+this.appClientId+"&redirect_uri="+this.redirectURI+"&scope=openid";
    }else{
      await fetch("https://"+this.domain+".auth."+this.region+".amazoncognito.com/oauth2/token?grant_type=authorization_code&code="+code+"&client_id="+this.appClientId+"&redirect_uri="+this.redirectURI,{
      method: 'post',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }})
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        this.tokens=data;
        this.authService.accessToken = data.access_token;
        this.authService.refreshToken = data.refresh_token;
        this.authService.getCurrentUserDetails().subscribe( (profile:any) => {
          console.log(profile);
          this.authService.username = profile.firstName+" "+profile.lastName;
          this.router.navigateByUrl("/tabs");
        });
      });
    }
    
  }
}
