import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Plugins, Capacitor, CameraSource, CameraResultType } from '@capacitor/core';
import { ModalController } from '@ionic/angular';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-new-photo',
  templateUrl: './new-photo.component.html',
  styleUrls: ['./new-photo.component.scss'],
})
export class NewPhotoComponent implements OnInit {

  
  @Output() imagePick = new EventEmitter<string>();

  constructor(private mdlCtrl:ModalController,
              private authService:AuthService,
              private http:HttpClient) { }

  @Input() mealElementId:number;
  selectedImage:string = "";
  recipePictureForm:FormGroup;
  imageName:string = "";

  ngOnInit() {
    this.recipePictureForm = new FormGroup({
      'recipeName': new FormControl(null, [Validators.required]),
      'mealType': new FormControl(null, [Validators.required]),
      'date':new FormControl(null, [Validators.required]),
      'time':new FormControl(null, [Validators.required]),
      'image': new FormControl(null),
      'calories': new FormControl(null),
      'carbs': new FormControl(null),
      'protein': new FormControl(null),
      'fat': new FormControl(null),
    });
  }

  onPickImage(){
      if(!Capacitor.isPluginAvailable('Camera')){
        return;
      }
      Plugins.Camera.getPhoto({
        quality:80,
        source: CameraSource.Prompt,
        correctOrientation: true,
        width: 600,
        resultType:CameraResultType.DataUrl
      }).then( image => {
        console.log("image "+image);
        console.log("image.dataurl "+image.dataUrl)
        this.selectedImage = image.dataUrl;
        this.recipePictureForm.patchValue({image:image.dataUrl});
      },error => {

      });
  }

  saveImageToS3(){
    if(!this.recipePictureForm.invalid && this.selectedImage !== ""){
      this.imageName = this.recipePictureForm.controls.recipeName.value + this.recipePictureForm.controls.mealType.value +this.mealElementId; 
      debugger;
      let imageData = {
        "mealImage": this.selectedImage.replace("data:image/jpeg;base64,",""),
        "username":this.authService.username,
        "imageName":this.imageName
      }
      this.http.post<any>("https://nclo0gjuy4.execute-api.us-east-1.amazonaws.com/Prod/uploadimagetos3",imageData,{
        headers:  new HttpHeaders().set("accept","application/json"),withCredentials:true
      }).subscribe( data => {
        console.log("data saved to s3 "+data);
      });
    }
  }

  getDataFromS3(){
    if(!this.recipePictureForm.invalid){
      let key = this.authService.username+"/"+this.imageName+".jpg";
      this.http.get<any>("https://nclo0gjuy4.execute-api.us-east-1.amazonaws.com/Prod/downloadimagefroms3?key="+key,{
        headers: new HttpHeaders().set("accept","application/json"),withCredentials:true
      }).subscribe( data => {
        console.log("data saved to s3 "+data);
        this.selectedImage = "data:image/png;base64,"+ this.toBase64(Object.values(data.Body)[1]);
      });
    }
  }

  clearImage(){
    this.selectedImage = "";
  }

  dismissModel(){
    this.mdlCtrl.dismiss();
  }

  toBase64(arr:any) {
    return btoa(
       arr.reduce((data, byte) => data + String.fromCharCode(byte), '')
    );
 }
}
