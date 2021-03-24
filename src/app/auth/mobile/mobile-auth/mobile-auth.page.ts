import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';
import { SafariViewController } from '@ionic-native/safari-view-controller/ngx';
import { FoodscriptionCommonService } from 'src/app/sharedFiles/foodscription-common.service';
import { environment } from 'src/environments/environment';
import { AuthService } from '../../auth.service';

@Component({
  selector: 'app-mobile-auth',
  templateUrl: './mobile-auth.page.html',
  styleUrls: ['./mobile-auth.page.scss'],
})
export class MobileAuthPage implements OnInit {

  constructor(private authService:AuthService,
    private router:Router,
    private fpCommon:FoodscriptionCommonService,
    private safariViewController:SafariViewController,
    private iab: InAppBrowser){}

  showContent:boolean;
  domain:string = "accounts-phrqltest";
  region:string = "us-west-2";
  appClientId:string = environment.appClientId;
  userPoolId:string = "us-west-2_chPPnHOzM";
  redirectURI:string = environment.redirectURI;
  tokens:any;
  myHeaders = new Headers().set('Cache-Control', 'no-store');
  urlParams = new URLSearchParams(window.location.search);
  key_id:any;
  keys:any;
  key_index:any;

  ngOnInit() {
    this.loginUserWithOauth();
  }

  ionViewWillEnter(){
    this.showContent = true;
  }

  ionViewWillLeave(){
    this.showContent = false;
  }

  checkCookie() {
    let token= this.fpCommon.getCookie("csrftoken");
    if (token != "") {
      this.router.navigateByUrl("/tabs")
    } else {
      window.location.href = environment.cookieAuth;
    }
  }

  getRandomString(){
    const randomItems:any = new Uint32Array(28);
    crypto.getRandomValues(randomItems);
    const binaryStringItems = randomItems.map(dec => `0${dec.toString(16).substr(-2)}`)
    return binaryStringItems.reduce((acc, item) => `${acc}${item}`, '');
  }

  async loginUserWithOauth(){
    alert("came to call the service now")
    let code = this.urlParams.get('code');
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
      console.log("closing safari view controller");
      this.safariViewController.hide();
      console.log("closed safari view controller");
      
    });
  }

}
