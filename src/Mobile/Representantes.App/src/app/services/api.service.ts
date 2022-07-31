import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { environment, SERVER_URL } from '../../environments/environment';
import { AnyForUntypedForms } from '@angular/forms';


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

  sincronizar(pedidos: any[], token: string) {

    let httpOptions = new  HttpHeaders({
      'Content-Type': 'application/json',
      'accept': '*/*',
      'Authorization': token
    });

    var data = {
      pedidos: pedidos,
    };

    return this.http.post(
        SERVER_URL + '/Sincronismos/sincronizar', 
        data,
        {
          headers: httpOptions
        }
      ).toPromise();
  } 


}
