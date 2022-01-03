import { ThrowStmt } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { ChartDataSets } from 'chart.js';
import { Chart, ChartData } from 'chart.js';
import { Color, Label } from 'ng2-charts';
import { Cliente } from '../../@models/cliente.model';
import { ClienteService } from '../../@services/cliente.service';

import jsPDF from 'jspdf'
import 'jspdf-autotable'
import { Obra } from '../../@models/obra.model';
import { ObraService } from '../../@services/obra.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProductoService } from '../../@services/producto.service';
import { ProductoInforme } from '../../@models/productoInforme.model';
import { ProductoObrasInforme } from '../../@models/ProductoObrasInforme.model';
import { ProductoMayorGanancia } from '../../@models/productoMayorGanancia.model';
import { ClienteMayorCompra } from '../../@models/clienteMayorCompra.model';
import { ClienteMayorGanancia } from '../../@models/clienteMayorGanancia.model';
import { textSpanOverlap } from 'typescript';
import { options } from 'preact';

@Component({
  selector: 'app-informe',
  templateUrl: './informe.component.html',
  styleUrls: ['./informe.component.css']
})
export class InformeComponent implements OnInit {

  clientes: Cliente[] = [];
  listCliente: Cliente[] = [];
  listProductosInforme: ProductoInforme[] = [];

  listProductosPorObras:ProductoObrasInforme[] = [];

  /*
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
  */


  listObra: Obra[];
  obras: Obra[] = [];
  obraForm: FormGroup;

  constructor(private fb: FormBuilder, public clienteService: ClienteService, public obraService: ObraService, public productoService: ProductoService) {
    this.obraForm = this.fb.group({
      obra: ["", Validators.required],
    })
  }

  ngOnInit(): void {
    this.getObras();
  }

  getObras() {
    this.obraService.getObras().subscribe((res: Obra[]) => {
      this.obras = res;
      this.listObra = res;
      console.log(this.obras);
    })
  }


  obtenerProductosDeObra() {
    console.log(this.obraForm.controls['obra'].value);
    var header = [['idPedido', 'CodigoSeguimiento', 'estadoPedido','fechaIngreso', 'fechaEntrega']];
    var tablaProductosObras: any[] = [];
    var tablaElem: any[] = [];
    var titulo;
    var nombreObra;

    this.obraService.getObraPorId(this.obraForm.controls['obra'].value).subscribe ((res: any) =>{
      console.log(res);
      nombreObra = res.nombre;
    });

    console.log(nombreObra);

    titulo = "Todos los pedidos de la obra: ";

    this.obraService.getProductosPorObra(this.obraForm.controls['obra'].value).subscribe((res: ProductoObrasInforme[]) => {

      res.forEach(e => {
        tablaElem.push(e.idPedido);
        tablaElem.push(e.codigoSeguimiento);
        tablaElem.push(e.estadoPedido);
        tablaElem.push(e.fechaIngreso);
        tablaElem.push(e.fechaEntrega);
        tablaProductosObras.push(tablaElem);
        tablaElem = [];
      });
      this.generatePdf(header, tablaProductosObras, titulo);
    });

  }

  obtenerProductosConMayorGananciaPDF(){
    var header = [['nombre', 'categoria', 'descripción','valor']];
    var tablaProductosMayorGanancia: any[] = [];
    var tablaElem: any[] = [];
    var titulo = "Productos con mayor ganancia";

    this.productoService.getProductosMayorGanancia().subscribe((res: ProductoMayorGanancia[]) => {
      res.forEach(e => {
        tablaElem.push(e.nombre);
        tablaElem.push(e.categoria);
        tablaElem.push(e.descripcion);
        tablaElem.push("$"+e.valor);
        tablaProductosMayorGanancia.push(tablaElem);
        tablaElem = [];
      });
      this.generatePdf(header, tablaProductosMayorGanancia,titulo);
    });
  }

