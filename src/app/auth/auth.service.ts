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
    //this.isAuthenticated.next(true);
    return Auth.currentAuthenticatedUser();
  }

  getCurrentUserDetails(){
   // if(this.appPlatform === "web"){
    //  return this.http.get<any>("https://accounts.phrqltest.com/api/me/profile/",{
      //  headers :  new HttpHeaders().set('accept', 'application/json'),withCredentials:true
    //  });
   // }else{
     debugger;
     debugger;
      let userToken = this.accessToken;
      return this.http.get<any>("https://accounts.phrqltest.com/api/me/profile/",{
        headers :  new HttpHeaders().set('accept', 'application/json').set('Authorization',`Bearer ${userToken}`)
      });
   // }
    
  }

}
