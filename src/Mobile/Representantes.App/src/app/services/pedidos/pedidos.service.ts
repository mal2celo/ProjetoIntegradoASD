import { Injectable } from '@angular/core';
import { StatusPedido } from 'src/app/enums/Enums';
import { DatabaseService } from '../database/database';

@Injectable({
  providedIn: 'root'
})
export class PedidosService {

  constructor(private databaseService: DatabaseService) { }

  public insert(pObj: Pedido) {
    let sql = `insert into Pedido (status, data_pedido, cliente_id, representante_id, observacao) values (?, ?, ?, ?, ?)`;
    let data = [pObj.status, pObj.data_pedido, pObj.cliente_id, pObj.representante_id, pObj.observacao];

    return this.databaseService.db.executeSql(sql, data)
      .catch((e) => console.error(e));
  }

  public update(pObj: Pedido) {
    let sql = `update Pedido set status = ?, data_pedido = ?, cliente_id = ?, representante_id = ?, observacao = ? where id = ?`;
    let data = [pObj.status, pObj.data_pedido, pObj.cliente_id, pObj.representante_id, pObj.observacao, pObj.id];

    return this.databaseService.db.executeSql(sql, data)
      .catch((e) => console.error(e));
  }

  public getMaxId(){
    let sql = 'select MAX(id) as seq from "Pedido"';
    let data = [];
    return this.databaseService.db.executeSql(sql, data)
      .then((data: any) => {
        if (data.rows.length > 0) {
          let item = data.rows.item(0);
          return item.seq + 1;
        }
        return null;
      })
      .catch((e) => console.error(e));
  }

  public get(id: number) {
    let sql = 'select * from Pedido where id = ?';
    let data = [id];

    return this.databaseService.db.executeSql(sql, data)
      .then((data: any) => {
        if (data.rows.length > 0) {
          let item = data.rows.item(0);
          let obj = new Pedido();
          obj.id = item.id;
          obj.status = item.status;
          obj.data_pedido = item.data_pedido;
          obj.cliente_id = item.cliente_id;
          obj.representante_id = item.representante_id;
          obj.observacao = item.observacao;
          return obj;
        }

        return null;
      })
      .catch((e) => console.error(e));
  }

  public getAll(pRaca: string = null) {
    let sql = `
      SELECT 
        p.*,
        c.nome as nome_cliente
      FROM Pedido AS p
      INNER JOIN Cliente AS c
        ON p.cliente_id = c.id
      `;
    var data: any[] = [];

    sql += ' order by p.id desc';

    return this.databaseService.db.executeSql(sql, data)
      .then((data: any) => {
        if (data.rows.length > 0) {
          let pedidos: any[] = [];
          for (var i = 0; i < data.rows.length; i++) {
            var pedido = data.rows.item(i);

            switch(pedido.status){
              case StatusPedido.Elaboracao:
                pedido.desc_status = "Em Elaboração";
                break;
              case StatusPedido.Enviado:
                pedido.desc_status = "Enviado";
                break;
              case StatusPedido.Aprovado:
                pedido.desc_status = "Aprovado";
                break;
              case StatusPedido.Reprovado:
                pedido.desc_status = "Reprovado";
                break;
            }

            pedidos.push(pedido);
          }
          return pedidos;
        } else {
          return [];
        }
      })
      .catch((e) => console.error(e));
  }

  getBySincronismo(){
    let sql = `
      SELECT 
          p.id AS id,
          p.data_pedido AS dataPedido,
          p.status AS status,
          p.cliente_id AS clienteId,
          p.representante_id AS representanteId,
          p.observacao AS observacao
      FROM Pedido AS p 
      WHERE p.status = 1 
      ORDER BY p.id desc`;

    let sqlItem = `
      SELECT 
        ip.id AS id,
        ip.pedido_id AS pedidoId,
        ip.produto_id AS produtoId,
        ip.quantidade AS quantidade,
        ip.valor_venda AS valorVenda,
        ip.observacao AS observacao
      FROM ItemPedido AS ip 
      WHERE ip.pedido_id = ? `;

    return this.databaseService.db.executeSql(sql, [])
      .then((data: any) => {
        if (data.rows.length > 0) {
          let pedidos: any[] = [];
          for (var i = 0; i < data.rows.length; i++) {
            var pedido = data.rows.item(i);
            pedido.itens = [];
            this.databaseService.db.executeSql(sqlItem, [pedido.id]).then((itens: any) => {
              pedido.itens = [];
              for (var i = 0; i < itens.rows.length; i++) {
                var itemPedido = itens.rows.item(i);
                pedido.itens.push(itemPedido);
              }
            });
            pedidos.push(pedido);
          }
          return pedidos;
        } else {
          return [];
        }
      })
      .catch((e) => console.error(e));
  }
}

/**
      "itens": [
        {
          "id": 0,
          "pedidoId": 0,
          "produtoId": 0,
          "quantidade": 0,
          "valorVenda": 0,
          "observacao": "string"
        }
 */

export class Pedido {
  id: number;
  status: number;
  data_pedido: string;
  cliente_id: number;
  representante_id: number;
  observacao: string;

  constructor(pJson: any = null) {
    if (pJson != null) {
      this.id = pJson.id;
      this.status = pJson.status;
      this.data_pedido = pJson.data_pedido;
      this.cliente_id = pJson.cliente_id;
      this.representante_id = pJson.representante_id;
      this.observacao = pJson.observacao;
    }
  }
}