  obtenerClientesConMasComprasPDF(){

    var header = [['nombre', 'email', 'telefono','cantidad']];
    var tablaClienteMayorCompra: any[] = [];
    var tablaElem: any[] = [];
    var titulo = "Clientes con más compras";

    this.clienteService.getClienteMayorCompra().subscribe((res: ClienteMayorCompra[]) => {
      res.forEach(e => {
        tablaElem.push(e.nombre+e.apellidoPaterno+e.apellidoMaterno);
        tablaElem.push(e.email);
        tablaElem.push(e.telefono);
        tablaElem.push(e.cantidad);
        tablaClienteMayorCompra.push(tablaElem);
        tablaElem = [];
      });
      this.generatePdf(header, tablaClienteMayorCompra, titulo);
    });

  }

  obtenerClientesConMayorGananciaPDF(){
    var header = [['nombre', 'email', 'telefono','Ganancia']];
    var tablaClienteMayorGanancia: any[] = [];
    var tablaElem: any[] = [];
    var titulo = "Clientes con mayores ganancias";

    this.clienteService.getClienteMayorGanancia().subscribe((res: ClienteMayorGanancia[]) => {
      res.forEach(e => {
        tablaElem.push(e.nombre+e.apellidoPaterno+e.apellidoMaterno);
        tablaElem.push(e.email);
        tablaElem.push(e.telefono);
        tablaElem.push(e.ganancia);
        tablaClienteMayorGanancia.push(tablaElem);
        tablaElem = [];
      });
      this.generatePdf(header, tablaClienteMayorGanancia, titulo);
    });

  }

  obtenerClientesPDF() {
    //PDF
    var header = [['Nombre', 'Correo', 'Teléfono']];
    var tablaClientes: any[] = [];
    var tablaElem: any[] = [];
    var titulo = "Todos los clientes";

    this.clienteService.getClientes().subscribe((res: Cliente[]) => {
      this.listCliente = res;
      console.log(this.listCliente);

      res.forEach(e => {
        tablaElem.push(e.nombre + e.apellidoPaterno + e.apellidoMaterno);
        tablaElem.push(e.email);
        tablaElem.push(e.telefono);

        tablaClientes.push(tablaElem);
        tablaElem = [];
      });
      this.generatePdf(header, tablaClientes, titulo);
    });
  }

  obtenerProductosMasCompradosPDF() {
    //PDF
    var header = [['Nombre', 'Precio', 'Cantidad','TOTAL']];
    var tablaProductos: any[] = [];
    var tablaElem: any[] = [];
    var titulo = "Productos más comprados";

    this.productoService.getDatosInformes().subscribe((res: ProductoInforme[]) => {

      this.listProductosInforme = res;
      console.log(this.listProductosInforme);

      res.forEach(e => {
        tablaElem.push(e.nombre);
        tablaElem.push("$"+e.precio);
        tablaElem.push(e.cantidad);
        tablaElem.push("$"+e.precio*e.cantidad);

        tablaProductos.push(tablaElem);
        tablaElem = [];
      });
      this.generatePdf(header, tablaProductos, titulo);
    });

  }

  generatePdf(header: any, tableData: any, titulo: string) {
    var img = new Image();
    img.src = 'assets/img/banner.jpg'
    var pdf = new jsPDF();

    //pdf.setFont(20%);
    //addImage(imageData, format, x, y, width, height, alias, compression, rotation)
    pdf.addImage(img,'jpg',78,5,58,14);
    
    //pdf.text('\nDuctos Ortiz Spa', 74, 8);
    pdf.setFontSize(18);
    pdf.setTextColor(55);

    pdf.text('Informe de: '+titulo, 14, 34);

  


    (pdf as any).autoTable({
      head: header,
      body: tableData,
      theme: 'striped',
      margin: {top: 38},
      didDrawCell: data => {
        //console.log(data.column.index)
      }
    })

    // Open PDF document in browser's new tab
    pdf.output('dataurlnewwindow')

    // Download PDF doc  
    pdf.save('table.pdf');
  }

}