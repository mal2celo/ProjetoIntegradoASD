import { ItensPedidosService, ItemPedido } from './services/itens-pedidos/itens-pedidos.service';
import { Produto, ProdutosService } from './services/produtos/produtos.service';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Platform } from '@ionic/angular';

//import { Plugins } from '@capacitor/core';
//const { Storage } = Plugins;
import { Storage } from '@capacitor/storage';
import { SplashScreen } from '@capacitor/splash-screen';
import { DatabaseService } from './services/database/database';
import { Pedido, PedidosService } from './services/pedidos/pedidos.service';
import * as moment from 'moment';
import { Cliente, ClientesService } from './services/clientes/clientes.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  public appPages = [
    { title: 'Principal', url: '/principal', icon: 'home' },
    { title: 'Pedidos', url: '/consultar-pedidos', icon: 'bag-handle' },
    { title: 'Produtos', url: '/consultar-produtos', icon: 'cube' },
    { title: 'Sincronizar', url: '/sincronizar', icon: 'swap-vertical' },
    { title: 'Sair', url: '/sair', icon: 'exit' },
  ];
  public labels = ['Family', 'Friends', 'Notes', 'Work', 'Travel', 'Reminders'];
  public representanteLogado = "";
  
  constructor(
    private platform: Platform,
    private router: Router,
    private db: DatabaseService,
    private produtos: ProdutosService,
    private clientes: ClientesService,
    private pedidos: PedidosService,
    private itensPedidos: ItensPedidosService,
  ) {
    this.initializeApp();
  }

  ionViewWillEnter() {
    
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.db.initDb()
      .then(() => {
        //this.db.clearDb();
        //this.limparECarregarTeste();
        this.openInitialPage();
      })
      .catch((err) => {
        SplashScreen.hide();
        console.log('-> initDb() ERR ' + JSON.stringify(err));
        this.router.navigate(['login']);
      });
    });
  }

  openInitialPage() {

    this.platform.ready().then(() => {
      SplashScreen.hide();

      let token = Storage.get({ key: 'Token' });
      token.then(a => {
        if(a.value){
          let representante = Storage.get({ key: 'Representante' });
          representante.then(a => {
            if(a.value){
              this.representanteLogado = a.value;
            }
          });

          this.router.navigate(['principal']);
        }
        else{
          this.router.navigate(['login']);
        }
      });
    });
  }

  limparECarregarTeste(){
    this.db.resetDb().then(() => {
      this.carragarClientesTeste();
      this.carragarProdutosTeste();
      this.carragarPedidosTeste();
    });
  }

  carragarClientesTeste(){
    for (let count = 1; count <= 10; count++) {
      let c = new Cliente();
      c.id = count;
      c.nome = "Teste Cliente " + count;
      c.endereco = "Endereço de teste " + count;
      this.clientes.insert(c);
    }
  }

  carragarProdutosTeste(){
    for (let count = 1; count <= 10; count++) {
      let p = new Produto();
      p.id = 1;
      p.codigo = count * 100;
      p.descricao = "Produto de teste " + count;
      p.preco = count * 10;
      this.produtos.insert(p);
    }
  }

  carragarItemPedidoTeste(pedido_id: number){
    for (let count = 1; count <= 10; count++) {
      let ip = new ItemPedido();
      ip.id = count;
      ip.pedido_id = pedido_id;
      ip.produto_id = count;
      ip.quantidade = this.numeroRandomicoNoIntervalor(10, 100);
      ip.valor_venda = this.numeroRandomicoNoIntervalor(10, 100);
      ip.observacao = "Item pedido de teste " + count;
      this.itensPedidos.insert(ip);
    }
  }

  carragarPedidosTeste(){
    let isoDateFormat: string = "YYYY-MM-DD[T]HH:mm:ss.SSS";
    let data = new Date();

    for (let count = 1; count <= 10; count++) {
      let p = new Pedido();
      p.cliente_id = this.numeroRandomicoNoIntervalor(1, 10);
      p.status = this.numeroRandomicoNoIntervalor(1, 4);
      p.data_pedido = moment(data).format(isoDateFormat);
      p.observacao = "Teste de Pedido " + count;
      this.pedidos.insert(p).then((row: any) => {
        this.carragarItemPedidoTeste(count);
      });
    }
  }

  numeroRandomicoNoIntervalor(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min)
  }
}
