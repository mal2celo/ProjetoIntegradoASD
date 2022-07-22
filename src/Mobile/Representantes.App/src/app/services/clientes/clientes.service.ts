import { Injectable } from '@angular/core';
import { DatabaseService } from '../database/database';

@Injectable({
  providedIn: 'root'
})
export class ClientesService {

  constructor(private databaseService: DatabaseService) { }

  public insert(pObj: Cliente) {
    let sql = `insert into Cliente (nome, endereco) values (?, ?)`;
    let data = [pObj.nome, pObj.endereco];

    return this.databaseService.db.executeSql(sql, data)
      .catch((e) => console.error(e));
  }

  public update(pObj: Cliente) {
    let sql = `update Cliente set nome = ?, endereco = ? where id = ?`;
    let data = [pObj.nome, pObj.endereco, pObj.id];

    return this.databaseService.db.executeSql(sql, data)
      .catch((e) => console.error(e));
  }

  public get(id: number) {
    let sql = 'select * from Cliente where id = ?';
    let data = [id];

    return this.databaseService.db.executeSql(sql, data)
      .then((data: any) => {
        if (data.rows.length > 0) {
          let item = data.rows.item(0);
          let obj = new Cliente();
          obj.id = item.id;
          obj.nome = item.nome;
          obj.endereco = item.endereco;

          return obj;
        }

        return null;
      })
      .catch((e) => console.error(e));
  }

  public getAll() {
    let sql = 'SELECT b.* FROM Cliente b';
    var data: any[] = [];

    sql += ' order by b.nome desc';

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

export class Cliente {
  id: number
  nome: string
  endereco: string

  constructor(pJson: any = null) {
    if (pJson != null) {
      this.id = pJson.id;
      this.nome = pJson.nome;
      this.endereco = pJson.endereco;
    }
  }
}

