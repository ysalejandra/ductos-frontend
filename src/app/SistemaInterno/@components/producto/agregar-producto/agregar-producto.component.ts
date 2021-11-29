import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Producto } from 'src/app/SistemaInterno/@models/producto.model';
import { ProductoService } from 'src/app/SistemaInterno/@services/producto.service';

@Component({
  selector: 'app-agregar-producto',
  templateUrl: './agregar-producto.component.html',
  styleUrls: ['./agregar-producto.component.css']
})
export class AgregarProductoComponent implements OnInit {

  productoForm : FormGroup;
  producto: Producto;
  
  constructor(private fb: FormBuilder, public productoService: ProductoService, private router: Router) { 
    this.productoForm = this.fb.group({
      nombre: ["", Validators.required],
      descripcion: ["", Validators.required],
      categoria: ["", Validators.required],
      valor: ["", Validators.required],
      cantidad: ["", Validators.required],
    })
    this.producto = new Producto(0,'','','',0,0);
  }

  ngOnInit(): void {
  }

  guardar(){
    if (this.productoForm.invalid) {
      console.log("Invalid");
      return;
    }
    this.producto = Object.assign(this.producto, this.productoForm.value);
    this.productoService.addProducto(this.producto).subscribe( (res:any) => {
    this.router.navigate(["/interno/productos"]);
      console.log(res);
    });

  }

}
