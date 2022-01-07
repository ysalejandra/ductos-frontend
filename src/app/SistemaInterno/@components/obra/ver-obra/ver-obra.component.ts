import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { Obra } from 'src/app/SistemaInterno/@models/obra.model';
import { ObraService } from 'src/app/SistemaInterno/@services/obra.service';
import { VisitaService } from 'src/app/SistemaInterno/@services/visita.service';

@Component({
  selector: 'app-ver-obra',
  templateUrl: './ver-obra.component.html',
  styleUrls: ['./ver-obra.component.css']
})
export class VerObraComponent implements OnInit {

  isDataAvailable : boolean = false;
  panelOpenState = false;
  obra: Obra;
  dataSource: any;


  constructor(private obraService: ObraService,  private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.params.pipe(switchMap((params : Params) => this.obraService.getObraPorId(+params['idObra']))).subscribe( (res: Obra) => {
      console.log(res);
      this.isDataAvailable = true;
      this.obra = res;
    });
  }
}
