import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Capacitor } from '@capacitor/core';

@Component({
  selector: 'app-cognito-login',
  templateUrl: './cognito-login.page.html',
  styleUrls: ['./cognito-login.page.scss'],
})
export class CognitoLoginPage implements OnInit {

  constructor(private http:HttpClient,
              private router:Router) { }

  ngOnInit() {
    //this.checkCookie();
    this.login();
  }

  getCookie(cname) {
    let name = cname + "=";
    let decodedCookie = decodeURIComponent(document.cookie);
    let ca = decodedCookie.split(';');
    for(let i = 0; i < ca.length; i++) {
      let c = ca[i];
      while (c.charAt(0) == ' ') {
        c = c.substring(1);
      }
      if (c.indexOf(name) == 0) {
        return c.substring(name.length, c.length);
      }
    }
    return "";
  }

  getCurrentUserDetails(token:string){
    return this.http.get<any>("https://accounts.phrqltest.com/api/me/profile/",{
      headers:new HttpHeaders().set("accept","application/json"), withCredentials: true 
    });
  }

  
  login(){
    //if(Capacitor.getPlatform() === "web"){
      //window.location.href="https://accounts.phrqltest.com/userpool/login/?origin=http://local.phrqltest.com:4200";
     // return;
   // }else{
      this.router.navigateByUrl("/auth/login");
   // }
    
  }

  checkCookie() {
    let token= this.getCookie("csrftoken");
    if (token != "") {
      this.getCurrentUserDetails(token).subscribe(profile => {
        console.log(profile);
        this.router.navigateByUrl("/meals")
      });
    } else {
      this.login();
    }
  }

}
