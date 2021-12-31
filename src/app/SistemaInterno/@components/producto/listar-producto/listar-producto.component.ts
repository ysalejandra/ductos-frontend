import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Producto } from 'src/app/SistemaInterno/@models/producto.model';
import { ClienteService } from 'src/app/SistemaInterno/@services/cliente.service';
import { ProductoService } from 'src/app/SistemaInterno/@services/producto.service';
import { MatSort, MatSortModule } from '@angular/material/sort';


@Component({
  selector: 'app-listar-producto',
  templateUrl: './listar-producto.component.html',
  styleUrls: ['./listar-producto.component.css']
})
export class ListarProductoComponent implements OnInit {

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  listProducto: Producto[] | undefined;
  dataSourse: any;
  displayedColumns: string[] = ['nombre', 'categoria', 'valor', 'acciones'];

  productosCargados: boolean = false;
  productos: Producto[] = [];
  p: number = 1;

  dataSource: any;

  constructor(public productoService: ProductoService, public clienteService: ClienteService,
    private router: Router) { }

  ngOnInit(): void {
    this.getProductos();
  }

  getProductos() {
    this.productoService.getProductos().subscribe((res: Producto[]) => {
      this.productos = res;
      this.listProducto = res;
      console.log(this.productos);
      this.productosCargados = true;
      this.dataSource = new MatTableDataSource(this.listProducto);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    })
  }

  eliminarProducto(id: number) {
    console.log(id);
    this.productoService.borrarProducto(id).subscribe((res: any) => {
      this.ngOnInit();
    });

  }

  agregar() {
    this.router.navigate(["/productos/agregar"]);
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }




}
