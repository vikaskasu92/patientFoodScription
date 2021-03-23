import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import {  Plugins,  PushNotification, PushNotificationToken, PushNotificationActionPerformed, Capacitor, } from '@capacitor/core';
import { AuthService } from './auth/auth.service';
import { environment } from '../environments/environment'

const { PushNotifications, Storage } = Plugins;

@Injectable({
  providedIn: 'root'
})
export class PushNotificationService {

  uniqueDeviceId:any;

  constructor(private http:HttpClient,
              private authService:AuthService,
              private router:Router) { }

  initPush(){
    if(Capacitor.platform !== 'web'){
      this.registerPush();
    }
  }

  async registerPush(){
    await  Storage.get({key:'fsUniqueDevice'}).then( storage =>{
      let uniqueId = JSON.parse(storage.value);
      if(uniqueId === null){
        PushNotifications.requestPermission().then( result => {
          if (result.granted) {
            PushNotifications.register();
          } else {
            console.log("No permission to push notifications");
            alert("Push Notifications for this App is not Enabled, Please Enable and run the app again to get Chat notifications from your dietitian");
          }
        });
      }else{
        console.log("already found in storage "+uniqueId.uniqueDeviceId);
        this.uniqueDeviceId = uniqueId.uniqueDeviceId;
      }
    });
    


    // On success, we should be able to receive notifications
    PushNotifications.addListener('registration',
      (token: PushNotificationToken) => {
        let createSnsArnRequest = {
          "email": this.authService.username,
          "token": token.value,
          "appType": Capacitor.platform,
          "environment":environment.environment
        }
        this.http.post<any>("https://fpb8ilwrr9.execute-api.us-west-2.amazonaws.com/prod/foodscription-push-notification-registration",JSON.stringify(createSnsArnRequest),{
          headers: new HttpHeaders().set("Content-Type","application/json")
        }).subscribe(data =>{
          console.log("Successfully stored token to SNS ARN");
          Storage.set({
            key:'fsUniqueDevice',
            value:JSON.stringify({"uniqueDeviceId":token.value})
          });
        });
      }
    );

    // Some issue with our setup and push will not work
    PushNotifications.addListener('registrationError',
      (error: any) => {
        console.log("there has been error with registration ",JSON.stringify(error));
      }
    );

    // Show us the notification payload if the app is open on our device
    PushNotifications.addListener('pushNotificationReceived',
      (notification: PushNotification) => {
      }
    );

    // Method called when tapping on a notification
    PushNotifications.addListener('pushNotificationActionPerformed',
      (notification: PushNotificationActionPerformed) => {
        this.router.navigateByUrl("/convos");
      }
    );
    
  }

}
