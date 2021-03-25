import { Component, OnInit } from '@angular/core';
import { AuthService } from './auth.service';
import { SafariViewController } from '@ionic-native/safari-view-controller/ngx';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';
import { ActivatedRoute, Router } from '@angular/router';
import { Capacitor, Plugins } from '@capacitor/core';
import { FoodscriptionCommonService } from '../sharedFiles/foodscription-common.service';
import { environment } from '../../environments/environment';
import {Platform} from '@ionic/angular';
const { Storage } = Plugins;

@Component({
  selector: 'app-auth',
  templateUrl: './auth.page.html',
  styleUrls: ['./auth.page.scss'],
})
export class AuthPage implements OnInit {

  constructor(private authService:AuthService,
              private router:Router,
              private route:ActivatedRoute,
              private fpCommon:FoodscriptionCommonService,
              private safariViewController:SafariViewController,
              private iab: InAppBrowser,
              private platform:Platform){}

  showContent:boolean;
  domain:string = "accounts-phrqltest";
  region:string = "us-west-2";
  appClientIdMobile:string = "753e4kpfehvqs6jc95qm3lf5pe";
  appClientIdBrowser:string = "6ft9a1rrj34mmcmrrqd9ec7sdo";
  userPoolId:string = "us-west-2_chPPnHOzM";
  redirectURIMobile:string = "https://patient.phrqltest.com/userpool/callback?fromMobile=true";
  redirectURIBrowser:string = "https://patient.phrqltest.com/userpool/callback/"
  tokens:any;
  myHeaders = new Headers().set('Cache-Control', 'no-store');
  urlParams = new URLSearchParams(window.location.search);
  key_id:any;
  keys:any;
  key_index:any;

  ngOnInit() {
   this.route.queryParams.subscribe(params => {
     alert("params are "+params);
     alert("params for code is "+params["code"])
     alert("params for fromMobile is "+params["fromMobile"])
      if(params["fromMobile"] == "true"){
        this.loginUserWithOauth();
        return;
      }else{
        this.login();
      }
   });
   this.platform.pause.subscribe(() => {
    console.log("app paused ************************")
   });
   this.platform.resume.subscribe(() => {
     console.log("app resumed *****************");
     let email = this.route.snapshot.queryParams.get("email");
    this.authService.retrieveTokenFromDb(email).subscribe( retrievedToken => {
      console.log("retrievedToken ********************************** "+retrievedToken);
      this.router.navigateByUrl("/tabs");
    })
    
  });
  }

  ionViewWillEnter(){
    this.showContent = true;
  }

  ionViewWillLeave(){
    this.showContent = false;
  }

  login(){
    if(this.authService.appPlatform === "web"){
      this.checkCookie();
      return;
    }else{
      console.log("calling login with oauth")
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
    console.log("came to check login with oauth");
    let code = this.urlParams.get('code');
    console.log("code is "+code);
    let state = this.getRandomString();
    if(code == null){
      this.safariViewController.isAvailable().then((available: boolean) => {
            if (available) {
              this.safariViewController.show({
                url: "https://"+this.domain+".auth."+this.region+".amazoncognito.com/oauth2/authorize?response_type=code&state="+state+"&client_id="+this.appClientIdMobile+"&redirect_uri="+this.redirectURIMobile+"&scope=openid",
                hidden: false,
                animated: false,
                transition: 'curl',
                enterReaderModeIfAvailable: true,
                tintColor: '#ff0000'
              })
              .subscribe((result: any) => {
                  if(result.event === 'opened') console.log('Opened');
                  else if(result.event === 'loaded') console.log('Loaded');
                  else if(result.event === 'closed'){
                    Storage.get({key:'foodScriptionLoginDetails'}).then( storage => {
                      if(JSON.parse(storage.value) !== null){
                        console.log("storage data is "+JSON.parse(storage.value));
                        let loginDetails = JSON.parse(storage.value);
                        this.authService.accessToken = loginDetails.accessToken;
                        this.authService.username = loginDetails.email;
                        this.authService.refreshToken = loginDetails.refreshToken;
                        this.router.navigateByUrl("/tabs");
                      }else{
                        console.log("No Storage Items");
                      }
                    });
                  }
                },
                (error: any) => console.error(error)
              );

            } else {
              // use fallback browser, example InAppBrowser
            }
          }
        );
    }else{
      alert("code not null so fetching token");
      await fetch("https://"+this.domain+".auth."+this.region+".amazoncognito.com/oauth2/token?grant_type=authorization_code&code="+code+"&client_id="+this.appClientIdMobile+"&redirect_uri="+this.redirectURIMobile,{
      method: 'post',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }})
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        alert("token recieved now "+data.access_token);
        this.tokens=data;
        this.authService.accessToken = data.access_token;
        this.authService.refreshToken = data.refresh_token;
        this.authService.getCurrentUserDetails().subscribe( (profile:any) => {
          console.log(profile);
          this.authService.username = profile.firstName+" "+profile.lastName;
          Storage.set({
            key:'foodScriptionLoginDetails',
            value:JSON.stringify({"email":profile.email,"accessToken":data.access_token,"refreshToken":data.refresh_token})
          }).then(stored => {
            alert("Auth is done now");
            this.router.navigateByUrl("/authdone");
          });
        });
      });
    }
    
  }
}
