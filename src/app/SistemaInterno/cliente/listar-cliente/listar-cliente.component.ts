import { Component, OnInit } from '@angular/core';
import { Cliente } from 'src/app/models/ICliente';
import { ClienteService } from '../cliente.service';

@Component({
  selector: 'app-listar-cliente',
  templateUrl: './listar-cliente.component.html',
  styleUrls: ['./listar-cliente.component.css']
})
export class ListarClienteComponent implements OnInit {
  
  clientes: Cliente[] = [];
  clientesCargados: boolean = true;

  constructor(public clienteService: ClienteService) { }

  ngOnInit(): void {
    this.getClientes();
  }

  getClientes() {
    this.clienteService.getClientes().subscribe(res => {
      this.clientes = res;
      console.log(this.clientes);
      this.clientesCargados = true;
    },
      error => {console.error(error)}
    );
  }

}
