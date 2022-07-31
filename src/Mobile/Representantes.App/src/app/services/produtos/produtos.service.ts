import { Injectable } from '@angular/core';
import { DatabaseService } from '../database/database';

@Injectable({
  providedIn: 'root'
})
export class ProdutosService {

  constructor(private databaseService: DatabaseService) { }

  public insert(pObj: Produto) {
    let sql = `insert into Produto (id, codigo, descricao, preco) values (?, ?, ?, ?)`;
    let data = [pObj.id, pObj.codigo, pObj.descricao, pObj.preco];

    return this.databaseService.db.executeSql(sql, data)
      .catch((e) => console.error(e));
  }

  public update(pObj: Produto) {
    let sql = `update Produto set codigo = ?, descricao = ?, preco = ? where id = ?`;
    let data = [pObj.codigo, pObj.descricao, pObj.preco, pObj.id];

    return this.databaseService.db.executeSql(sql, data)
      .catch((e) => console.error(e));
  }

  public get(id: number) {
    let sql = 'select * from Produto where id = ?';
    let data = [id];

    return this.databaseService.db.executeSql(sql, data)
      .then((data: any) => {
        if (data.rows.length > 0) {
          let item = data.rows.item(0);
          let obj = new Produto();
          obj.id = item.id;
          obj.codigo = item.codigo;
          obj.descricao = item.descricao;
          obj.preco = item.preco;

          return obj;
        }

        return null;
      })
      .catch((e) => console.error(e));
  }

  public getAll() {
    let sql = 'SELECT b.* FROM Produto b ';
    var data: any[] = [];

    sql += ' order by b.id desc';

    return this.databaseService.db.executeSql(sql, data)
      .then((data: any) => {
        if (data.rows.length > 0) {
          let itens: any[] = [];
          for (var i = 0; i < data.rows.length; i++) {
            var item = data.rows.item(i);
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

export class Produto {
  id: number
  codigo: number
  descricao: string
  preco: number

  constructor(pJson: any = null) {
    if (pJson != null) {
      this.id = pJson.id;
      this.codigo = pJson.codigo;
      this.descricao = pJson.descricao;
      this.preco = pJson.preco;
    }
  }
}
