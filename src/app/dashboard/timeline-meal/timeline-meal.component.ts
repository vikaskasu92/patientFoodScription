import { AfterViewInit, Component, OnInit } from '@angular/core';
import { GoogleChartInterface } from 'ng2-google-charts';

@Component({
  selector: 'app-timeline-meal',
  templateUrl: './timeline-meal.component.html',
  styleUrls: ['./timeline-meal.component.scss'],
})
export class TimelineMealComponent implements OnInit, AfterViewInit {

  constructor() { }

  public candlestickMealChart: GoogleChartInterface = {
    chartType: 'CandlestickChart',
    dataTable: [
      ['Breakfast', 55,55,65, 65],
      ['Lunch', 38,38,28, 28],
      ['Snack', 65,65,75, 75],
      ['Dinner', 55,55,65, 65]
    ],
    firstRowIsData: true,
    options: {
      legend: 'none',
      bar: { groupWidth: '99%' }, // Remove space between bars.
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
