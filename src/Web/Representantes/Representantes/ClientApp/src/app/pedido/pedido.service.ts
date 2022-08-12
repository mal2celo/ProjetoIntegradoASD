import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { AccountService } from '../account/shared/account.service';

@Injectable({
  providedIn: 'root'
})
export class PedidoService {
  token: string = "";
  
  constructor(private http: HttpClient, private accountService: AccountService,) {

  }

  dadosDoUsuario(){
    let payloadToken: any = this.accountService.getPayloadToken();
    if(payloadToken){
      if(payloadToken.nome){
        this.token = payloadToken.to;
      } 
    }
  }

  async consultarPedidos() {
    const result = await this.http.post<any>(`${environment.api}/Pedidos/consultar_pedidos`, {}, this.getRequestOptions()).toPromise();
    return result;
  }

  async consultarPedido(id: number) {
    const result = await this.http.post<any>(`${environment.api}/Pedidos/consultar_pedido`, { "id": id }, this.getRequestOptions()).toPromise();
    return result;
  }

  async aprovarPedido(id: number) {
    const result = await this.http.post<any>(`${environment.api}/Pedidos/aprovar_pedido`, { "id": id }, this.getRequestOptions()).toPromise();
    return result;
  }

  async reprovarPedido(id: number) {
    const result = await this.http.post<any>(`${environment.api}/Pedidos/reprovar_pedido`, { "id": id }, this.getRequestOptions()).toPromise();
    return result;
  }

  getRequestOptions(){
    const auth_token = this.accountService.getAuthorizationToken() + "";

    const headers = new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': auth_token
      });

    return { headers: headers };
  }

}
