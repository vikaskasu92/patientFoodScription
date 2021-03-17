import { AfterViewInit } from '@angular/core';
import { Component, OnInit } from '@angular/core';

import { GoogleChartInterface } from 'ng2-google-charts';

declare var google: any;

@Component({
  selector: 'app-timeline-day',
  templateUrl: './timeline-day.component.html',
  styleUrls: ['./timeline-day.component.scss'],
})
export class TimelineDayComponent implements OnInit, AfterViewInit {

  constructor() { }

  public candlestickChart: GoogleChartInterface = {
    chartType: 'CandlestickChart',
    dataTable: [
      ['Mon', 55,55,65, 65],
      ['Tue', 38,38,28, 28],
      ['Wed', 65,65,75, 75],
      ['Thu', 90,90,100, 100],
      ['Fri', 28,28,18, 18]
    ],
    firstRowIsData: true,
    options: {
      legend: 'none',
      bar: { groupWidth: '98%' }, // Remove space between bars.
      candlestick: {
        fallingColor: { strokeWidth: 0, fill: '#FCBE5B' }, // yellow
        risingColor: { strokeWidth: 0, fill: '#0f9d58' }   // green
      },
      vAxis: { gridlines: { count: 4 },
              title: "%" 
      },
      chartArea: {
        width: '80%'
      }
    }
  };

  ngOnInit() {
   
  }

  ngAfterViewInit(): void {
  }

}
