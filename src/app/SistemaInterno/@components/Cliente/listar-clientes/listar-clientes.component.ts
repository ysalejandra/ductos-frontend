import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Cliente } from 'src/app/SistemaInterno/@models/cliente.model';
import { ClienteService } from 'src/app/SistemaInterno/@services/cliente.service';




@Component({
  selector: 'app-listar-clientes',
  templateUrl: './listar-clientes.component.html',
  styleUrls: ['./listar-clientes.component.css']
})
export class ListarClientesComponent implements OnInit {
  
  displayedColumns: string[] = ['nombre', 'apellido paterno', 'apellido materno', 'correo'];


  clientesCargados:boolean= false;
  clientes: Cliente[] = [];
  p: number = 1;
  constructor(public clienteService: ClienteService, private router : Router) {

   }

  ngOnInit(): void {
    this.getProductos();
  }

  getProductos() {
    this.clienteService.getClientes().subscribe( (res : Cliente[]) => {
      this.clientes = res;
      console.log(this.clientes);
      this.clientesCargados = true;

    })
  }

}
