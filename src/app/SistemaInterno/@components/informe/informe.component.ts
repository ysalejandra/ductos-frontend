import { ThrowStmt } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { ChartDataSets } from 'chart.js';
import { Chart, ChartData } from 'chart.js';
import { Color, Label } from 'ng2-charts';
import { Cliente } from '../../@models/cliente.model';
import { ClienteService } from '../../@services/cliente.service';

import jsPDF from 'jspdf'
import 'jspdf-autotable'

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

  ngOnInit(): void {}

  shuffeData() {

  }

  obtenerClientesPDF() {

    //PDF
    var header = [['Nombre', 'Correo', 'Teléfono']];
    var tablaClientes: any[] = [];
    var tablaElem: any[] = [];

    this.clienteService.getClientes().subscribe((res: Cliente[]) => {
      this.listCliente = res;
      console.log(this.listCliente);

      res.forEach( e => {
        tablaElem.push(e.nombre+e.apellidoPaterno+e.apellidoMaterno);
        tablaElem.push(e.email);
        tablaElem.push(e.telefono);

        tablaClientes.push(tablaElem);
        tablaElem = [];
      });
      this.generatePdf(header,tablaClientes);
    });
  }

  generatePdf(header: any , tableData: any) {
    var pdf = new jsPDF();

    //pdf.setFont(20%);
    pdf.text('Ductos Ortiz Spa', 11, 8);
    pdf.setFontSize(12);
    pdf.setTextColor(99);


    (pdf as any).autoTable({
    head: header,
    body: tableData,
    theme: 'plain',
    didDrawCell: data => {
        //console.log(data.column.index)
    }
    })

    // Open PDF document in browser's new tab
    pdf.output('dataurlnewwindow')

    // Download PDF doc  
    //pdf.save('table.pdf');
}  

}