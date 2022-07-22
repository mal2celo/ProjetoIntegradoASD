import { Injectable } from '@angular/core';
import { StatusPedido } from 'src/app/enums/Enums';
import { DatabaseService } from '../database/database';

@Injectable({
  providedIn: 'root'
})
export class PedidosService {

  constructor(private databaseService: DatabaseService) { }

  public insert(pObj: Pedido) {
    let sql = `insert into Pedido (cliente_id, data, status, observacao) values (?, ?, ?, ?)`;
    let data = [pObj.cliente_id, pObj.data, pObj.status, pObj.observacao];

    return this.databaseService.db.executeSql(sql, data)
      .catch((e) => console.error(e));
  }

  public update(pObj: Pedido) {
    let sql = `update Pedido set cliente_id = ?, data = ?, status = ?, observacao = ? where id = ?`;
    let data = [pObj.cliente_id, pObj.data, pObj.status, pObj.observacao, pObj.id];

    return this.databaseService.db.executeSql(sql, data)
      .catch((e) => console.error(e));
  }

  public getMaxId(){
    let sql = 'select seq from sqlite_sequence WHERE name = "Pedido"';
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
          obj.cliente_id = item.cliente_id;
          obj.data = item.data;
          obj.status = item.status;
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
}

export class Pedido {
  id: number
  cliente_id: number
  data: string
  status: number
  observacao: string

  constructor(pJson: any = null) {
    if (pJson != null) {
      this.id = pJson.id;
      this.cliente_id = pJson.cliente_id;
      this.data = pJson.data;
      this.status = pJson.status;
      this.observacao = pJson.observacao;
    }
  }
}

