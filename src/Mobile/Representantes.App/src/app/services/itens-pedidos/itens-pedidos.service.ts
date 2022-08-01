import { Injectable } from '@angular/core';
import { DatabaseService } from '../database/database';

@Injectable({
  providedIn: 'root'
})
export class ItensPedidosService {
  constructor(private databaseService: DatabaseService) { }

  public insert(pObj: ItemPedido) {
    let sql = `insert into ItemPedido (pedido_id, produto_id, quantidade, valor_venda, observacao) values (?, ?, ?, ?, ?)`;
    let data = [pObj.pedido_id, pObj.produto_id, pObj.quantidade, pObj.valor_venda, pObj.observacao];

    return this.databaseService.db.executeSql(sql, data)
      .catch((e) => console.error(e));
  }

  public insertComId(pObj: ItemPedido) {
    let sql = `insert into ItemPedido (id, pedido_id, produto_id, quantidade, valor_venda, observacao) values (?, ?, ?, ?, ?, ?)`;
    let data = [pObj.id, pObj.pedido_id, pObj.produto_id, pObj.quantidade, pObj.valor_venda, pObj.observacao];

    return this.databaseService.db.executeSql(sql, data)
      .catch((e) => console.error(e));
  }

  public update(pObj: ItemPedido) {
    let sql = `update ItemPedido set pedido_id = ?, produto_id = ?, quantidade = ?, valor_venda = ?, observacao = ? where id = ?`;
    let data = [pObj.pedido_id, pObj.produto_id, pObj.quantidade, pObj.valor_venda, pObj.observacao, pObj.id];

    return this.databaseService.db.executeSql(sql, data)
      .catch((e) => console.error(e));
  }

  public get(id: number) {
    let sql = 'select * from ItemPedido where id = ?';
    let data = [id];

    return this.databaseService.db.executeSql(sql, data)
      .then((data: any) => {
        if (data.rows.length > 0) {
          let item = data.rows.item(0);
          let obj = new ItemPedido();
          obj.id = item.id;
          obj.pedido_id = item.pedido_id;
          obj.produto_id = item.produto_id;
          obj.quantidade = item.quantidade;
          obj.valor_venda = item.valor_venda;
          obj.observacao = item.observacao;

          return obj;
        }

        return null;
      })
      .catch((e) => console.error(e));
  }

  public getAll(pedido_id: number) {
    let sql = `
      SELECT 
        ip.id,
        ip.valor_venda AS valor_unitario,
        (ip.valor_venda) * ip.quantidade AS valor_total,
        ip.quantidade,
        p.codigo,
        p.descricao
      FROM 
        ItemPedido ip
        INNER JOIN Produto p
          ON ip.produto_id = p.id 
      WHERE 
        ip.pedido_id = ? `;
    var data: any[] = [pedido_id];

    sql += ' order by ip.id desc';

    return this.databaseService.db.executeSql(sql, data)
      .then((data: any) => {
        if (data.rows.length > 0) {
          let itens: any[] = [];
          for (var i = 0; i < data.rows.length; i++) {
            var item = data.rows.item(i);
            item.valor_unitario = item.valor_unitario / 100;
            item.valor_total = item.valor_total / 100;
            itens.push(item);
          }
          return itens;
        } else {
          return [];
        }
      })
      .catch((e) => console.error(e));
  }
}

export class ItemPedido {
  id: number;
  pedido_id: number;
  produto_id: number;
  quantidade: number;
  valor_venda: number;
  observacao: string;

  constructor(pJson: any = null) {
    if (pJson != null) {
      this.id = pJson.id;
      this.pedido_id = pJson.pedidoId;
      this.produto_id = pJson.produtoId;
      this.quantidade = pJson.quantidade;
      this.valor_venda = pJson.valorVenda;
      this.observacao = pJson.observacao;
    }
  }
}
