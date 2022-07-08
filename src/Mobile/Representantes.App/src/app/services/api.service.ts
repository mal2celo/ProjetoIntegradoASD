import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { environment, SERVER_URL } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  // Http Options
  httpOptions = new  HttpHeaders({
    'Content-Type': 'application/json',
    'accept': '*/*'
  });

  constructor(
    public http: HttpClient
  ) { }

  login(matricula: string, senha: string) {
    var data = {
      matricula: matricula,
      senha: senha
    };

    return this.http.post(
        SERVER_URL + '/Usuarios/authenticate', 
        data,
        {
          headers: this.httpOptions
        }
      ).toPromise();
  }


}
