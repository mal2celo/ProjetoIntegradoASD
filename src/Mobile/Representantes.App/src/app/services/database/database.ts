import { Injectable } from '@angular/core';
import { BasicService } from '../basic/basic';
import { DB_NAME } from 'src/environments/environment';
import { SQLite, SQLiteObject } from '@awesome-cordova-plugins/sqlite/ngx';

@Injectable({
  providedIn: 'root'
})
/**
 * Servico de criacao e manutencao do banco de dados
 * @class DatabaseService
 */
export class DatabaseService {

  /**
   * instancia do banco de dados
   */
  public db: SQLiteObject;

  constructor(
    private sqlite: SQLite,
    private BasicService: BasicService, 
  ) {
  }

  initDb() {

    return this.sqlite.create({
      name: DB_NAME,
      location: 'default'
    })
      .then((db: SQLiteObject) => {

        // armazena instancia do banco
        this.db = db;

        // executa scripts iniciais. Como toda vez que o banco eh aberto os scripts sao executados,
        console.log("-> inicializando o banco da dados");
        return db.sqlBatch(this.initialScripts())
          .then(() => {
            console.log("-> Banco de dados inicializado");
            this.upgradeDataBase();
          })

      })
      .catch((ex) => {
        console.log('-> Erro acessando banco de dados: ' + JSON.stringify(ex.message) + JSON.stringify(ex));
        return Promise.reject(ex);
      });
  }


  /**
   * Excui do banco estruturas e dados.
   * @return Promise
   */
  resetDb() {

    // executa scripts para a limpeza do banco.
    return this.db.sqlBatch(this.resetScripts())
      .then(() => {
        console.log("-> Banco de dados limpo");
      })
    .catch((ex) => {
      console.log('-> Erro limpando banco de dados: ' + JSON.stringify(ex.message) + JSON.stringify(ex));
      return Promise.reject(ex);
    })

  }

  clearDb() {
    // executa scripts para a deletar os dados.
    return this.db.sqlBatch(this.dropScripts())
      .then(() => {
        console.log("-> Banco de dados limpo");
      })
    .catch((ex) => {
      console.log('-> Erro limpando banco de dados: ' + JSON.stringify(ex.message) + JSON.stringify(ex));
      return Promise.reject(ex);
    })

  }


  /**
   * Retorna os sripts utilizados durante a abertura do banco de dados
   */
  initialScripts() {
    let scripts: any = [];
    scripts = [
      `CREATE TABLE IF NOT EXISTS Cliente (
        id integer primary key AUTOINCREMENT NOT NULL,
        nome TEXT,
        endereco TEXT)`
      ,
      `CREATE TABLE IF NOT EXISTS Pedido (
        id integer primary key AUTOINCREMENT NOT NULL,
        status INTEGER,
        data_pedido TEXT,
        cliente_id INTEGER,
        representante_id INTEGER,
        observacao TEXT)`
      ,
      `CREATE TABLE IF NOT EXISTS ItemPedido (
        id integer primary key AUTOINCREMENT NOT NULL,
        pedido_id INTEGER,
        produto_id INTEGER,
        quantidade INTEGER,
        valor_venda INTEGER,
        observacao TEXT)`
      ,
      `CREATE TABLE IF NOT EXISTS Produto (
        id integer primary key AUTOINCREMENT NOT NULL,
        codigo INTEGER,
        descricao TEXT,
        preco INTEGER)`
      ,
    ];

    return scripts;
  }


  /**
   * Retorna os scripts utilizados para realizar o upgrade no banco de dados.
   */
  upgradeDataBase() {
  }

  /**
   * Retorna os sripts utilizados para zerar o banco de dados.
   */
  resetScripts() {
    const scripts: any = [];
    scripts.push(['DELETE FROM Cliente', []]);
    scripts.push(['DELETE FROM sqlite_sequence where name="Cliente"', []]);
    
    scripts.push(['DELETE FROM Pedido', []]);
    scripts.push(['DELETE FROM sqlite_sequence where name="Pedido"', []]);
    
    scripts.push(['DELETE FROM ItemPedido', []]);
    scripts.push(['DELETE FROM sqlite_sequence where name="ItemPedido"', []]);
    
    scripts.push(['DELETE FROM Produto', []]);
    scripts.push(['DELETE FROM sqlite_sequence where name="Produto"', []]);

    return scripts;
  }

  dropScripts(){
    const scripts: any = [];
    scripts.push(['DROP TABLE Cliente', []]);
    scripts.push(['DROP TABLE Pedido', []]);
    scripts.push(['DROP TABLE ItemPedido', []]);
    scripts.push(['DROP TABLE Produto', []]);

    return scripts;
  }

  /**
   * Retorna um novo uuid
   * @return novo uuid
   */
  guid() {
    return this.BasicService.newUuid();
  }

}