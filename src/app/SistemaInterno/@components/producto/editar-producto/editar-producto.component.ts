import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { Producto } from 'src/app/SistemaInterno/@models/producto.model';
import { ProductoService } from 'src/app/SistemaInterno/@services/producto.service';

@Component({
  selector: 'app-editar-producto',
  templateUrl: './editar-producto.component.html',
  styleUrls: ['./editar-producto.component.css']
})
export class EditarProductoComponent implements OnInit {


  productoForm : FormGroup;
  producto: Producto | undefined;
  
  constructor(fb: FormBuilder, public productoService: ProductoService, private router : Router, private route: ActivatedRoute) { 
    this.productoForm = fb.group({
      idDetalle: [0, Validators.required],
      nombre: ["", Validators.required],
      descripcion: ["", Validators.required],
      categoria: ["", Validators.required],
      cantidad: [0, Validators.required],
      valor: [0, Validators.required]
    });

    this.route.params.pipe(switchMap((params : Params) => this.productoService.getProductoPorId(+params['idDetalle']))).subscribe( (res : Producto) => {
      this.producto = res;
      this.productoForm?.patchValue(this.producto);
    }); 
  }

  ngOnInit(): void {
  }

  saveData() {
    if (this.productoForm.invalid) {
      console.log("Invalid");
      return;
    }
    this.producto = Object.assign(this.producto, this.productoForm.value);
    this.productoService.editProducto(this.productoForm.value).subscribe(res => console.log(res));
    this.router.navigate(["/dashboard/productos"]);
  }
}
