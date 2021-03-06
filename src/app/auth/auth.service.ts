import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Auth } from 'aws-amplify';
import { Plugins } from '@capacitor/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

const { Storage } = Plugins;

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http:HttpClient) { }

  appPlatform:string;
  username:string;
  userPreferenceId:number;
  accessToken:string;
  refreshToken:string;
  validation_messages = {
    'username': [
        { type: 'required', message: 'Username is required' }
      ],
      'password': [
        { type: 'required', message: 'Password is required' }
      ],
      'blank' : [
        { message:'Both Username and Password must be provided'}
      ],
      'invalidUser' : [
        { message:'Username or Password is Invalid!'}
      ]
  }

  validations = new BehaviorSubject<any>(this.validation_messages);
  validationMessage = this.validations.asObservable();
  
  awsLogin(userInputData:any){
    return Auth.signIn(userInputData.email, userInputData.password);
  }

  awsLogout(){
    try {
         Auth.signOut({ global: true }).then(()=>{
          Storage.remove({key:'fslogin'});
          Storage.remove({key:'fsUserPreferenceId'});
         });
    } catch (error) {
        console.log('error signing out: ', error);
    }
  }

  awsForgotPassword(username:string){
    return Auth.forgotPassword(username);
  }

  awsForgotPasswordSubmit(username:string,code:string,newPassword:string){
      return Auth.forgotPasswordSubmit(username, code, newPassword);
  }

  autoLoginAWS(){
    return Auth.currentAuthenticatedUser();
  }

  getCurrentUserDetails(){
      return this.http.get<any>("https://accounts.phrqltest.com/api/me/profile/",this.getHeadersObject());
  }

  getHeadersObject(){
    let headers = null;
    if(this.appPlatform === "web"){
        headers = {
          headers :  new HttpHeaders().set('Content-Type', 'application/json'),
          withCredentials:true
        }
    }else{
        headers = {
          headers :  new HttpHeaders().set('Content-Type', 'application/json').set('Authorization',`Bearer ${this.accessToken}`)
        }
    }
    return headers;
  }

}