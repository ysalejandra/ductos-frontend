import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
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

  isDataAvailable : boolean = false;
  visita: Visita;

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
