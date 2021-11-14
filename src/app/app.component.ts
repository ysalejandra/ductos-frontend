import { Component, SystemJsNgModuleLoader } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { Cliente } from './models/ICliente';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'DuctosOrtizSpaFrontend';

  constructor(){}

}
