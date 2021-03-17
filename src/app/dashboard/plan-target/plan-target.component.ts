import { AfterViewInit } from '@angular/core';
import { Component, OnInit } from '@angular/core';

import * as ApexCharts from 'apexcharts';

@Component({
  selector: 'app-plan-target',
  templateUrl: './plan-target.component.html',
  styleUrls: ['./plan-target.component.scss'],
})
export class PlanTargetComponent implements OnInit, AfterViewInit {

  constructor() { }

  apexcharts:ApexCharts;

  ngOnInit() {
    
  }

  ngAfterViewInit(): void {
    let options = {
      series: [85, 50, 98],
      chart: {
      height: 350,
      type: 'radialBar',
    },
    plotOptions: {
      radialBar: {
        dataLabels: {
          name: {
            fontSize: '22px',
          },
          value: {
            fontSize: '16px',
          }
        }
      }
    },
    colors: ['#A977C0', '#FF7760', '#FCBE5B'],
    labels: ['Carbs', 'Protein', 'Fat'],
    };

    this.apexcharts = new ApexCharts(document.querySelector("#planTargetChart"), options);
    this.apexcharts.render();
  }

}
