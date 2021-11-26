import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder }  from '@angular/forms';
import {FormsModule,ReactiveFormsModule} from '@angular/forms';
import { Cliente } from 'src/app/SistemaInterno/@models/cliente.model';
import { ClienteService } from 'src/app/SistemaInterno/@services/cliente.service';

@Component({
  selector: 'app-agregar-cliente',
  templateUrl: './agregar-cliente.component.html',
  styleUrls: ['./agregar-cliente.component.css']
})
export class AgregarClienteComponent implements OnInit {

  clienteForm : FormGroup;
  cliente : Cliente;
  constructor(fb: FormBuilder, public clienteService: ClienteService) { 
    this.clienteForm = fb.group({
      nombre: ["", Validators.required],
      apellidoPaterno: ["", Validators.required],
      apellidoMaterno: ["", Validators.required],
      email: ["", Validators.required],
      telefono: ["", Validators.required]
    });
    this.cliente = new Cliente(0, "", "", "", "", "");
  }

  ngOnInit(): void {
  }
  
  ocultarModal() {

  }

  saveData() {
    if (this.clienteForm.invalid) {
      console.log("Invalid");
      return;
    }
    this.cliente = Object.assign(this.cliente, this.clienteForm.value);
    this.clienteService.addCliente(this.cliente).subscribe( (res:any) => {
      console.log(res);
    });

  }
}
