import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { Visita } from 'src/app/SistemaInterno/@models/visita.model';
import { VisitaService } from 'src/app/SistemaInterno/@services/visita.service';

@Component({
  selector: 'app-ver-visita',
  templateUrl: './ver-visita.component.html',
  styleUrls: ['./ver-visita.component.css']
})
export class VerVisitaComponent implements OnInit {

  visita: Visita;

  isDataAvailable : boolean = false;
  panelOpenState = false;

  dataSource: any;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(fb: FormBuilder, public visitaService: VisitaService, private router : Router, private route: ActivatedRoute) { 
  }
  ngOnInit(): void {
    this.route.params.pipe(switchMap((params : Params) => this.visitaService.getVisitaPorId(params['idVisita']))).subscribe( (res : Visita) => {
      console.log(res);
      this.isDataAvailable = true;
      this.visita = res;
    }); 

  }

}
