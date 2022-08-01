
import { Injectable } from '@angular/core';
import { ApiService } from '../api.service';
import { DatabaseService } from '../database/database';
import { Pedido, PedidosService } from 'src/app/services/pedidos/pedidos.service';
import { Produto, ProdutosService } from 'src/app/services/produtos/produtos.service';
import { ClientesService, Cliente } from 'src/app/services/clientes/clientes.service';
import { ItemPedido, ItensPedidosService } from 'src/app/services/itens-pedidos/itens-pedidos.service';

@Injectable({
  providedIn: 'root'
})
export class SincronizacaoService {

  constructor(
    private apiService: ApiService,
    private pedidos: PedidosService,
    private itensPedidos: ItensPedidosService,
    private clientes: ClientesService,
    private produtos: ProdutosService,
    private db: DatabaseService,
  ) { }

  public sincronizar(token: string){

    return this.pedidos.getBySincronismo().then((list: any[]) => {

      return this.apiService.sincronizar(list, token).then((data: any) => {
        if(data){

          console.log(data);
          
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

            if(data.pedidos){
              data.pedidos.forEach(pedido => {
                this.pedidos.insertComId(new Pedido(pedido));

                if(pedido.itens){
                  pedido.itens.forEach(itemPedido => {
                    this.itensPedidos.insertComId(new ItemPedido(itemPedido));
                  });
                }
              })
            }
          });
        }
      });
    });

  }
}
