import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { CambiarPasswordDTO } from '../models/cambiarPasswordDTO.model';
import { EmailValuesDTO } from '../models/EmailValuesDTO.model';

@Injectable({
  providedIn: 'root'
})
export class CambiarPasswordService {

  constructor(private http: HttpClient) { }


  olvidePassword(emailValuesDto: EmailValuesDTO) {
    return this.http.post('http://localhost:8080/email/send/olvidePassword', emailValuesDto);
  }

  cambiarPassword(cambiarPasswordDTO: CambiarPasswordDTO){
    return this.http.post('http://localhost:8080/email/send/cambiarPassword', cambiarPasswordDTO);
  }
}
