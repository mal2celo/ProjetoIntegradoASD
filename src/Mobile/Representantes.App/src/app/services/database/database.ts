import { Injectable } from '@angular/core';
import { SQLite, SQLiteObject } from '@awesome-cordova-plugins/sqlite/ngx';
import { BasicService } from '../basic/basic';
import { Platform } from '@ionic/angular';
import { DB_NAME } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
/**
 * Servico de criacao e manutencao do banco de dados
 * todo: separar as mensagens em um outro banco ou nao apaga-las ao resetar o banco?
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
    private platform: Platform
  ) {
  }

  /**
   * Abre ou cria o banco se nao existir, o nome e a localizacao estao fixos.
   * Armazena o objeto de instancia do banco na variavel this.db, isso pressupoe um unico banco.
   * Executa os scripts de inicializacao retornados pela funcao getScripts().
   * Nao trata exception, joga para cima.
   * @return Promise
   */
  initDb() {

    return this.sqlite.create({
      name: DB_NAME,
      location: 'default'
    })
      .then((db: SQLiteObject) => {

        // armazena instancia do banco
        this.db = db;
        //window['db'] = db; // todo: verificar por que existe isso, para auxiliar no debug? executar scrips de banco no console?

        // executa scripts iniciais. Como toda vez que o banco eh aberto os scripts sao executados,
        // ja devem prever isso para evitar erros de duplicidade de estruturas ou de dados.
        console.log("-> inicializando o banco da dados");
        return db.sqlBatch(this.initialScripts())
          .then(() => {
            console.log("-> Banco de dados inicializado");
            this.upgradeDataBase();
          })

      })
      .catch((ex) => {
        console.log('-> Erro acessando banco de dados: ' + JSON.stringify(ex.message) + JSON.stringify(ex));
        return Promise.reject(ex); // joga erro para cima
      });
  }


  /**
   * Excui do banco estruturas e dados referentes ao usuario atual.
   * Executado quando o usuario atual eh desautenticado.
   * Nao trata exception, joga para cima.
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
      return Promise.reject(ex); // joga erro para cima
    })

  }

  clearDb() {

    // executa scripts para a deletar o.
    return this.db.sqlBatch(this.dropScripts())
      .then(() => {
        console.log("-> Banco de dados limpo");
      })
    .catch((ex) => {
      console.log('-> Erro limpando banco de dados: ' + JSON.stringify(ex.message) + JSON.stringify(ex));
      return Promise.reject(ex); // joga erro para cima
    })

  }


  /**
   * Retorna os sripts utilizados durante a abertura do banco de dados
   * todo: receber de cada provider o script para inicializacao de suas estruturas e dados
   */
  initialScripts() {
    let scripts: any = [];
    scripts = [
      'CREATE TABLE IF NOT EXISTS Cliente (' +
        'id integer primary key AUTOINCREMENT NOT NULL,' +
        'nome TEXT,' +
        'endereco TEXT)'
      ,
      'CREATE TABLE IF NOT EXISTS Pedido (' +
        'id integer primary key AUTOINCREMENT NOT NULL,' +
        'cliente_id INTEGER,' +
        'data TEXT,' +
        'status INTEGER,' +
        'observacao TEXT)'
      ,
      'CREATE TABLE IF NOT EXISTS ItemPedido (' +
        'id integer primary key AUTOINCREMENT NOT NULL,' +
        'pedido_id INTEGER,' +
        'produto_id INTEGER,' +
        'preco INTEGER,' +
        'quantidade INTEGER,' +
        'observacao TEXT)'
      ,
      'CREATE TABLE IF NOT EXISTS Produto (' +
        'id integer primary key AUTOINCREMENT NOT NULL,' +
        'codigo INTEGER,' +
        'descricao TEXT,' +
        'preco INTEGER)'
      ,
    ];

    //scripts.push(['DROP TABLE Leilao']);
    //scripts.push(['DROP TABLE LoteLeilao']);
    //scripts.push(['DROP TABLE bovinoloteleilao']);

    //Toda vez que entrar no app apaga as mensagens enviadas (situacao igual a 2) para otimizar o desempenho do app
    //scripts.push('DELETE FROM Mensagem where situacao = 2');
    return scripts;
  }


  upgradeDataBase() {
  }

  /**
   * Retorna os sripts utilizados para zerar o banco de dados
   * todo: receber de cada provider o script para apagar suas estruturas e dados
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
   * todo: alterar chamadas em mensagens? providers? eventos?
   */
  guid() {
    return this.BasicService.newUuid();
  }
}