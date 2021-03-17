import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class OnBoardingService {

  constructor() { }

    gender:string;
    height:number;
    weight:number;
    dob:string;
    medicalConditions:string[] = [];
    allergies:string[] = [];
    activityLevel:string;
    isPregnant:boolean;
    pregnancyTrimester:string;
    isLactating:boolean;
    lactationPeriod:string;

}
