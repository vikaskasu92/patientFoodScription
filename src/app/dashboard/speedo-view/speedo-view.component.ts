import { AfterViewInit, Component, ElementRef, OnInit, Renderer2, ViewChild } from '@angular/core';

@Component({
  selector: 'app-speedo-view',
  templateUrl: './speedo-view.component.html',
  styleUrls: ['./speedo-view.component.scss'],
})
export class SpeedoViewComponent implements OnInit, AfterViewInit {

  constructor(private renderer:Renderer2) { }
  gaugeValue:any;
  condition:string;
  @ViewChild('semiCircle',{static:false}) semiCircle: ElementRef;

  ngOnInit() {
    
  }

  ngAfterViewInit(): void {
    this.rotateDial();
  }

  rotateDial() {
    let deg = 0;
    let value = 70;
    deg = (value * 180) / 100;
    this.gaugeValue = value + "%";
    this.condition = "Good";
    this.renderer.setStyle(this.semiCircle.nativeElement, 'transform', `rotate(${ deg }deg)translate3d(0,0,0)`);
    this.renderer.setStyle(this.semiCircle.nativeElement, '-ms-transform', `rotate(${ deg }deg)translate3d(0,0,0)`);
    this.renderer.setStyle(this.semiCircle.nativeElement, '-moz-transform', `rotate(${ deg }deg)translate3d(0,0,0)`);
    this.renderer.setStyle(this.semiCircle.nativeElement, '-o-transform', `rotate(${ deg }deg)translate3d(0,0,0)`);
    this.renderer.setStyle(this.semiCircle.nativeElement, '-webkit-transform', `rotate(${ deg }deg)translate3d(0,0,0)`);
  }
}
