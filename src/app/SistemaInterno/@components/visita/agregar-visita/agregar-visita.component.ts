import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { Pedido } from 'src/app/SistemaInterno/@models/pedido.model';
import { Visita } from 'src/app/SistemaInterno/@models/visita.model';
import { PedidoService } from 'src/app/SistemaInterno/@services/pedido.service';
import { TrabajadorService } from 'src/app/SistemaInterno/@services/trabajador.service';
import { VisitaService } from 'src/app/SistemaInterno/@services/visita.service';
import { Location } from '@angular/common';
import { DialogoConfirmacionComponent } from 'src/app/SistemaPublico/@components/cotizacion/dialogo-confirmacion/dialogo-confirmacion.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-agregar-visita',
  templateUrl: './agregar-visita.component.html',
  styleUrls: ['./agregar-visita.component.css']
})
export class AgregarVisitaComponent implements OnInit {

  visitaForm : FormGroup;
  visita: Visita;
  pedidoForm: FormGroup;
  pedido: Pedido;
  
  constructor(private fb: FormBuilder, public visitaService: VisitaService, public pedidoService: PedidoService, private route: ActivatedRoute, private router: Router, private location: Location, public dialogo: MatDialog) { 
    this.visitaForm = this.fb.group({
      fechaVisita: ["", Validators.required],
      estadoVisita: ["", Validators.required],
      observaciones: ["", Validators.required],
      direccion: ["", Validators.required],
    })
    this.visita = new Visita(0,new Date(),'','','',true, null);

    this.route.params.pipe(switchMap((params : Params) => this.pedidoService.getPedidoPorId(params['idPedido']))).subscribe( (res : Pedido) => {
      this.pedido = res;
    }); 

  }

  ngOnInit(): void {


  }

  guardar(){
    if (this.visitaForm.invalid) {
      console.log("Invalid");
      return;
    }
    this.visita = Object.assign(this.visita, this.visitaForm.value);
    this.visitaService.addVisita(this.visita).subscribe( (res:any) => {
      console.log(res);
      this.router.navigate(["/dashboard/visitas"]);
    });
  }

  guardarVisitaPedido(){
    if (this.visitaForm.invalid) {
      console.log("Invalid");
      return;
    }
    this.visita = Object.assign(this.visita, this.visitaForm.value);
    this.visitaService.addVisitaPedido(this.visita, this.pedido.idPedido).subscribe( (res:any) => {
      console.log(res);
      this.location.back();
      console.log( 'goBack()...' );
    });
  }

  volverAtras(){
    this.location.back();
      console.log( 'goBack()...' );
  }

  confirmar(): void {
    if (this.visitaForm.invalid) {
      console.log("Invalid");
      return;
    }else{
      this.dialogo
      .open(DialogoConfirmacionComponent, {
        data: "¿Estas seguro que quieres agregar la visita?"
      })
      .afterClosed()
      .subscribe((confirmado: Boolean) => {
        if (confirmado) {
          this.guardarVisitaPedido();
        } else {
          this.location.back();
          console.log( 'goBack()...' );
        }
      });
    }
  }

}