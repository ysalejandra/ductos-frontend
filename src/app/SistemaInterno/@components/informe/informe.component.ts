import { ThrowStmt } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { ChartDataSets } from 'chart.js';
import { Chart, ChartData } from 'chart.js';
import { Color, Label } from 'ng2-charts';


import * as pdfMake from 'pdfmake/build/pdfmake';
import * as pdfFonts from 'pdfmake/build/vfs_fonts';
import { Cliente } from '../../@models/cliente.model';
import { ClienteService } from '../../@services/cliente.service';
(pdfMake as any).vfs = pdfFonts.pdfMake.vfs;

@Component({
  selector: 'app-informe',
  templateUrl: './informe.component.html',
  styleUrls: ['./informe.component.css']
})
export class InformeComponent implements OnInit {

  clientes: Cliente[] = [];
  listCliente: Cliente[] = [];

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

  lineChartLegend = true;
  lineChartPlugins = [];
  lineChartType: 'line' = "line";


  constructor(public clienteService: ClienteService) { }

  ngOnInit(): void {
  }

  shuffeData() {

  }

  crearPdfClientes() {

    this.clienteService.getClientes().subscribe((res: Cliente[]) => {
      this.listCliente = res;
      console.log(this.listCliente);
      console.log(this.listCliente.length);
      var jsonCliente = [];

      var externalDataRetrievedFromServer = [
        { name: 'Bartek', age: 34 },
        { name: 'John', age: 27 },
        { name: 'Elizabeth', age: 30 },
    ];

      for (var i = 0; i < this.listCliente.length; i++) {
        jsonCliente.push(
          {
            'nombre': this.listCliente[i].nombre + " " + this.listCliente[i].apellidoPaterno + " " + this.listCliente[i].apellidoMaterno,
            'correo': this.listCliente[i].email,
            'telefono': this.listCliente[i].telefono
          }
        );
      }

      console.log(jsonCliente.length);



      const pdfDefinition: any = {
        content: [
          {
          
 
            margin: [0, 0, 0, 10],
            layout: {
              fillColor: function (rowIndex, node, columnIndex) {
                return (rowIndex === 0) ? '#ebebeb' : '#f5f5f5';
              }
            },

            image: 'data:image/jpeg;base64,',
            table: this.table(externalDataRetrievedFromServer, ['name','age'])
              
                 

          }]

      };

      const pdf = pdfMake.createPdf(pdfDefinition);
      pdf.open();
    })





    /*
    
        const pdfDefinition: any = {
          content: [
            {
              image: 'data:image/jpeg;base64,',
              
              table: {
                widths: ['*', 200, 'auto'],
                body: [
                [
                  'col 1',
                  'col 2',
                  'col 3'
                ],
                [
                  'campo 1',
                  'campo 2',
                  'campo 3'
                ],
                [
                  'campo 4',
                  'campo 5',
                  'campo 6'
                ],
                ]
              }
            }
          ]
    
        };
    
        const pdf = pdfMake.createPdf(pdfDefinition);
        pdf.open();*/
  }

  consultarClientes() {
    this.clienteService.getClientes().subscribe((res: Cliente[]) => {
      this.clientes = res;
      console.log(this.clientes);
    })
    return this.clientes;
  }

  buildTableBody(data, columns) {

    console.log("ESTOY EN BUILtABLE");
    console.log(data);
    console.log(columns);

    var body = [];

    body.push(columns);

    data.forEach(function (row) {
      var dataRow = [];

      columns.forEach(function (column) {
        dataRow.push(row[column].toString());
      })

      body.push(dataRow);
    });

    return body;
  }

  table(data, columns) {
    console.log('Estoy en table ');
    console.log(data);
    console.log(columns);
    return {
      table: {
        headerRows: 1,
        body: this.buildTableBody(data, columns)
      }
    };
  }



}
