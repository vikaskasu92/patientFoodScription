import { Component } from '@angular/core';
import { Capacitor } from '@capacitor/core';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { Platform } from '@ionic/angular';
import { AuthService } from './auth/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  constructor( private platform: Platform,
                private splashScreen: SplashScreen,
                private authService:AuthService) {
    this.initializeApp();
  }

  initializeApp(){
    if(Capacitor.getPlatform() === 'web'){
      this.authService.appPlatform = 'web';
    // this.authService.appPlatform = 'ios';
    }else if(Capacitor.getPlatform() === 'ios'){
      this.authService.appPlatform = 'ios';
      this._cordavaCommands();
    }else{
      this.authService.appPlatform = 'android';
      this._cordavaCommands();
    }
  }

  private _cordavaCommands(){
    this.platform.ready().then(() => {
      //this.statusBar.overlaysWebView(true);
     // this.statusBar.backgroundColorByHexString("#000000");
     // this.statusBar.styleDefault();
      this.splashScreen.hide();
      //this.pushNotificationService.initPush();
    });
  }
}
