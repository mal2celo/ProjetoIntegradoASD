import { Produto, ProdutosService } from 'src/app/services/produtos/produtos.service';
import { ClientesService, Cliente } from 'src/app/services/clientes/clientes.service';
import { PedidosService } from 'src/app/services/pedidos/pedidos.service';
import { Injectable } from '@angular/core';
import { ApiService } from '../api.service';
import { DatabaseService } from '../database/database';

@Injectable({
  providedIn: 'root'
})
export class SincronizacaoService {

  constructor(
    private apiService: ApiService,
    private pedidos: PedidosService,
    private clientes: ClientesService,
    private produtos: ProdutosService,
    private db: DatabaseService,
  ) { }

  public sincronizar(token: string){

    return this.pedidos.getBySincronismo().then((list: any[]) => {
      
      let promiseChain: Promise<any> = Promise.resolve();

      console.log(list);
      
      return this.apiService.sincronizar(list, token).then((data: any) => {
        if(data){

          console.log(data);
          
          return new Promise( resolve => setTimeout(resolve, 3000) );
          this.db.resetDb().then(() => {
            if(data.clientes){
              data.clientes.forEach(element => {
                this.clientes.insert(new Cliente(element));
              })
            }
  
            if(data.produtos){
              data.produtos.forEach(element => {
                this.produtos.insert(new Produto(element));
              })
            }

          });
        }
        console.log(data);
      });
    })

    //return new Promise( resolve => setTimeout(resolve, 3000) );
  }
}
