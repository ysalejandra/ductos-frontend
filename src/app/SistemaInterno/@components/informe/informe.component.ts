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
import { ProductoMayorGanancia } from '../../@models/productoMayorGanancia.model';
import { ClienteMayorCompra } from '../../@models/clienteMayorCompra.model';
import { ClienteMayorGanancia } from '../../@models/clienteMayorGanancia.model';
import { textSpanOverlap } from 'typescript';
import { options } from 'preact';
import { HttpClient } from '@angular/common/http';
import { PedidoObrasInforme } from '../../@models/PedidoObrasInforme.model';

@Component({
  selector: 'app-informe',
  templateUrl: './informe.component.html',
  styleUrls: ['./informe.component.css']
})
export class InformeComponent implements OnInit {

  clientes: Cliente[] = [];
  listCliente: Cliente[] = [];
  listProductosInforme: ProductoInforme[] = [];

  listProductosPorObras:PedidoObrasInforme[] = [];
  listObra: Obra[];
  obras: Obra[] = [];
  obraForm: FormGroup;

  fechaForm: FormGroup;
  
  fechaIn: Date; 
  fechaFi: Date;

  fechaInFormat: string; 
  fechaFiFormat: string;

  constructor(private fb: FormBuilder, public clienteService: ClienteService, public obraService: ObraService, public productoService: ProductoService, private httpClient: HttpClient) {
    this.obraForm = this.fb.group({
      obra: ["", Validators.required],
    })
    this.fechaForm = this.fb.group({
      fechaInicio: ["", Validators.required],
      fechaFin: ["", Validators.required],
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
    var header = [['Id del Pedido', 'Codigo de Seguimiento', 'Estado del pedido','Fecha de Ingreso', 'Fecha de Entrega']];
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

    this.obraService.getPedidosPorObra(this.obraForm.controls['obra'].value).subscribe((res: PedidoObrasInforme[]) => {

      res.forEach(e => {
        tablaElem.push(e.idPedido);
        tablaElem.push(e.codigoSeguimiento);

        if(e.estadoPedido == "1"){
          tablaElem.push("Recibido");
        }else{
          if(e.estadoPedido == "2"){
            tablaElem.push("En Proceso");
          }else{
            if(e.estadoPedido == "3"){
              tablaElem.push("Finalizado");

            }
          }
        }

        //tablaElem.push(e.estadoPedido);
        tablaElem.push(e.fechaIngreso[2]+"-"+e.fechaIngreso[1]+"-"+e.fechaIngreso[0]);
        tablaElem.push(e.fechaEntrega[2]+"-"+e.fechaEntrega[1]+"-"+e.fechaEntrega[0]);
        tablaProductosObras.push(tablaElem);
        tablaElem = [];
      });
      this.generatePdfSinFechas(header, tablaProductosObras, titulo);
    });

  }

  obtenerProductosConMayorGananciaPDF(){
    var header = [['Nombre', 'Categoria', 'Descripción','Valor']];
    var tablaProductosMayorGanancia: any[] = [];
    var tablaElem: any[] = [];
    var titulo = "Productos con mayor ganancia";
    var total = 0;


    //Formatear fecha
    this.fechaIn = this.fechaForm.controls['fechaInicio'].value;
    this.fechaFi = this.fechaForm.controls['fechaFin'].value

    this.fechaInFormat = this.fechaIn.toJSON().split('T')[0];
    this.fechaFiFormat = this.fechaFi.toJSON().split('T')[0];

    this.productoService.getProductosMayorGanancia(this.fechaInFormat, this.fechaFiFormat).subscribe((res: ProductoMayorGanancia[]) => {
      res.forEach(e => {
        tablaElem.push(e.nombre);
        tablaElem.push(e.categoria);
        tablaElem.push(e.descripcion);
        tablaElem.push("$"+ this.numberWithCommas(e.valor));
        total += +e.valor;
        tablaProductosMayorGanancia.push(tablaElem);
        tablaElem = [];
      });
        tablaElem.push('');
        tablaElem.push('');
        tablaElem.push('TOTAL:');
        tablaElem.push("$"+ this.numberWithCommas(total));
        tablaProductosMayorGanancia.push(tablaElem);
        this.generatePdf(header, tablaProductosMayorGanancia,titulo);
    });
  }

  obtenerClientesConMasComprasPDF(){

    var header = [['Nombre', 'Correo', 'Teléfono','Pedidos']];
    var tablaClienteMayorCompra: any[] = [];
    var tablaElem: any[] = [];
    var titulo = "Clientes con más compras";

    //Formatear fecha
    this.fechaIn = this.fechaForm.controls['fechaInicio'].value;
    this.fechaFi = this.fechaForm.controls['fechaFin'].value

    this.fechaInFormat = this.fechaIn.toJSON().split('T')[0];
    this.fechaFiFormat = this.fechaFi.toJSON().split('T')[0];

    this.clienteService.getClienteMayorCompra(this.fechaInFormat, this.fechaFiFormat).subscribe((res: ClienteMayorCompra[]) => {
      res.forEach(e => {
        tablaElem.push(e.nombre+" "+e.apellidoPaterno+" "+e.apellidoMaterno);
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
    var header = [['Nombre', 'Correo', 'Teléfono','Ganancia']];
    var tablaClienteMayorGanancia: any[] = [];
    var tablaElem: any[] = [];
    var titulo = "Clientes con mayores ganancias";
    var total = 0;

    //Formatear fecha
    this.fechaIn = this.fechaForm.controls['fechaInicio'].value;
    this.fechaFi = this.fechaForm.controls['fechaFin'].value

    this.fechaInFormat = this.fechaIn.toJSON().split('T')[0];
    this.fechaFiFormat = this.fechaFi.toJSON().split('T')[0];

    this.clienteService.getClienteMayorGanancia(this.fechaInFormat, this.fechaFiFormat).subscribe((res: ClienteMayorGanancia[]) => {
      res.forEach(e => {
        tablaElem.push(e.nombre+" "+e.apellidoPaterno+" "+e.apellidoMaterno);
        tablaElem.push(e.email);
        tablaElem.push(e.telefono);
        tablaElem.push("$"+this.numberWithCommas(e.ganancia));
        total += e.ganancia;
        tablaClienteMayorGanancia.push(tablaElem);
        tablaElem = [];
      });
        tablaElem.push('');
        tablaElem.push('');
        tablaElem.push('TOTAL:');
        tablaElem.push("$"+ this.numberWithCommas(total));
        tablaClienteMayorGanancia.push(tablaElem);
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
      this.generatePdfSinFechas(header, tablaClientes, titulo);
    });
  }

  obtenerProductosMasCompradosPDF() {
    //PDF
    var header = [['Nombre', 'Precio', 'Cantidad','Ingreso']];
    var tablaProductos: any[] = [];
    var tablaElem: any[] = [];
    var titulo = "Productos más vendidos";
    var total = 0;
    var multi = 0; 

    //Formatear fecha
    this.fechaIn = this.fechaForm.controls['fechaInicio'].value;
    this.fechaFi = this.fechaForm.controls['fechaFin'].value

    this.fechaInFormat = this.fechaIn.toJSON().split('T')[0];
    this.fechaFiFormat = this.fechaFi.toJSON().split('T')[0];

    this.productoService.getProductosMasCompradosInformes(this.fechaInFormat, this.fechaFiFormat).subscribe((res: ProductoInforme[]) => {

      this.listProductosInforme = res;
      console.log(this.listProductosInforme);

      res.forEach(e => {
        tablaElem.push(e.nombre);
        tablaElem.push("$"+this.numberWithCommas(e.precio));
        tablaElem.push(e.cantidad);
        multi = e.precio*e.cantidad;
        total += multi;
        tablaElem.push("$"+this.numberWithCommas(multi));
        tablaProductos.push(tablaElem);
        tablaElem = [];
      });
      tablaElem.push('');
        tablaElem.push('');
        tablaElem.push('TOTAL:');
        tablaElem.push("$"+ this.numberWithCommas(total));
        tablaProductos.push(tablaElem);
        this.generatePdf(header, tablaProductos,titulo);
    });

  }

  numberWithCommas(x) {
    return x.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ".");
  }

  obtenerMes(mes : number) {
    if (mes == 0) {
      return 'Enero';
    } else if (mes === 1) {
      return 'Febrero';
    } else if (mes === 2) {
      return 'Marzo';
    } else if (mes === 3) {
      return 'Abril';
    } else if (mes === 4) {
      return 'Mayo';
    } else if (mes === 5) {
      return 'Junio';
    } else if (mes === 6) {
      return 'Julio';
    } else if (mes === 7) {
      return 'Agosto';
    } else if (mes === 8) {
      return 'Septiembre';
    } else if (mes === 9) {
      return 'Octubre';
    } else if (mes === 10) {
      return 'Noviembre';
    } else {
      return 'Diciembre'
    }
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

    var anioIn = this.fechaIn.getFullYear();
    var mesIn = this.fechaIn.getMonth();
    var diaIn = this.fechaIn.getDate();

    var anioFi = this.fechaFi.getFullYear();
    var mesFi = this.fechaFi.getMonth();
    var diaFi = this.fechaFi.getDate();

    var inicio = diaIn + " de " + this.obtenerMes(mesIn) + " del " + anioIn;
    var fin = diaFi + " de " + this.obtenerMes(mesFi) + " del " + anioFi;
    
    var hoy = new Date();


    pdf.text(titulo, 14, 34);
    pdf.setFontSize(12);
    pdf.text("Desde el " + inicio + " hasta el " + fin, 14, 42);
    pdf.setFontSize(10);
    pdf.text("Generado el " + hoy.getDate() + " de " + this.obtenerMes(hoy.getMonth()) + " del " + hoy.getFullYear(), 14, 50);

    (pdf as any).autoTable({
      head: header,
      body: tableData,
      columnStyles: {
        3 : {
          halign: 'right'
        }
      },
      theme: 'striped',
      margin: {top: 55},
      didDrawCell: data => {
        //console.log(data.column.index)
      }
    })

    // Open PDF document in browser's new tab
    pdf.output('dataurlnewwindow')

    // Download PDF doc  
    pdf.save('table.pdf');
  }


  generatePdfSinFechas(header: any, tableData: any, titulo: string) {
    var img = new Image();
    img.src = 'assets/img/banner.jpg'
    var pdf = new jsPDF();

    //pdf.setFont(20%);
    //addImage(imageData, format, x, y, width, height, alias, compression, rotation)
    pdf.addImage(img,'jpg',78,5,58,14);
    
    //pdf.text('\nDuctos Ortiz Spa', 74, 8);
    pdf.setFontSize(18);
    pdf.setTextColor(55);
    
    var hoy = new Date();

    pdf.text(titulo, 14, 34);
    pdf.setFontSize(10);
    pdf.text("Generado el " + hoy.getDate() + " de " + this.obtenerMes(hoy.getMonth()) + " del " + hoy.getFullYear(), 14, 50);

    (pdf as any).autoTable({
      head: header,
      body: tableData,
      columnStyles: {
        3 : {
          halign: 'right'
        }
      },
      theme: 'striped',
      margin: {top: 55},
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