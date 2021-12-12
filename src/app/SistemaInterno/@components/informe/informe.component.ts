import { Component, OnInit } from '@angular/core';
import { ChartDataSets } from 'chart.js';
import { Chart, ChartData } from 'chart.js';
import { Color, Label } from 'ng2-charts';


@Component({
  selector: 'app-informe',
  templateUrl: './informe.component.html',
  styleUrls: ['./informe.component.css']
})
export class InformeComponent implements OnInit {

  lineChartData: ChartDataSets[] = [
    { data: [12, 72, 12, 44, 89], label: "Valor1" },
    { data: [16, 54, 24, 11, 2], label: "Valor2" }
  ];

  lineChartLabels: Label[] = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo'];

  lineChartOptions = { responsive: true };

  lineChartColors: Color[] = [
    {
      borderColor: 'red',
      backgroundColor: 'pink',
    },
  ];

  lineChartLegend= true;
  lineChartPlugins = [];
  lineChartType: 'line' = "line";


  constructor() { }

  ngOnInit(): void {
  }

  shuffeData() {

  }

}
