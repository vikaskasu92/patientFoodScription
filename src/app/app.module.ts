import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { Health } from '@ionic-native/health/ngx';
import { KeychainTouchId } from '@ionic-native/keychain-touch-id/ngx';
import { SocialSharing } from '@ionic-native/social-sharing/ngx';
import { Push } from '@ionic-native/push/ngx';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpReqResInterceptor } from './http-interceptor.service';

@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [
    BrowserModule, 
    IonicModule.forRoot(),
     AppRoutingModule,
     HttpClientModule
  ],
  providers: [
    { 
      provide: RouteReuseStrategy, 
      useClass: IonicRouteStrategy 
    },
    { provide:   HTTP_INTERCEPTORS, 
      useClass: HttpReqResInterceptor,
       multi: true
    },
    SplashScreen,
    Health,
    SocialSharing,
    Push,
    KeychainTouchId
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
